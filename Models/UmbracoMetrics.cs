namespace UmbMetrics.Models;

public class UmbracoMetrics
{
    public DateTime Timestamp { get; set; }
    public ContentStatistics ContentStatistics { get; set; } = new();
    public MediaStatistics MediaStatistics { get; set; } = new();
    public CacheStatistics CacheStatistics { get; set; } = new();
    public BackofficeUserInfo BackofficeUsers { get; set; } = new();
}