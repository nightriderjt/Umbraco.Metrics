namespace UmbMetrics.Models;

public class CacheStatistics
{
    /// <summary>
    /// Number of entries in the memory cache (from MemoryCacheStatistics).
    /// </summary>
    public long MemoryCacheEntryCount { get; set; }

    /// <summary>
    /// Total number of cache hits since the cache was created.
    /// </summary>
    public long TotalCacheHits { get; set; }

    /// <summary>
    /// Total number of cache misses since the cache was created.
    /// </summary>
    public long TotalCacheMisses { get; set; }

    /// <summary>
    /// Cache hit ratio (0.0 to 1.0).
    /// </summary>
    public double CacheHitRatio { get; set; }

    /// <summary>
    /// Number of entries in the NuCache (published content cache).
    /// </summary>
    public int NuCacheCount { get; set; }

    /// <summary>
    /// NuCache file size in bytes.
    /// </summary>
    public long NuCacheSizeBytes { get; set; }

    /// <summary>
    /// NuCache file size in MB.
    /// </summary>
    public double NuCacheSizeMB { get; set; }

    /// <summary>
    /// Total cache size (memory cache + NuCache) as a human-readable string.
    /// </summary>
    public string TotalCacheSize { get; set; } = "N/A";
}
