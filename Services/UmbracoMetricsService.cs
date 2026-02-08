using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Core.PublishedCache;

namespace UmbMetrics.Services;

public interface IUmbracoMetricsService
{
    Task<UmbracoMetrics> GetMetricsAsync();
}

public class UmbracoMetricsService : IUmbracoMetricsService
{
    private readonly IContentService _contentService;
    private readonly IMediaService _mediaService;
    private readonly IUserService _userService;
    private readonly IBackOfficeUserManager _backOfficeUserManager;
    private readonly AppCaches _appCaches;
    private readonly ILogger<UmbracoMetricsService> _logger;
    private readonly IUmbracoDatabaseFactory _databaseFactory;

    public UmbracoMetricsService(
        IContentService contentService,
        IMediaService mediaService,
        IUserService userService,
        IBackOfficeUserManager backOfficeUserManager,
        AppCaches appCaches,
        ILogger<UmbracoMetricsService> logger,
        IUmbracoDatabaseFactory databaseFactory)
    {
        _contentService = contentService;
        _mediaService = mediaService;
        _userService = userService;
        _backOfficeUserManager = backOfficeUserManager;
        _appCaches = appCaches;
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

    private async Task<ContentStatistics> GetContentStatisticsAsync()
    {
        var allContent = _contentService.GetRootContent();
        var published = 0;
        var unpublished = 0;
        var total = 0;

        void CountContent(IEnumerable<IContent> nodes)
        {
            foreach (var node in nodes)
            {
                total++;
                if (node.Published)
                    published++;
                else
                    unpublished++;

                var children = _contentService.GetPagedChildren(node.Id, 0, int.MaxValue, out _);
                if (children.Any())
                    CountContent(children);
            }
        }

        CountContent(allContent);

        using var db = _databaseFactory.CreateDatabase();
        var trashedCount = db.ExecuteScalar<int>(
            "SELECT COUNT(*) FROM umbracoNode WHERE nodeObjectType = @0 AND trashed = 1",
            Umbraco.Cms.Core.Constants.ObjectTypes.Document);

        var contentTypeCount = db.ExecuteScalar<int>(
            "SELECT COUNT(*) FROM cmsContentType");

        return new ContentStatistics
        {
            TotalContentNodes = total,
            PublishedNodes = published,
            UnpublishedNodes = unpublished,
            TrashedNodes = trashedCount,
            ContentTypeCount = contentTypeCount
        };
    }

    private async Task<MediaStatistics> GetMediaStatisticsAsync()
    {
        var allMedia = _mediaService.GetRootMedia();
        var total = 0;
        var images = 0;
        var documents = 0;

        void CountMedia(IEnumerable<IMedia> nodes)
        {
            foreach (var node in nodes)
            {
                total++;
                var contentType = node.ContentType.Alias.ToLower();
                
                if (contentType.Contains("image") || contentType.Contains("photo"))
                    images++;
                else if (contentType.Contains("file") || contentType.Contains("document"))
                    documents++;

                var children = _mediaService.GetPagedChildren(node.Id, 0, int.MaxValue, out _);
                if (children.Any())
                    CountMedia(children);
            }
        }

        CountMedia(allMedia);

        using var db = _databaseFactory.CreateDatabase();
        
        // Get total media file size
        var totalSizeBytes = db.ExecuteScalar<long?>(
            @"SELECT SUM(CAST(dataNvarchar AS BIGINT)) 
              FROM cmsPropertyData pd
              INNER JOIN cmsPropertyType pt ON pd.propertytypeid = pt.id
              WHERE pt.Alias = 'umbracoBytes'") ?? 0;

        var mediaTypeCount = db.ExecuteScalar<int>(
            "SELECT COUNT(*) FROM cmsContentType WHERE nodeId IN (SELECT id FROM umbracoNode WHERE nodeObjectType = @0)",
             Umbraco.Cms.Core.Constants.ObjectTypes.Media);

        return new MediaStatistics
        {
            TotalMediaItems = total,
            TotalMediaSizeMB = Math.Round(totalSizeBytes / 1024.0 / 1024.0, 2),
            MediaTypeCount = mediaTypeCount,
            ImagesCount = images,
            DocumentsCount = documents
        };
    }

    private CacheStatistics GetCacheStatistics()
    {
        var runtimeCacheCount = 0;
        var nuCacheCount = 0;

        try
        {
            // Get runtime cache count (this is an approximation)
            if (_appCaches.RuntimeCache is AppCaches runtimeCache)
            {
                runtimeCacheCount = runtimeCache.RuntimeCache.SearchByKey("").Count();
            }

            // NuCache published snapshot count
          
                var nuCache = _appCaches.IsolatedCaches.Get<IPublishedContentCache>().Result;
                if (nuCache != null)
                {
                    nuCacheCount = nuCache.SearchByKey("").Count();
                }
            
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not retrieve cache statistics");
        }

        return new CacheStatistics
        {
            RuntimeCacheCount = runtimeCacheCount,
            NuCacheCount = nuCacheCount,
            RequestCacheHitRatio = 0.0, // This would require custom tracking
            TotalCacheSize = "N/A"
        };
    }

    private async Task<BackofficeUserInfo> GetBackofficeUserInfoAsync()
    {
        var allUsers = _userService.GetAll(0, int.MaxValue, out var totalRecords).ToList();
        var activeUsers = allUsers.Count(u => !u.IsLockedOut && u.IsApproved);
        var adminUsers = allUsers.Count(u => u.Groups.Any(g => g.Alias ==Umbraco.Cms.Core.Constants.Security .AdminGroupAlias));

        // Count current sessions (users logged in within last 30 minutes)
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

// DTOs
public class UmbracoMetrics
{
    public DateTime Timestamp { get; set; }
    public ContentStatistics ContentStatistics { get; set; } = new();
    public MediaStatistics MediaStatistics { get; set; } = new();
    public CacheStatistics CacheStatistics { get; set; } = new();
    public BackofficeUserInfo BackofficeUsers { get; set; } = new();
}

public class ContentStatistics
{
    public int TotalContentNodes { get; set; }
    public int PublishedNodes { get; set; }
    public int UnpublishedNodes { get; set; }
    public int TrashedNodes { get; set; }
    public int ContentTypeCount { get; set; }
}

public class MediaStatistics
{
    public int TotalMediaItems { get; set; }
    public double TotalMediaSizeMB { get; set; }
    public int MediaTypeCount { get; set; }
    public int ImagesCount { get; set; }
    public int DocumentsCount { get; set; }
}

public class CacheStatistics
{
    public int RuntimeCacheCount { get; set; }
    public int NuCacheCount { get; set; }
    public double RequestCacheHitRatio { get; set; }
    public string TotalCacheSize { get; set; } = "N/A";
}

public class BackofficeUserInfo
{
    public int ActiveUsers { get; set; }
    public int TotalUsers { get; set; }
    public int AdminUsers { get; set; }
    public int CurrentSessions { get; set; }
}