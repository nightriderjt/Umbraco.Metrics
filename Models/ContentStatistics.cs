namespace UmbMetrics.Models;

public class ContentStatistics
{
    public int TotalContentNodes { get; set; }
    public int PublishedNodes { get; set; }
    public int UnpublishedNodes { get; set; }
    public int TrashedNodes { get; set; }
    public int ContentTypeCount { get; set; }
}