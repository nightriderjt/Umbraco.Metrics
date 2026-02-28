namespace UmbMetrics.Models;

public class HistoricalExportData
{
    public List<PerformanceMetrics> PerformanceMetrics { get; set; } = [];
    public List<UmbracoMetrics> UmbracoMetrics { get; set; } = [];
    public ExportOptions ExportOptions { get; set; } = new();
    public DateTime GeneratedAt { get; set; }
    public int RecordCount { get; set; }
}
