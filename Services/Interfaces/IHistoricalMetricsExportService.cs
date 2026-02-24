using UmbMetrics.Models;

namespace UmbMetrics.Services.Interfaces;

public interface IHistoricalMetricsExportService
{
    Task<ExportResult> ExportHistoricalMetricsAsync(ExportOptions options);
}