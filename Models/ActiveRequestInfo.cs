namespace UmbMetrics.Models;

public class ActiveRequestInfo
{
    public string RequestId { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public string Method { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public double DurationMs { get; set; }
    public string QueryString { get; set; } = string.Empty;
    public string UserAgent { get; set; } = string.Empty;
    public string RemoteIp { get; set; } = string.Empty;
}