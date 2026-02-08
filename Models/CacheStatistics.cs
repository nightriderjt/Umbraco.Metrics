namespace UmbMetrics.Models;

public class CacheStatistics
{
    public int RuntimeCacheCount { get; set; }
    public double RuntimeCacheSizeMB { get; set; }
    public int NuCacheCount { get; set; }
    public double NuCacheSizeMB { get; set; }
    public string TotalCacheSize { get; set; } = "N/A";
}