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
