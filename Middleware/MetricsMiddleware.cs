using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Collections.Concurrent;
using System.Diagnostics;

namespace UmbMetrics.Middleware;

public class MetricsMiddleware
{
    private readonly RequestDelegate _next;
    private static long _totalRequests = 0;
    private static long _failedRequests = 0;
    private static int _activeRequests = 0;
    private static readonly ConcurrentQueue<double> _responseTimes = new();
    private static readonly ConcurrentQueue<DateTime> _requestTimestamps = new();
    private static readonly DateTime _startTime = DateTime.UtcNow;

    public MetricsMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        Interlocked.Increment(ref _activeRequests);
        Interlocked.Increment(ref _totalRequests);
        _requestTimestamps.Enqueue(DateTime.UtcNow);

        // Clean old timestamps (older than 1 minute)
        while (_requestTimestamps.TryPeek(out var timestamp) &&
               (DateTime.UtcNow - timestamp).TotalMinutes > 1)
        {
            _requestTimestamps.TryDequeue(out _);
        }

        try
        {
            await _next(context); // FIX: Pass 'context' to '_next'

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

            _responseTimes.Enqueue(stopwatch.Elapsed.TotalMilliseconds);

            // Keep only last 1000 response times to prevent memory growth
            while (_responseTimes.Count > 1000)
            {
                _responseTimes.TryDequeue(out _);
            }
        }
    }

    public static long TotalRequests => _totalRequests;
    public static long FailedRequests => _failedRequests;
    public static int ActiveRequests => _activeRequests;

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