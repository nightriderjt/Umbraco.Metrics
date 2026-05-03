using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using UmbMetrics.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Persistence;

namespace UmbMetrics.Services;

public class UmbracoMetricsService : IUmbracoMetricsService
{   
    private readonly IUserService _userService;
    private readonly IMemoryCache _memoryCache;
    private readonly ILogger<UmbracoMetricsService> _logger;
    private readonly IUmbracoDatabaseFactory _databaseFactory;

    public UmbracoMetricsService(    
        IUserService userService,
        IMemoryCache memoryCache,
        ILogger<UmbracoMetricsService> logger,
        IUmbracoDatabaseFactory databaseFactory)
    {      
        _userService = userService;
        _memoryCache = memoryCache;
        _logger = logger;
        _databaseFactory = databaseFactory;
    }

    public async Task<UmbracoMetrics> GetMetricsAsync()
    {
        try
        {
            var metrics = new UmbracoMetrics
            {
                Timestamp = DateTime.UtcNow,
                ContentStatistics = await GetContentStatisticsAsync(),
                MediaStatistics = await GetMediaStatisticsAsync(),
                CacheStatistics = GetCacheStatistics(),
                BackofficeUsers = await GetBackofficeUserInfoAsync()
            };

            return metrics;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving Umbraco metrics");
            throw;
        }
    }

    private CacheStatistics GetCacheStatistics()
    {
        var stats = new CacheStatistics();

        try
        {
            // === MEMORY CACHE STATISTICS (via .NET 10 MemoryCache.GetCurrentStatistics()) ===
            if (_memoryCache is MemoryCache memoryCache)
            {
                var cacheStats = memoryCache.GetCurrentStatistics();
                if (cacheStats is not null)
                {
                    stats.MemoryCacheEntryCount = cacheStats.CurrentEntryCount;
                    stats.TotalCacheHits = cacheStats.TotalHits;
                    stats.TotalCacheMisses = cacheStats.TotalMisses;
                    stats.CacheHitRatio = (cacheStats.TotalHits + cacheStats.TotalMisses) > 0
                        ? Math.Round((double)cacheStats.TotalHits / (cacheStats.TotalHits + cacheStats.TotalMisses), 4)
                        : 0;
                }
            }
            else
            {
                _logger.LogDebug("IMemoryCache is not a MemoryCache instance; cannot retrieve cache statistics");
            }

            // === NUCACHE (Published Content Cache - in-memory, backed by database) ===
            stats.NuCacheCount = GetPublishedContentCountFromDatabase();
            stats.NuCacheSizeBytes = GetNuCacheDataSizeFromDatabase();
            stats.NuCacheSizeMB = Math.Round(stats.NuCacheSizeBytes / 1024.0 / 1024.0, 2);

            // === TOTAL CACHE SIZE ===
            // Memory cache size requires SizeLimit which breaks Umbraco, so we only report entry count.
            stats.TotalCacheSize = $"{stats.MemoryCacheEntryCount} entries, {stats.NuCacheCount} NuCache items ({FormatBytes(stats.NuCacheSizeBytes)})";
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not retrieve cache statistics");
        }

        return stats;
    }

    private int GetPublishedContentCountFromDatabase()
    {
        try
        {
            using var db = _databaseFactory.CreateDatabase();

            var publishedContent = db.ExecuteScalar<int>(UmbMetrics.Constants.SqlQueries.Cache.PublishedContentCount);

            var mediaCount = db.ExecuteScalar<int>(
                UmbMetrics.Constants.SqlQueries.Cache.MediaCount,
                Umbraco.Cms.Core.Constants.ObjectTypes.Media);

            return publishedContent + mediaCount;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not get published content count from database");
            return 0;
        }
    }

    private long GetNuCacheDataSizeFromDatabase()
    {
        try
        {
            using var db = _databaseFactory.CreateDatabase();
            var sizeBytes = db.ExecuteScalar<long>(UmbMetrics.Constants.SqlQueries.Cache.NuCacheDataSize);
            _logger.LogDebug("NuCache data size from database: {Size} bytes", sizeBytes);
            return sizeBytes;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not get NuCache data size from database");
            return 0;
        }
    }

    private static string FormatBytes(long bytes)
    {
        return bytes switch
        {
            < 1024 => $"{bytes} B",
            < 1024 * 1024 => $"{bytes / 1024.0:F2} KB",
            < 1024 * 1024 * 1024 => $"{bytes / 1024.0 / 1024.0:F2} MB",
            _ => $"{bytes / 1024.0 / 1024.0 / 1024.0:F2} GB"
        };
    }

    private async Task<ContentStatistics> GetContentStatisticsAsync()
    {
        using var db = _databaseFactory.CreateDatabase();

        var total = db.ExecuteScalar<int>(
            UmbMetrics.Constants.SqlQueries.Content.TotalContentNodes,
            Umbraco.Cms.Core.Constants.ObjectTypes.Document);

        var published = db.ExecuteScalar<int>(UmbMetrics.Constants.SqlQueries.Content.PublishedContentNodes);

        var trashedCount = db.ExecuteScalar<int>(
            UmbMetrics.Constants.SqlQueries.Content.TrashedContentNodes,
            Umbraco.Cms.Core.Constants.ObjectTypes.Document);

        var contentTypeCount = db.ExecuteScalar<int>(UmbMetrics.Constants.SqlQueries.Content.ContentTypeCount);

        return new ContentStatistics
        {
            TotalContentNodes = total,
            PublishedNodes = published,
            UnpublishedNodes = total - published,
            TrashedNodes = trashedCount,
            ContentTypeCount = contentTypeCount
        };
    }

    private async Task<MediaStatistics> GetMediaStatisticsAsync()
    {
        using var db = _databaseFactory.CreateDatabase();

        var total = db.ExecuteScalar<int>(
            UmbMetrics.Constants.SqlQueries.Media.TotalMediaNodes,
            Umbraco.Cms.Core.Constants.ObjectTypes.Media);

        var totalSizeBytes = db.ExecuteScalar<long?>(UmbMetrics.Constants.SqlQueries.Media.TotalMediaSize) ?? 0;

        var images = db.ExecuteScalar<int>(
            UmbMetrics.Constants.SqlQueries.Media.MediaByTypeAlias,
            Umbraco.Cms.Core.Constants.ObjectTypes.Media,
            "Image");

        var documents = db.ExecuteScalar<int>(
            UmbMetrics.Constants.SqlQueries.Media.MediaByTypeAlias,
            Umbraco.Cms.Core.Constants.ObjectTypes.Media,
            "File");

        var mediaTypeCount = db.ExecuteScalar<int>(
            UmbMetrics.Constants.SqlQueries.Media.MediaTypeCount,
            Umbraco.Cms.Core.Constants.ObjectTypes.MediaType);

        return new MediaStatistics
        {
            TotalMediaItems = total,
            TotalMediaSizeMB = Math.Round(totalSizeBytes / 1024.0 / 1024.0, 2),
            MediaTypeCount = mediaTypeCount,
            ImagesCount = images,
            DocumentsCount = documents
        };
    }

    private async Task<BackofficeUserInfo> GetBackofficeUserInfoAsync()
    {
        var allUsers = _userService.GetAll(0, int.MaxValue, out var totalRecords).ToList();
        var activeUsers = allUsers.Count(u => !u.IsLockedOut && u.IsApproved);
        var adminUsers = allUsers.Count(u => u.Groups.Any(g => g.Alias == Umbraco.Cms.Core.Constants.Security.AdminGroupAlias));

        var thirtyMinutesAgo = DateTime.UtcNow.AddMinutes(-30);
        var activeSessions = allUsers.Count(u => u.LastLoginDate >= thirtyMinutesAgo);

        return new BackofficeUserInfo
        {
            ActiveUsers = activeUsers,
            TotalUsers = (int)totalRecords,
            AdminUsers = adminUsers,
            CurrentSessions = activeSessions
        };
    }
}
