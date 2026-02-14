namespace UmbMetrics.Models;

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