using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Services;

public class DeliveryPulseMetricsService : IDeliveryPulseMetricsService
{
    private readonly ILogger<DeliveryPulseMetricsService> _logger;
    private readonly ConcurrentDictionary<string, EndpointStats> _endpoints = new();
    private readonly DeliveryPulseOptions _options;

    private long _totalRequests;
    private long _totalErrors;
    private long _total404s;
    private long _totalLatencyMs;
    private long _maxLatencyMs;

    public DeliveryPulseMetricsService(
        ILogger<DeliveryPulseMetricsService> logger,
        IOptions<DeliveryPulseOptions> options)
    {
        _logger = logger;
        _options = options.Value;
    }

    public void RecordRequest(
        string path,
        string method,
        int statusCode,
        long durationMs,
        long? requestSizeBytes = null,
        long? responseSizeBytes = null)
    {
        try
        {
            var key = $"{method}:{path}";

            Interlocked.Increment(ref _totalRequests);
            Interlocked.Add(ref _totalLatencyMs, durationMs);
            UpdateMaxLatency(durationMs);

            if (statusCode >= 500)
            {
                Interlocked.Increment(ref _totalErrors);
            }
            else if (statusCode == 404)
            {
                Interlocked.Increment(ref _total404s);
            }

            UpdateEndpointStats(key, path, method, statusCode, durationMs, requestSizeBytes, responseSizeBytes);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error recording Delivery Pulse request");
        }
    }

    public DeliveryPulseMetrics GetMetrics()
    {
        var totalRequests = Interlocked.Read(ref _totalRequests);
        var totalErrors = Interlocked.Read(ref _totalErrors);
        var total404s = Interlocked.Read(ref _total404s);
        var totalLatency = Interlocked.Read(ref _totalLatencyMs);
        var maxLatency = Interlocked.Read(ref _maxLatencyMs);

        return new DeliveryPulseMetrics
        {
            Timestamp = DateTime.UtcNow,
            TotalRequests = (int)totalRequests,
            TotalErrors = (int)totalErrors,
            Total404s = (int)total404s,
            AverageLatencyMs = totalRequests > 0
                ? Math.Round((double)totalLatency / totalRequests, 2)
                : 0,
            MaxLatencyMs = maxLatency,
            TopEndpoints = GetTopEndpoints(20)
        };
    }

    public List<DeliveryPulseEndpointStats> GetTopEndpoints(int count = 20)
    {
        return _endpoints.Values
            .OrderByDescending(e => e.RequestCount)
            .Take(count)
            .Select(e => MapToEndpointStats(e))
            .ToList();
    }

    public void ClearMetrics()
    {
        _endpoints.Clear();
        Interlocked.Exchange(ref _totalRequests, 0);
        Interlocked.Exchange(ref _totalErrors, 0);
        Interlocked.Exchange(ref _total404s, 0);
        Interlocked.Exchange(ref _totalLatencyMs, 0);
        Interlocked.Exchange(ref _maxLatencyMs, 0);
    }

    private void UpdateMaxLatency(long durationMs)
    {
        long initial, computed;
        do
        {
            initial = _maxLatencyMs;
            computed = Math.Max(initial, durationMs);
        } while (Interlocked.CompareExchange(ref _maxLatencyMs, computed, initial) != initial);
    }

    private void UpdateEndpointStats(
        string key,
        string path,
        string method,
        int statusCode,
        long durationMs,
        long? requestSizeBytes,
        long? responseSizeBytes)
    {
        _endpoints.AddOrUpdate(key,
            _ => CreateNewEndpointStats(path, method, statusCode, durationMs, requestSizeBytes, responseSizeBytes),
            (_, existing) => UpdateExistingEndpointStats(existing, statusCode, durationMs, requestSizeBytes, responseSizeBytes));

        if (_endpoints.Count > _options.MaxTrackedEndpoints)
        {
            TrimExcessEndpoints();
        }
    }

    private static EndpointStats CreateNewEndpointStats(
        string path,
        string method,
        int statusCode,
        long durationMs,
        long? requestSizeBytes,
        long? responseSizeBytes)
    {
        return new EndpointStats
        {
            Path = path,
            Method = method,
            RequestCount = 1,
            TotalLatencyMs = durationMs,
            MaxLatencyMs = durationMs,
            ErrorCount = statusCode >= 500 ? 1 : 0,
            NotFoundCount = statusCode == 404 ? 1 : 0,
            TotalRequestSizeBytes = requestSizeBytes ?? 0,
            TotalResponseSizeBytes = responseSizeBytes ?? 0,
            RequestSizeSamples = requestSizeBytes.HasValue ? 1 : 0,
            ResponseSizeSamples = responseSizeBytes.HasValue ? 1 : 0,
            LastAccessed = DateTime.UtcNow
        };
    }

    private static EndpointStats UpdateExistingEndpointStats(
        EndpointStats existing,
        int statusCode,
        long durationMs,
        long? requestSizeBytes,
        long? responseSizeBytes)
    {
        existing.RequestCount++;
        existing.TotalLatencyMs += durationMs;
        existing.MaxLatencyMs = Math.Max(existing.MaxLatencyMs, durationMs);

        if (statusCode >= 500) existing.ErrorCount++;
        if (statusCode == 404) existing.NotFoundCount++;

        if (requestSizeBytes.HasValue)
        {
            existing.TotalRequestSizeBytes += requestSizeBytes.Value;
            existing.RequestSizeSamples++;
        }

        if (responseSizeBytes.HasValue)
        {
            existing.TotalResponseSizeBytes += responseSizeBytes.Value;
            existing.ResponseSizeSamples++;
        }

        existing.LastAccessed = DateTime.UtcNow;
        return existing;
    }

    private DeliveryPulseEndpointStats MapToEndpointStats(EndpointStats stats)
    {
        return new DeliveryPulseEndpointStats
        {
            Path = stats.Path,
            Method = stats.Method,
            RequestCount = stats.RequestCount,
            AverageLatencyMs = stats.RequestCount > 0
                ? Math.Round((double)stats.TotalLatencyMs / stats.RequestCount, 2)
                : 0,
            MaxLatencyMs = stats.MaxLatencyMs,
            ErrorCount = stats.ErrorCount,
            NotFoundCount = stats.NotFoundCount,
            AverageRequestSizeBytes = _options.TrackRequestSizes && stats.RequestSizeSamples > 0
                ? Math.Round((double)stats.TotalRequestSizeBytes / stats.RequestSizeSamples, 0)
                : null,
            AverageResponseSizeBytes = _options.TrackRequestSizes && stats.ResponseSizeSamples > 0
                ? Math.Round((double)stats.TotalResponseSizeBytes / stats.ResponseSizeSamples, 0)
                : null,
            LastAccessed = stats.LastAccessed
        };
    }

    private void TrimExcessEndpoints()
    {
        var toRemove = _endpoints.Values
            .OrderBy(e => e.LastAccessed)
            .Take(_endpoints.Count - _options.MaxTrackedEndpoints)
            .Select(e => $"{e.Method}:{e.Path}")
            .ToList();

        foreach (var key in toRemove)
        {
            _endpoints.TryRemove(key, out _);
        }
    }

    private sealed class EndpointStats
    {
        public string Path { get; set; } = string.Empty;
        public string Method { get; set; } = string.Empty;
        public int RequestCount { get; set; }
        public long TotalLatencyMs { get; set; }
        public long MaxLatencyMs { get; set; }
        public int ErrorCount { get; set; }
        public int NotFoundCount { get; set; }
        public long TotalRequestSizeBytes { get; set; }
        public long TotalResponseSizeBytes { get; set; }
        public int RequestSizeSamples { get; set; }
        public int ResponseSizeSamples { get; set; }
        public DateTime LastAccessed { get; set; }
    }
}

public class DeliveryPulseOptions
{
    public const string SectionName = "UmbMetrics:DeliveryPulse";
    public bool TrackRequestSizes { get; set; } = false;
    public int MaxTrackedEndpoints { get; set; } = 100;
    public bool EnableDetailedLogging { get; set; } = false;
}
