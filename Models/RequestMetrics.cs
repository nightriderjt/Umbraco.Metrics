namespace UmbMetrics.Models;

public class RequestMetrics
{
    public long TotalRequests { get; set; }
    public double RequestsPerSecond { get; set; }
    public double AverageResponseTimeMs { get; set; }
    public int ActiveRequests { get; set; }
    public long FailedRequests { get; set; }
    public int LastMinuteRequests { get; set; }
}