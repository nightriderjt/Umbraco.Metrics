using System.Diagnostics;
using Microsoft.Extensions.Logging;
using UmbMetrics.Middleware;
using UmbMetrics.Models;

namespace UmbMetrics.Services;

public class PerformanceMetricsService : IPerformanceMetricsService
{
    private readonly ILogger<PerformanceMetricsService> _logger;
    private static readonly DateTime _startTime = DateTime.UtcNow;
    private static readonly Process _currentProcess = Process.GetCurrentProcess();
    
    public PerformanceMetricsService(ILogger<PerformanceMetricsService> logger)
    {
        _logger = logger;
    }

    public async Task<PerformanceMetrics> GetMetricsAsync()
    {
        try
        {
            var metrics = new PerformanceMetrics
            {
                Timestamp = DateTime.UtcNow,
                CpuUsage = await GetCpuUsageAsync(),
                MemoryUsage = GetMemoryUsage(),
                ThreadInfo = GetThreadInfo(),
                GarbageCollectionStats = GetGarbageCollectionStats(),
                RequestMetrics = GetRequestMetrics(),
                ApplicationInfo = GetApplicationInfo()
            };

            return metrics;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving performance metrics");
            throw;
        }
    }

    private async Task<double> GetCpuUsageAsync()
    {
        try
        {
            var startTime = DateTime.UtcNow;
            var startCpuUsage = _currentProcess.TotalProcessorTime;
            
            await Task.Delay(100);
            
            var endTime = DateTime.UtcNow;
            var endCpuUsage = _currentProcess.TotalProcessorTime;
            
            var cpuUsedMs = (endCpuUsage - startCpuUsage).TotalMilliseconds;
            var totalMsPassed = (endTime - startTime).TotalMilliseconds;
            var cpuUsageTotal = cpuUsedMs / (Environment.ProcessorCount * totalMsPassed);
            
            return Math.Round(cpuUsageTotal * 100, 2);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not calculate CPU usage");
            return 0;
        }
    }

    private MemoryMetrics GetMemoryUsage()
    {
        try
        {
            _currentProcess.Refresh();
            var gcInfo = GC.GetGCMemoryInfo();
            
            return new MemoryMetrics
            {
                WorkingSetMB = Math.Round(_currentProcess.WorkingSet64 / 1024.0 / 1024.0, 2),
                PrivateMemoryMB = Math.Round(_currentProcess.PrivateMemorySize64 / 1024.0 / 1024.0, 2),
                VirtualMemoryMB = Math.Round(_currentProcess.VirtualMemorySize64 / 1024.0 / 1024.0, 2),
                GcTotalMemoryMB = Math.Round(GC.GetTotalMemory(false) / 1024.0 / 1024.0, 2),
                GcGen0HeapSizeMB = Math.Round(gcInfo.GenerationInfo[0].SizeAfterBytes / 1024.0 / 1024.0, 2),
                GcGen1HeapSizeMB = Math.Round(gcInfo.GenerationInfo[1].SizeAfterBytes / 1024.0 / 1024.0, 2),
                GcGen2HeapSizeMB = Math.Round(gcInfo.GenerationInfo[2].SizeAfterBytes / 1024.0 / 1024.0, 2),
                TotalHeapSizeMB = Math.Round(gcInfo.HeapSizeBytes / 1024.0 / 1024.0, 2),
                FragmentedMemoryMB = Math.Round(gcInfo.FragmentedBytes / 1024.0 / 1024.0, 2)
            };
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not read memory usage");
            return new MemoryMetrics();
        }
    }

    private ThreadInfo GetThreadInfo()
    {
        try
        {
            _currentProcess.Refresh();
            return new ThreadInfo
            {
                ThreadCount = _currentProcess.Threads.Count,
                ThreadPoolThreadCount = ThreadPool.ThreadCount,
                CompletedWorkItemCount = ThreadPool.CompletedWorkItemCount,
                PendingWorkItemCount = ThreadPool.PendingWorkItemCount
            };
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not read thread info");
            return new ThreadInfo();
        }
    }

    private GarbageCollectionMetrics GetGarbageCollectionStats()
    {
        try
        {
            var gcInfo = GC.GetGCMemoryInfo();
            
            return new GarbageCollectionMetrics
            {
                Gen0Collections = GC.CollectionCount(0),
                Gen1Collections = GC.CollectionCount(1),
                Gen2Collections = GC.CollectionCount(2),
                TotalMemoryMB = Math.Round(gcInfo.HeapSizeBytes / 1024.0 / 1024.0, 2),
                FragmentedMemoryMB = Math.Round(gcInfo.FragmentedBytes / 1024.0 / 1024.0, 2),
                TotalAvailableMemoryMB = Math.Round(gcInfo.TotalAvailableMemoryBytes / 1024.0 / 1024.0, 2),
                HighMemoryLoadThresholdMB = Math.Round(gcInfo.HighMemoryLoadThresholdBytes / 1024.0 / 1024.0, 2),
                MemoryLoadMB = Math.Round(gcInfo.MemoryLoadBytes / 1024.0 / 1024.0, 2),
                IsServerGC = System.Runtime.GCSettings.IsServerGC,
                GCLatencyMode = System.Runtime.GCSettings.LatencyMode.ToString(),
                TotalPauseTimeMs = Math.Round(gcInfo.PauseDurations.ToArray().Sum(d => d.TotalMilliseconds), 2)
            };
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not read GC stats");
            return new GarbageCollectionMetrics();
        }
    }

    private RequestMetrics GetRequestMetrics()
    {
        return new RequestMetrics
        {
            TotalRequests = MetricsMiddleware.TotalRequests,
            RequestsPerSecond = MetricsMiddleware.GetRequestsPerSecond(),
            AverageResponseTimeMs = MetricsMiddleware.GetAverageResponseTime(),
            ActiveRequests = MetricsMiddleware.ActiveRequests,
            FailedRequests = MetricsMiddleware.FailedRequests,
            LastMinuteRequests = MetricsMiddleware.GetLastMinuteRequests()
        };
    }

    private ApplicationInfo GetApplicationInfo()
    {
        try
        {
            _currentProcess.Refresh();
            var uptime = DateTime.Now.Subtract(_currentProcess.StartTime);
            
            return new ApplicationInfo
            {
                ProcessId = Environment.ProcessId,
                ProcessName = _currentProcess.ProcessName,
                Is64BitProcess = Environment.Is64BitProcess,
                Is64BitOperatingSystem = Environment.Is64BitOperatingSystem,
                ProcessorCount = Environment.ProcessorCount,
                DotNetVersion = Environment.Version.ToString(),
                RuntimeVersion = System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription,
                MachineName = Environment.MachineName,
                UserName = Environment.UserName,
                UptimeSeconds = (long)uptime.TotalSeconds,
                StartTime = _currentProcess.StartTime
            };
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not read application info");
            return new ApplicationInfo();
        }
    }
}
