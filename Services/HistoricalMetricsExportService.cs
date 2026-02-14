using System.Globalization;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Services;

public class HistoricalMetricsExportService : IHistoricalMetricsExportService
{
    private readonly IHistoricalMetricsService _historicalMetricsService;
    private readonly ILogger<HistoricalMetricsExportService> _logger;

    public HistoricalMetricsExportService(
        IHistoricalMetricsService historicalMetricsService,
        ILogger<HistoricalMetricsExportService> logger)
    {
        _historicalMetricsService = historicalMetricsService;
        _logger = logger;
    }

    public async Task<ExportResult> ExportHistoricalMetricsAsync(ExportOptions options)
    {
        try
        {
            if (options == null)
            {
                throw new ArgumentNullException(nameof(options));
            }

            if (options.Scope == ExportScope.Current)
            {
                throw new ArgumentException("Historical export requires Historical or Custom scope");
            }

            // Get historical metrics based on scope
            IEnumerable<PerformanceMetrics> performanceMetrics = Enumerable.Empty<PerformanceMetrics>();
            IEnumerable<UmbracoMetrics> umbracoMetrics = Enumerable.Empty<UmbracoMetrics>();

            if (options.IncludePerformanceMetrics)
            {
                performanceMetrics = await GetHistoricalPerformanceMetricsAsync(options);
            }

            // Note: Umbraco metrics historical storage is not implemented yet
            // For now, we'll only export performance metrics for historical data
            if (options.IncludeUmbracoMetrics)
            {
                _logger.LogWarning("Historical Umbraco metrics export requested but not implemented");
            }

            return GenerateHistoricalExportResult(performanceMetrics, umbracoMetrics, options);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error exporting historical metrics");
            throw;
        }
    }

    private async Task<IEnumerable<PerformanceMetrics>> GetHistoricalPerformanceMetricsAsync(ExportOptions options)
    {
        if (options.Scope == ExportScope.Historical)
        {
            // For historical scope, get all available historical data
            // We'll limit to last 30 days by default to avoid huge exports
            var endDate = DateTime.UtcNow;
            var startDate = endDate.AddDays(-30);
            return await _historicalMetricsService.GetHistoricalMetricsAsync(startDate, endDate);
        }
        else if (options.Scope == ExportScope.Custom)
        {
            if (!options.StartDate.HasValue || !options.EndDate.HasValue)
            {
                throw new ArgumentException("Custom scope requires both start and end dates");
            }

            var startDate = options.StartDate.Value;
            var endDate = options.EndDate.Value;

            if (startDate > endDate)
            {
                throw new ArgumentException("Start date must be before end date");
            }

            // Limit to reasonable range to avoid memory issues
            if ((endDate - startDate).TotalDays > 90)
            {
                throw new ArgumentException("Custom date range cannot exceed 90 days for export");
            }

            return await _historicalMetricsService.GetHistoricalMetricsAsync(startDate, endDate);
        }

        return Enumerable.Empty<PerformanceMetrics>();
    }

    private ExportResult GenerateHistoricalExportResult(
        IEnumerable<PerformanceMetrics> performanceMetrics,
        IEnumerable<UmbracoMetrics> umbracoMetrics,
        ExportOptions options)
    {
        byte[] exportData;
        string contentType;
        string fileExtension;

        // Create historical export data structure
        var historicalData = new HistoricalExportData
        {
            PerformanceMetrics = performanceMetrics.ToList(),
            UmbracoMetrics = umbracoMetrics.ToList(),
            ExportOptions = options,
            GeneratedAt = DateTime.UtcNow,
            RecordCount = performanceMetrics.Count() + umbracoMetrics.Count()
        };

        switch (options.Format)
        {
            case ExportFormat.Csv:
                exportData = GenerateHistoricalCsv(historicalData);
                contentType = "text/csv";
                fileExtension = "csv";
                break;
            
            case ExportFormat.Xml:
                exportData = GenerateHistoricalXml(historicalData);
                contentType = "application/xml";
                fileExtension = "xml";
                break;
            
            case ExportFormat.Json:
            default:
                exportData = GenerateHistoricalJson(historicalData);
                contentType = "application/json";
                fileExtension = "json";
                break;
        }

        var timestamp = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss");
        var scopePart = options.Scope.ToString().ToLower();
        var fileName = $"historical-metrics-{scopePart}-{timestamp}.{fileExtension}";

        return new ExportResult
        {
            FileName = fileName,
            ContentType = contentType,
            Data = exportData,
            SizeBytes = exportData.Length,
            GeneratedAt = DateTime.UtcNow
        };
    }

    private byte[] GenerateHistoricalJson(HistoricalExportData data)
    {
        var jsonOptions = new JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var json = JsonSerializer.Serialize(data, jsonOptions);
        return Encoding.UTF8.GetBytes(json);
    }

    private byte[] GenerateHistoricalCsv(HistoricalExportData data)
    {
        var csvBuilder = new StringBuilder();
        
        // Add UTF-8 BOM for Excel compatibility
        csvBuilder.Append('\uFEFF');
        
        if (data.PerformanceMetrics.Any())
        {
            GeneratePerformanceMetricsHistoricalCsv(csvBuilder, data.PerformanceMetrics);
            
            // Add separator if we have both types of metrics
            if (data.UmbracoMetrics.Any())
            {
                csvBuilder.AppendLine();
                csvBuilder.AppendLine();
            }
        }
        
        if (data.UmbracoMetrics.Any())
        {
            GenerateUmbracoMetricsHistoricalCsv(csvBuilder, data.UmbracoMetrics);
        }
        
        // Add metadata section
        csvBuilder.AppendLine();
        csvBuilder.AppendLine();
        csvBuilder.AppendLine("Export Metadata");
        csvBuilder.AppendLine("Property,Value");
        csvBuilder.AppendLine($"Generated At,{data.GeneratedAt:yyyy-MM-dd HH:mm:ss} UTC");
        csvBuilder.AppendLine($"Scope,{data.ExportOptions.Scope}");
        csvBuilder.AppendLine($"Format,{data.ExportOptions.Format}");
        csvBuilder.AppendLine($"Record Count,{data.RecordCount}");
        
        if (data.ExportOptions.StartDate.HasValue)
            csvBuilder.AppendLine($"Start Date,{data.ExportOptions.StartDate.Value:yyyy-MM-dd HH:mm:ss} UTC");
        if (data.ExportOptions.EndDate.HasValue)
            csvBuilder.AppendLine($"End Date,{data.ExportOptions.EndDate.Value:yyyy-MM-dd HH:mm:ss} UTC");

        return Encoding.UTF8.GetBytes(csvBuilder.ToString());
    }

    private void GeneratePerformanceMetricsHistoricalCsv(StringBuilder csvBuilder, List<PerformanceMetrics> metrics)
    {
        if (!metrics.Any()) return;

        csvBuilder.AppendLine("Performance Metrics History");
        csvBuilder.AppendLine("Timestamp,CPU Usage (%),Working Set (MB),Thread Count,Total Requests,Active Requests,Requests Per Second,Average Response Time (ms)");
        
        foreach (var metric in metrics.OrderBy(m => m.Timestamp))
        {
            csvBuilder.AppendLine(
                $"{metric.Timestamp:yyyy-MM-dd HH:mm:ss}," +
                $"{metric.CpuUsage:F2}," +
                $"{metric.MemoryUsage.WorkingSetMB:F2}," +
                $"{metric.ThreadInfo.ThreadCount}," +
                $"{metric.RequestMetrics.TotalRequests}," +
                $"{metric.RequestMetrics.ActiveRequests}," +
                $"{metric.RequestMetrics.RequestsPerSecond:F2}," +
                $"{metric.RequestMetrics.AverageResponseTimeMs:F2}"
            );
        }
    }

    private void GenerateUmbracoMetricsHistoricalCsv(StringBuilder csvBuilder, List<UmbracoMetrics> metrics)
    {
        if (!metrics.Any()) return;

        csvBuilder.AppendLine("Umbraco Metrics History");
        csvBuilder.AppendLine("Timestamp,Total Content Nodes,Published Nodes,Total Media Items,Total Media Size (MB),Total Users,Active Users");
        
        foreach (var metric in metrics.OrderBy(m => m.Timestamp))
        {
            csvBuilder.AppendLine(
                $"{metric.Timestamp:yyyy-MM-dd HH:mm:ss}," +
                $"{metric.ContentStatistics.TotalContentNodes}," +
                $"{metric.ContentStatistics.PublishedNodes}," +
                $"{metric.MediaStatistics.TotalMediaItems}," +
                $"{metric.MediaStatistics.TotalMediaSizeMB:F2}," +
                $"{metric.BackofficeUsers.TotalUsers}," +
                $"{metric.BackofficeUsers.ActiveUsers}"
            );
        }
    }

    private byte[] GenerateHistoricalXml(HistoricalExportData data)
    {
        var xmlBuilder = new StringBuilder();
        xmlBuilder.AppendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        xmlBuilder.AppendLine("<HistoricalMetricsExport>");
        xmlBuilder.AppendLine($"  <GeneratedAt>{data.GeneratedAt:yyyy-MM-ddTHH:mm:ssZ}</GeneratedAt>");
        xmlBuilder.AppendLine($"  <Scope>{data.ExportOptions.Scope}</Scope>");
        xmlBuilder.AppendLine($"  <RecordCount>{data.RecordCount}</RecordCount>");
        
        if (data.ExportOptions.StartDate.HasValue)
            xmlBuilder.AppendLine($"  <StartDate>{data.ExportOptions.StartDate.Value:yyyy-MM-ddTHH:mm:ssZ}</StartDate>");
        if (data.ExportOptions.EndDate.HasValue)
            xmlBuilder.AppendLine($"  <EndDate>{data.ExportOptions.EndDate.Value:yyyy-MM-ddTHH:mm:ssZ}</EndDate>");
        
        if (data.PerformanceMetrics.Any())
        {
            xmlBuilder.AppendLine("  <PerformanceMetrics>");
            foreach (var metric in data.PerformanceMetrics.OrderBy(m => m.Timestamp))
            {
                xmlBuilder.AppendLine("    <Metric>");
                xmlBuilder.AppendLine($"      <Timestamp>{metric.Timestamp:yyyy-MM-ddTHH:mm:ssZ}</Timestamp>");
                xmlBuilder.AppendLine($"      <CpuUsage>{metric.CpuUsage:F2}</CpuUsage>");
                xmlBuilder.AppendLine($"      <WorkingSetMB>{metric.MemoryUsage.WorkingSetMB:F2}</WorkingSetMB>");
                xmlBuilder.AppendLine($"      <ThreadCount>{metric.ThreadInfo.ThreadCount}</ThreadCount>");
                xmlBuilder.AppendLine($"      <TotalRequests>{metric.RequestMetrics.TotalRequests}</TotalRequests>");
                xmlBuilder.AppendLine($"      <ActiveRequests>{metric.RequestMetrics.ActiveRequests}</ActiveRequests>");
                xmlBuilder.AppendLine("    </Metric>");
            }
            xmlBuilder.AppendLine("  </PerformanceMetrics>");
        }
        
        xmlBuilder.AppendLine("</HistoricalMetricsExport>");
        
        return Encoding.UTF8.GetBytes(xmlBuilder.ToString());
    }
}

public class HistoricalExportData
{
    public List<PerformanceMetrics> PerformanceMetrics { get; set; } = new();
    public List<UmbracoMetrics> UmbracoMetrics { get; set; } = new();
    public ExportOptions ExportOptions { get; set; } = new();
    public DateTime GeneratedAt { get; set; }
    public int RecordCount { get; set; }
}

public interface IHistoricalMetricsExportService
{
    Task<ExportResult> ExportHistoricalMetricsAsync(ExportOptions options);
}