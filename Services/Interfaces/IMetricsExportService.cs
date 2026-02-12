using UmbMetrics.Models;

namespace UmbMetrics.Services;

public interface IMetricsExportService
{
    Task<ExportResult> ExportMetricsAsync(ExportOptions options);
    Task<ExportResult> ExportPerformanceMetricsAsync(ExportOptions options);
    Task<ExportResult> ExportUmbracoMetricsAsync(ExportOptions options);
    Task<ExportResult> ExportCombinedMetricsAsync(ExportOptions options);
}