using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Hosting;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Persistence;
using System.Text.Json;
using UmbMetrics.Models;

namespace UmbMetrics.Services;

public class UmbracoMetricsService : IUmbracoMetricsService
{
    private readonly IContentService _contentService;
    private readonly IMediaService _mediaService;
    private readonly IUserService _userService;
    private readonly AppCaches _appCaches;
    private readonly ILogger<UmbracoMetricsService> _logger;
    private readonly IUmbracoDatabaseFactory _databaseFactory;
    private readonly IHostingEnvironment _hostingEnvironment;

    public UmbracoMetricsService(
        IContentService contentService,
        IMediaService mediaService,
        IUserService userService,
        AppCaches appCaches,
        ILogger<UmbracoMetricsService> logger,
        IUmbracoDatabaseFactory databaseFactory,
        IHostingEnvironment hostingEnvironment)
    {
        _contentService = contentService;
        _mediaService = mediaService;
        _userService = userService;
        _appCaches = appCaches;
        _logger = logger;
        _databaseFactory = databaseFactory;
        _hostingEnvironment = hostingEnvironment;
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
        var runtimeCacheCount = 0;
        var runtimeCacheSizeBytes = 0L;
        var nuCacheCount = 0;
        var nuCacheSizeBytes = 0L;

        try
        {
            // === RUNTIME CACHE ===
            var runtimeCacheItems = _appCaches.RuntimeCache.SearchByKey("").ToList();
            runtimeCacheCount = runtimeCacheItems.Count;
            runtimeCacheSizeBytes = EstimateRuntimeCacheSize(runtimeCacheItems);

            // === NUCACHE (Published Content Cache) ===
            nuCacheSizeBytes = GetNuCacheFileSize();
            nuCacheCount = GetPublishedContentCountFromDatabase();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not retrieve cache statistics");
        }

        return new CacheStatistics
        {
            RuntimeCacheCount = runtimeCacheCount,
            RuntimeCacheSizeMB = Math.Round(runtimeCacheSizeBytes / 1024.0 / 1024.0, 2),
            NuCacheCount = nuCacheCount,
            NuCacheSizeMB = Math.Round(nuCacheSizeBytes / 1024.0 / 1024.0, 2),
            TotalCacheSize = FormatBytes(runtimeCacheSizeBytes + nuCacheSizeBytes)
        };
    }

    private int GetPublishedContentCountFromDatabase()
    {
        try
        {
            using var db = _databaseFactory.CreateDatabase();
            
            var publishedContent = db.ExecuteScalar<int>(
                @"SELECT COUNT(*) FROM umbracoDocument d
                  INNER JOIN umbracoNode n ON d.nodeId = n.id
                  WHERE d.published = 1 AND n.trashed = 0");

            var mediaCount = db.ExecuteScalar<int>(
                @"SELECT COUNT(*) FROM umbracoNode 
                  WHERE nodeObjectType = @0 AND trashed = 0",
                Umbraco.Cms.Core.Constants.ObjectTypes.Media);

            return publishedContent + mediaCount;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not get published content count from database");
            return 0;
        }
    }

    private long GetNuCacheFileSize()
    {
        try
        {
            var localTempPath = _hostingEnvironment.LocalTempPath;
            var nuCachePath = Path.Combine(localTempPath, "NuCache");

            if (!Directory.Exists(nuCachePath))
            {
                var umbracoPath = Path.Combine(_hostingEnvironment.ApplicationPhysicalPath, "umbraco", "Data", "NuCache");
                if (Directory.Exists(umbracoPath))
                {
                    nuCachePath = umbracoPath;
                }
                else
                {
                    _logger.LogDebug("NuCache directory not found");
                    return 0;
                }
            }

            long totalSize = 0;
            var allFiles = Directory.GetFiles(nuCachePath, "*", SearchOption.AllDirectories);
            foreach (var file in allFiles)
            {
                var fileInfo = new FileInfo(file);
                totalSize += fileInfo.Length;
            }

            _logger.LogDebug("NuCache total size: {Size} bytes from {Count} files", totalSize, allFiles.Length);
            return totalSize;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not get NuCache file size");
            return 0;
        }
    }

    private long EstimateRuntimeCacheSize(List<object> cacheItems)
    {
        if (cacheItems.Count == 0) return 0;

        try
        {
            var sampleSize = Math.Min(cacheItems.Count, 500);
            var sampledBytes = 0L;

            for (int i = 0; i < sampleSize; i++)
            {
                var item = cacheItems[i];
                if (item == null) continue;
                sampledBytes += EstimateObjectSize(item);
            }

            if (sampleSize > 0)
            {
                var avgBytesPerItem = sampledBytes / sampleSize;
                return avgBytesPerItem * cacheItems.Count;
            }

            return 0;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error estimating runtime cache size");
            return 0;
        }
    }

    private long EstimateObjectSize(object obj)
    {
        if (obj == null) return 0;

        try
        {
            return obj switch
            {
                string s => s.Length * 2 + 56,
                byte[] b => b.Length + 24,
                int => 20,
                long => 24,
                double => 24,
                bool => 17,
                DateTime => 24,
                Guid => 32,
                _ => EstimateComplexObjectSize(obj)
            };
        }
        catch
        {
            return 256;
        }
    }

    private long EstimateComplexObjectSize(object obj)
    {
        try
        {
            var options = new JsonSerializerOptions
            {
                MaxDepth = 3,
                ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles
            };

            var json = JsonSerializer.Serialize(obj, options);
            return (json.Length * 2) + 100;
        }
        catch
        {
            var type = obj.GetType();
            var propertyCount = type.GetProperties().Length;
            return propertyCount * 100 + 200;
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
            @"SELECT COUNT(*) FROM umbracoNode 
              WHERE nodeObjectType = @0 AND trashed = 0",
            Umbraco.Cms.Core.Constants.ObjectTypes.Document);

        var published = db.ExecuteScalar<int>(
            @"SELECT COUNT(*) FROM umbracoDocument d
              INNER JOIN umbracoNode n ON d.nodeId = n.id
              WHERE d.published = 1 AND n.trashed = 0");

        var trashedCount = db.ExecuteScalar<int>(
            @"SELECT COUNT(*) FROM umbracoNode 
              WHERE nodeObjectType = @0 AND trashed = 1",
            Umbraco.Cms.Core.Constants.ObjectTypes.Document);

        var contentTypeCount = db.ExecuteScalar<int>(
            "SELECT COUNT(*) FROM cmsContentType");

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
            @"SELECT COUNT(*) FROM umbracoNode 
              WHERE nodeObjectType = @0 AND trashed = 0",
            Umbraco.Cms.Core.Constants.ObjectTypes.Media);

        var totalSizeBytes = db.ExecuteScalar<long?>(
            @"SELECT SUM(CAST(pd.varcharValue AS BIGINT)) 
              FROM umbracoPropertyData pd
              INNER JOIN cmsPropertyType pt ON pd.propertytypeid = pt.id
              WHERE pt.Alias = 'umbracoBytes' AND pd.varcharValue IS NOT NULL 
              AND pd.varcharValue != ''") ?? 0;

        var images = db.ExecuteScalar<int>(
            @"SELECT COUNT(*) FROM umbracoNode n
              INNER JOIN umbracoContent c ON n.id = c.nodeId
              INNER JOIN cmsContentType ct ON c.contentTypeId = ct.nodeId
              WHERE n.nodeObjectType = @0 AND n.trashed = 0
              AND ct.alias = 'Image'",
            Umbraco.Cms.Core.Constants.ObjectTypes.Media);

        var documents = db.ExecuteScalar<int>(
            @"SELECT COUNT(*) FROM umbracoNode n
              INNER JOIN umbracoContent c ON n.id = c.nodeId
              INNER JOIN cmsContentType ct ON c.contentTypeId = ct.nodeId
              WHERE n.nodeObjectType = @0 AND n.trashed = 0
              AND ct.alias = 'File'",
            Umbraco.Cms.Core.Constants.ObjectTypes.Media);

        var mediaTypeCount = db.ExecuteScalar<int>(
            @"SELECT COUNT(*) FROM cmsContentType 
              WHERE nodeId IN (SELECT id FROM umbracoNode WHERE nodeObjectType = @0)",
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