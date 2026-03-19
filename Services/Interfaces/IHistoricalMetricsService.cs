using UmbMetrics.Models;

namespace UmbMetrics.Services.Interfaces;

public interface IHistoricalMetricsService
{
    /// <summary>
    /// Saves current performance metrics to historical storage
    /// </summary>
    Task SaveMetricsAsync();

    /// <summary>
    /// Gets historical metrics within a date range
    /// </summary>
    Task<IReadOnlyList<PerformanceMetrics>> GetHistoricalMetricsAsync(DateTime startDate, DateTime endDate);

    /// <summary>
    /// Gets statistics about historical data storage
    /// </summary>
    Task<HistoricalMetricsStats> GetStorageStatsAsync();
}

public class HistoricalMetricsStats
{
    public int TotalFiles { get; set; }
    public long TotalSizeBytes { get; set; }
    public DateTime OldestRecord { get; set; }
    public DateTime NewestRecord { get; set; }
    public string StoragePath { get; set; } = string.Empty;
}