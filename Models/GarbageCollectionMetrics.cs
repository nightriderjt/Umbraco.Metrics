namespace UmbMetrics.Models;

public class GarbageCollectionMetrics
{
    public int Gen0Collections { get; set; }
    public int Gen1Collections { get; set; }
    public int Gen2Collections { get; set; }
    public double TotalMemoryMB { get; set; }
    public double FragmentedMemoryMB { get; set; }
    public double TotalAvailableMemoryMB { get; set; }
    public double HighMemoryLoadThresholdMB { get; set; }
    public double MemoryLoadMB { get; set; }
    public bool IsServerGC { get; set; }
    public string GCLatencyMode { get; set; } = string.Empty;
    public double TotalPauseTimeMs { get; set; }
}