namespace UmbMetrics.Models;

public class ExportMetrics
{
    public DateTime Timestamp { get; set; }
    public PerformanceMetrics PerformanceMetrics { get; set; } = new();
    public UmbracoMetrics UmbracoMetrics { get; set; } = new();
    
    public ExportFormat Format { get; set; } = ExportFormat.Json;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public ExportScope Scope { get; set; } = ExportScope.Current;
}

public enum ExportFormat
{
    Json,
    Csv,
    Xml
}

public enum ExportScope
{
    Current,        // Current snapshot only
    Historical,     // Historical data (if implemented)
    Custom          // Custom date range
}

public class ExportOptions
{
    public ExportFormat Format { get; set; } = ExportFormat.Json;
    public ExportScope Scope { get; set; } = ExportScope.Current;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IncludePerformanceMetrics { get; set; } = true;
    public bool IncludeUmbracoMetrics { get; set; } = true;
    public bool IncludeActiveRequests { get; set; } = false;
    public string Timezone { get; set; } = "UTC";
}

public class ExportResult
{
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public byte[] Data { get; set; } = Array.Empty<byte>();
    public long SizeBytes { get; set; }
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
}