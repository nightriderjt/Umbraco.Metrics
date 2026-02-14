using System.Globalization;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Services;

public class MetricsExportService : IMetricsExportService
{
    private readonly IPerformanceMetricsService _performanceMetricsService;
    private readonly IUmbracoMetricsService _umbracoMetricsService;
    private readonly IHistoricalMetricsExportService _historicalExportService;
    private readonly ILogger<MetricsExportService> _logger;

    public MetricsExportService(
        IPerformanceMetricsService performanceMetricsService,
        IUmbracoMetricsService umbracoMetricsService,
        IHistoricalMetricsExportService historicalExportService,
        ILogger<MetricsExportService> logger)
    {
        _performanceMetricsService = performanceMetricsService;
        _umbracoMetricsService = umbracoMetricsService;
        _historicalExportService = historicalExportService;
        _logger = logger;
    }

    public async Task<ExportResult> ExportMetricsAsync(ExportOptions options)
    {
        try
        {
            // Check if this is a historical export
            if (options.Scope == ExportScope.Historical || options.Scope == ExportScope.Custom)
            {
                return await _historicalExportService.ExportHistoricalMetricsAsync(options);
            }
            
            // Current snapshot export
            if (options.IncludePerformanceMetrics && options.IncludeUmbracoMetrics)
            {
                return await ExportCombinedMetricsAsync(options);
            }
            else if (options.IncludePerformanceMetrics)
            {
                return await ExportPerformanceMetricsAsync(options);
            }
            else if (options.IncludeUmbracoMetrics)
            {
                return await ExportUmbracoMetricsAsync(options);
            }
            else
            {
                throw new ArgumentException("At least one metric type must be selected for export");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error exporting metrics");
            throw;
        }
    }

    public async Task<ExportResult> ExportPerformanceMetricsAsync(ExportOptions options)
    {
        var metrics = await _performanceMetricsService.GetMetricsAsync();
        return GenerateExportResult(metrics, options, "performance-metrics");
    }

    public async Task<ExportResult> ExportUmbracoMetricsAsync(ExportOptions options)
    {
        var metrics = await _umbracoMetricsService.GetMetricsAsync();
        return GenerateExportResult(metrics, options, "umbraco-metrics");
    }

    public async Task<ExportResult> ExportCombinedMetricsAsync(ExportOptions options)
    {
        var performanceMetrics = await _performanceMetricsService.GetMetricsAsync();
        var umbracoMetrics = await _umbracoMetricsService.GetMetricsAsync();
        
        var combinedMetrics = new ExportMetrics
        {
            Timestamp = DateTime.UtcNow,
            PerformanceMetrics = performanceMetrics,
            UmbracoMetrics = umbracoMetrics,
            Format = options.Format,
            Scope = options.Scope,
            StartDate = options.StartDate,
            EndDate = options.EndDate
        };

        return GenerateExportResult(combinedMetrics, options, "combined-metrics");
    }

    private ExportResult GenerateExportResult<T>(T data, ExportOptions options, string baseFileName)
    {
        byte[] exportData;
        string contentType;
        string fileExtension;

        switch (options.Format)
        {
            case ExportFormat.Csv:
                exportData = GenerateCsv(data);
                contentType = "text/csv";
                fileExtension = "csv";
                break;
            
            case ExportFormat.Xml:
                exportData = GenerateXml(data);
                contentType = "application/xml";
                fileExtension = "xml";
                break;
            
            case ExportFormat.Json:
            default:
                exportData = GenerateJson(data);
                contentType = "application/json";
                fileExtension = "json";
                break;
        }

        var timestamp = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss");
        var fileName = $"{baseFileName}-{timestamp}.{fileExtension}";

        return new ExportResult
        {
            FileName = fileName,
            ContentType = contentType,
            Data = exportData,
            SizeBytes = exportData.Length,
            GeneratedAt = DateTime.UtcNow
        };
    }

    private byte[] GenerateJson<T>(T data)
    {
        var jsonOptions = new JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var json = JsonSerializer.Serialize(data, jsonOptions);
        return Encoding.UTF8.GetBytes(json);
    }

    private byte[] GenerateCsv<T>(T data)
    {
        var csvBuilder = new StringBuilder();
        
        // Add UTF-8 BOM for Excel compatibility
        csvBuilder.Append('\uFEFF');
        
        if (data is PerformanceMetrics performanceMetrics)
        {
            GeneratePerformanceMetricsCsv(csvBuilder, performanceMetrics);
        }
        else if (data is UmbracoMetrics umbracoMetrics)
        {
            GenerateUmbracoMetricsCsv(csvBuilder, umbracoMetrics);
        }
        else if (data is ExportMetrics exportMetrics)
        {
            GenerateCombinedMetricsCsv(csvBuilder, exportMetrics);
        }
        else
        {
            // Generic CSV generation for other types
            GenerateGenericCsv(csvBuilder, data);
        }

        return Encoding.UTF8.GetBytes(csvBuilder.ToString());
    }

    private void GeneratePerformanceMetricsCsv(StringBuilder csvBuilder, PerformanceMetrics metrics)
    {
        csvBuilder.AppendLine("Category,Property,Value,Unit");
        
        // Application Info
        csvBuilder.AppendLine($"Application Info,Process ID,{metrics.ApplicationInfo.ProcessId},");
        csvBuilder.AppendLine($"Application Info,Process Name,{metrics.ApplicationInfo.ProcessName},");
        csvBuilder.AppendLine($"Application Info,Start Time,{metrics.ApplicationInfo.StartTime:yyyy-MM-dd HH:mm:ss},");
        csvBuilder.AppendLine($"Application Info,Uptime (seconds),{metrics.ApplicationInfo.UptimeSeconds},");
        csvBuilder.AppendLine($"Application Info,.NET Version,{metrics.ApplicationInfo.DotNetVersion},");
        
        // CPU Usage
        csvBuilder.AppendLine($"CPU,Usage,{metrics.CpuUsage:F2},%");
        
        // Memory Usage
        csvBuilder.AppendLine($"Memory,Working Set,{metrics.MemoryUsage.WorkingSetMB:F2},MB");
        csvBuilder.AppendLine($"Memory,Private Memory,{metrics.MemoryUsage.PrivateMemoryMB:F2},MB");
        csvBuilder.AppendLine($"Memory,GC Total Memory,{metrics.MemoryUsage.GcTotalMemoryMB:F2},MB");
        csvBuilder.AppendLine($"Memory,Gen 0 Heap,{metrics.MemoryUsage.GcGen0HeapSizeMB:F2},MB");
        csvBuilder.AppendLine($"Memory,Gen 1 Heap,{metrics.MemoryUsage.GcGen1HeapSizeMB:F2},MB");
        csvBuilder.AppendLine($"Memory,Gen 2 Heap,{metrics.MemoryUsage.GcGen2HeapSizeMB:F2},MB");
        
        // Thread Info
        csvBuilder.AppendLine($"Threads,Thread Count,{metrics.ThreadInfo.ThreadCount},");
        csvBuilder.AppendLine($"Threads,Thread Pool Threads,{metrics.ThreadInfo.ThreadPoolThreadCount},");
        csvBuilder.AppendLine($"Threads,Pending Work Items,{metrics.ThreadInfo.PendingWorkItemCount},");
        csvBuilder.AppendLine($"Threads,Completed Work Items,{metrics.ThreadInfo.CompletedWorkItemCount},");
        
        // Request Metrics
        csvBuilder.AppendLine($"Requests,Total Requests,{metrics.RequestMetrics.TotalRequests},");
        csvBuilder.AppendLine($"Requests,Requests Per Second,{metrics.RequestMetrics.RequestsPerSecond:F2},/s");
        csvBuilder.AppendLine($"Requests,Average Response Time,{metrics.RequestMetrics.AverageResponseTimeMs:F2},ms");
        csvBuilder.AppendLine($"Requests,Active Requests,{metrics.RequestMetrics.ActiveRequests},");
        csvBuilder.AppendLine($"Requests,Failed Requests,{metrics.RequestMetrics.FailedRequests},");
        csvBuilder.AppendLine($"Requests,Last Minute Requests,{metrics.RequestMetrics.LastMinuteRequests},");
        
        // Garbage Collection
        csvBuilder.AppendLine($"Garbage Collection,Gen 0 Collections,{metrics.GarbageCollectionStats.Gen0Collections},");
        csvBuilder.AppendLine($"Garbage Collection,Gen 1 Collections,{metrics.GarbageCollectionStats.Gen1Collections},");
        csvBuilder.AppendLine($"Garbage Collection,Gen 2 Collections,{metrics.GarbageCollectionStats.Gen2Collections},");
        csvBuilder.AppendLine($"Garbage Collection,Total Pause Time,{metrics.GarbageCollectionStats.TotalPauseTimeMs:F2},ms");
        csvBuilder.AppendLine($"Garbage Collection,GC Mode,{(metrics.GarbageCollectionStats.IsServerGC ? "Server" : "Workstation")},");
        csvBuilder.AppendLine($"Garbage Collection,Latency Mode,{metrics.GarbageCollectionStats.GCLatencyMode},");
        
        csvBuilder.AppendLine($"Timestamp,Export Time,{metrics.Timestamp:yyyy-MM-dd HH:mm:ss} UTC,");
    }

    private void GenerateUmbracoMetricsCsv(StringBuilder csvBuilder, UmbracoMetrics metrics)
    {
        csvBuilder.AppendLine("Category,Property,Value,Unit");
        
        // Content Statistics
        csvBuilder.AppendLine($"Content,Total Nodes,{metrics.ContentStatistics.TotalContentNodes},");
        csvBuilder.AppendLine($"Content,Published Nodes,{metrics.ContentStatistics.PublishedNodes},");
        csvBuilder.AppendLine($"Content,Unpublished Nodes,{metrics.ContentStatistics.UnpublishedNodes},");
        csvBuilder.AppendLine($"Content,Trashed Nodes,{metrics.ContentStatistics.TrashedNodes},");
        csvBuilder.AppendLine($"Content,Content Types,{metrics.ContentStatistics.ContentTypeCount},");
        
        // Media Statistics
        csvBuilder.AppendLine($"Media,Total Items,{metrics.MediaStatistics.TotalMediaItems},");
        csvBuilder.AppendLine($"Media,Total Size,{metrics.MediaStatistics.TotalMediaSizeMB:F2},MB");
        csvBuilder.AppendLine($"Media,Images,{metrics.MediaStatistics.ImagesCount},");
        csvBuilder.AppendLine($"Media,Documents,{metrics.MediaStatistics.DocumentsCount},");
        csvBuilder.AppendLine($"Media,Media Types,{metrics.MediaStatistics.MediaTypeCount},");
        
        // Cache Statistics
        csvBuilder.AppendLine($"Cache,Runtime Cache Items,{metrics.CacheStatistics.RuntimeCacheCount},");
        csvBuilder.AppendLine($"Cache,Runtime Cache Size,{metrics.CacheStatistics.RuntimeCacheSizeMB:F2},MB");
        csvBuilder.AppendLine($"Cache,NuCache Items,{metrics.CacheStatistics.NuCacheCount},");
        csvBuilder.AppendLine($"Cache,NuCache Size,{metrics.CacheStatistics.NuCacheSizeMB:F2},MB");
        csvBuilder.AppendLine($"Cache,Total Cache Size,{metrics.CacheStatistics.TotalCacheSize},");
        
        // Backoffice Users
        csvBuilder.AppendLine($"Users,Total Users,{metrics.BackofficeUsers.TotalUsers},");
        csvBuilder.AppendLine($"Users,Active Users,{metrics.BackofficeUsers.ActiveUsers},");
        csvBuilder.AppendLine($"Users,Administrators,{metrics.BackofficeUsers.AdminUsers},");
        csvBuilder.AppendLine($"Users,Current Sessions,{metrics.BackofficeUsers.CurrentSessions},");
        
        csvBuilder.AppendLine($"Timestamp,Export Time,{metrics.Timestamp:yyyy-MM-dd HH:mm:ss} UTC,");
    }

    private void GenerateCombinedMetricsCsv(StringBuilder csvBuilder, ExportMetrics metrics)
    {
        csvBuilder.AppendLine("Section,Category,Property,Value,Unit");
        
        // Performance Metrics Section
        GenerateCombinedPerformanceSection(csvBuilder, metrics.PerformanceMetrics);
        
        // Umbraco Metrics Section  
        GenerateCombinedUmbracoSection(csvBuilder, metrics.UmbracoMetrics);
        
        csvBuilder.AppendLine($"Metadata,Export,Timestamp,{metrics.Timestamp:yyyy-MM-dd HH:mm:ss} UTC,");
        csvBuilder.AppendLine($"Metadata,Export,Scope,{metrics.Scope},");
        if (metrics.StartDate.HasValue)
            csvBuilder.AppendLine($"Metadata,Export,Start Date,{metrics.StartDate.Value:yyyy-MM-dd HH:mm:ss} UTC,");
        if (metrics.EndDate.HasValue)
            csvBuilder.AppendLine($"Metadata,Export,End Date,{metrics.EndDate.Value:yyyy-MM-dd HH:mm:ss} UTC,");
    }

    private void GenerateCombinedPerformanceSection(StringBuilder csvBuilder, PerformanceMetrics metrics)
    {
        if (metrics == null) return;
        
        csvBuilder.AppendLine($"Performance,Application,Process ID,{metrics.ApplicationInfo.ProcessId},");
        csvBuilder.AppendLine($"Performance,CPU,Usage,{metrics.CpuUsage:F2},%");
        csvBuilder.AppendLine($"Performance,Memory,Working Set,{metrics.MemoryUsage.WorkingSetMB:F2},MB");
        csvBuilder.AppendLine($"Performance,Threads,Thread Count,{metrics.ThreadInfo.ThreadCount},");
        csvBuilder.AppendLine($"Performance,Requests,Total Requests,{metrics.RequestMetrics.TotalRequests},");
        csvBuilder.AppendLine($"Performance,Requests,Active Requests,{metrics.RequestMetrics.ActiveRequests},");
    }

    private void GenerateCombinedUmbracoSection(StringBuilder csvBuilder, UmbracoMetrics metrics)
    {
        if (metrics == null) return;
        
        csvBuilder.AppendLine($"Umbraco,Content,Total Nodes,{metrics.ContentStatistics.TotalContentNodes},");
        csvBuilder.AppendLine($"Umbraco,Media,Total Items,{metrics.MediaStatistics.TotalMediaItems},");
        csvBuilder.AppendLine($"Umbraco,Cache,Runtime Cache Items,{metrics.CacheStatistics.RuntimeCacheCount},");
        csvBuilder.AppendLine($"Umbraco,Users,Total Users,{metrics.BackofficeUsers.TotalUsers},");
    }

    private void GenerateGenericCsv<T>(StringBuilder csvBuilder, T data)
    {
        var properties = typeof(T).GetProperties();
        
        // Header row
        var headers = properties.Select(p => p.Name);
        csvBuilder.AppendLine(string.Join(",", headers));
        
        // Data row
        var values = properties.Select(p => 
        {
            var value = p.GetValue(data);
            return EscapeCsvValue(value?.ToString() ?? "");
        });
        csvBuilder.AppendLine(string.Join(",", values));
    }

    private byte[] GenerateXml<T>(T data)
    {
        // Simple XML generation - for production, consider using XmlSerializer
        var xmlBuilder = new StringBuilder();
        xmlBuilder.AppendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        xmlBuilder.AppendLine("<MetricsExport>");
        xmlBuilder.AppendLine($"  <Timestamp>{DateTime.UtcNow:yyyy-MM-ddTHH:mm:ssZ}</Timestamp>");
        
        if (data is PerformanceMetrics performanceMetrics)
        {
            GeneratePerformanceMetricsXml(xmlBuilder, performanceMetrics);
        }
        else if (data is UmbracoMetrics umbracoMetrics)
        {
            GenerateUmbracoMetricsXml(xmlBuilder, umbracoMetrics);
        }
        
        xmlBuilder.AppendLine("</MetricsExport>");
        
        return Encoding.UTF8.GetBytes(xmlBuilder.ToString());
    }

    private void GeneratePerformanceMetricsXml(StringBuilder xmlBuilder, PerformanceMetrics metrics)
    {
        xmlBuilder.AppendLine("  <PerformanceMetrics>");
        xmlBuilder.AppendLine($"    <CpuUsage>{metrics.CpuUsage:F2}</CpuUsage>");
        xmlBuilder.AppendLine($"    <TotalRequests>{metrics.RequestMetrics.TotalRequests}</TotalRequests>");
        xmlBuilder.AppendLine($"    <ActiveRequests>{metrics.RequestMetrics.ActiveRequests}</ActiveRequests>");
        xmlBuilder.AppendLine("  </PerformanceMetrics>");
    }

    private void GenerateUmbracoMetricsXml(StringBuilder xmlBuilder, UmbracoMetrics metrics)
    {
        xmlBuilder.AppendLine("  <UmbracoMetrics>");
        xmlBuilder.AppendLine($"    <TotalContentNodes>{metrics.ContentStatistics.TotalContentNodes}</TotalContentNodes>");
        xmlBuilder.AppendLine($"    <TotalMediaItems>{metrics.MediaStatistics.TotalMediaItems}</TotalMediaItems>");
        xmlBuilder.AppendLine("  </UmbracoMetrics>");
    }

    private string EscapeCsvValue(string value)
    {
        if (string.IsNullOrEmpty(value))
            return "";
            
        if (value.Contains(',') || value.Contains('"') || value.Contains('\n') || value.Contains('\r'))
        {
            return $"\"{value.Replace("\"", "\"\"")}\"";
        }
        
        return value;
    }
}