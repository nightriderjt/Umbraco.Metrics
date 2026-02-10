using Lucene.Net.QueryParsers.Xml.Builders;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Collections.Concurrent;
using System.ComponentModel;
using System.Diagnostics;
using Umbraco.Cms.Core.Media.EmbedProviders;

namespace UmbMetrics.Middleware;

public class MetricsMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private static long _totalRequests = 0;
    private static long _failedRequests = 0;
    private static int _activeRequests = 0;
    private static readonly ConcurrentQueue<double> _responseTimes = new();
    private static readonly ConcurrentQueue<DateTime> _requestTimestamps = new();
    private static readonly ConcurrentDictionary<string, ActiveRequestInfo> _activeRequestDetails = new();
    private static readonly DateTime _startTime = DateTime.UtcNow;

    public MetricsMiddleware(RequestDelegate next,IWebHostEnvironment  webHostEnvironment)
    {
        _next = next;
        _webHostEnvironment = webHostEnvironment;
    }

    public async Task InvokeAsync(HttpContext context)
    {

        if (ExcludeSystemPaths(context,_webHostEnvironment))
        {
            var requestId = Guid.NewGuid().ToString();
            var stopwatch = Stopwatch.StartNew();

            Interlocked.Increment(ref _activeRequests);
            Interlocked.Increment(ref _totalRequests);
            _requestTimestamps.Enqueue(DateTime.UtcNow);

            // Track active request details
            var activeRequest = new ActiveRequestInfo
            {
                RequestId = requestId,
                Path = context.Request.Path.Value ?? "/",
                Method = context.Request.Method,
                StartTime = DateTime.UtcNow,
                QueryString = context.Request.QueryString.Value ?? "",
                UserAgent = context.Request.Headers.UserAgent.ToString(),
                RemoteIp = context.Connection.RemoteIpAddress?.ToString() ?? "unknown"
            };
            _activeRequestDetails.TryAdd(requestId, activeRequest);

            // Clean old timestamps (older than 1 minute)
            while (_requestTimestamps.TryPeek(out var timestamp) &&
                   (DateTime.UtcNow - timestamp).TotalMinutes > 1)
            {
                _requestTimestamps.TryDequeue(out _);
            }

            try
            {
                await _next(context);

                if (context.Response.StatusCode >= 400)
                {
                    Interlocked.Increment(ref _failedRequests);
                }
            }
            catch
            {
                Interlocked.Increment(ref _failedRequests);
                throw;
            }
            finally
            {
                stopwatch.Stop();
                Interlocked.Decrement(ref _activeRequests);
                _activeRequestDetails.TryRemove(requestId, out _);

                _responseTimes.Enqueue(stopwatch.Elapsed.TotalMilliseconds);

                // Keep only last 1000 response times to prevent memory growth
                while (_responseTimes.Count > 1000)
                {
                    _responseTimes.TryDequeue(out _);
                }
            }


        }
        else
        {
            await _next(context);
        }

    }

    private  static bool ExcludeSystemPaths(HttpContext context, IWebHostEnvironment env)
    {
        if (env.IsDevelopment()) return true;
        return !context.Request.Path.Value.Contains("metrics")
                    && !context.Request.Path.Value.Contains("serverEventHub")
                    && !context.Request.Path.Value.Contains("active-requests");
    }

    public static long TotalRequests => _totalRequests;
    public static long FailedRequests => _failedRequests;
    public static int ActiveRequests => _activeRequests;

    public  static IEnumerable<ActiveRequestInfo> GetActiveRequestDetails(HttpContext context, IWebHostEnvironment env)
    {
        return _activeRequestDetails.Values
            .OrderByDescending(r => r.StartTime)
            .Where(x=> ExcludeSystemPaths(context,env))
            .Select(r => new ActiveRequestInfo
            {
                RequestId = r.RequestId,
                Path = r.Path,
                Method = r.Method,
                StartTime = r.StartTime,
                DurationMs = (DateTime.UtcNow - r.StartTime).TotalMilliseconds,
                QueryString = r.QueryString,
                UserAgent = r.UserAgent,
                RemoteIp = r.RemoteIp
            })
            .ToList();
    }

    public static double GetRequestsPerSecond()
    {
        var uptime = (DateTime.UtcNow - _startTime).TotalSeconds;
        if (uptime > 0)
        {
            return Math.Round(_totalRequests / uptime, 2);
        }
        return 0;
    }

    public static double GetAverageResponseTime()
    {
        if (_responseTimes.IsEmpty)
            return 0;

        return Math.Round(_responseTimes.Average(), 2);
    }

    public static int GetLastMinuteRequests()
    {
        return _requestTimestamps.Count;
    }
}

public class ActiveRequestInfo
{
    public string RequestId { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public string Method { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public double DurationMs { get; set; }
    public string QueryString { get; set; } = string.Empty;
    public string UserAgent { get; set; } = string.Empty;
    public string RemoteIp { get; set; } = string.Empty;
}