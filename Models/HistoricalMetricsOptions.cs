namespace UmbMetrics.Models;

public class HistoricalMetricsOptions
{
    public string StoragePath { get; set; } = "Data/MetricsHistory";
    public int SaveIntervalSeconds { get; set; } = 5;
    public int RetentionDays { get; set; } = 30;
    public long MaxFileSizeBytes { get; set; } = 100 * 1024 * 1024; // 100 MB default
    public bool EnableAutoCleanup { get; set; } = true;
    public int CleanupIntervalHours { get; set; } = 24;
}
