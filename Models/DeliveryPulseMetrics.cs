namespace UmbMetrics.Models;

public class DeliveryPulseMetrics
{
    public DateTime Timestamp { get; set; }
    public int TotalRequests { get; set; }
    public int TotalErrors { get; set; }
    public int Total404s { get; set; }
    public double AverageLatencyMs { get; set; }
    public double MaxLatencyMs { get; set; }
    public List<DeliveryPulseEndpointStats> TopEndpoints { get; set; } = [];
}

public class DeliveryPulseEndpointStats
{
    public string Path { get; set; } = string.Empty;
    public string Method { get; set; } = string.Empty;
    public int RequestCount { get; set; }
    public double AverageLatencyMs { get; set; }
    public double MaxLatencyMs { get; set; }
    public int ErrorCount { get; set; }
    public int NotFoundCount { get; set; }
    public double? AverageRequestSizeBytes { get; set; }
    public double? AverageResponseSizeBytes { get; set; }
    public DateTime LastAccessed { get; set; }
}
