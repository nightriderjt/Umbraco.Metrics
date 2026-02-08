namespace UmbMetrics.Models;

public class PerformanceMetrics
{
    public DateTime Timestamp { get; set; }
    public double CpuUsage { get; set; }
    public MemoryMetrics MemoryUsage { get; set; } = new();
    public ThreadInfo ThreadInfo { get; set; } = new();
    public GarbageCollectionMetrics GarbageCollectionStats { get; set; } = new();
    public RequestMetrics RequestMetrics { get; set; } = new();
    public ApplicationInfo ApplicationInfo { get; set; } = new();
}