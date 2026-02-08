namespace UmbMetrics.Models;

public class MemoryMetrics
{
    public double WorkingSetMB { get; set; }
    public double PrivateMemoryMB { get; set; }
    public double VirtualMemoryMB { get; set; }
    public double GcTotalMemoryMB { get; set; }
    public double GcGen0HeapSizeMB { get; set; }
    public double GcGen1HeapSizeMB { get; set; }
    public double GcGen2HeapSizeMB { get; set; }
    public double TotalHeapSizeMB { get; set; }
    public double FragmentedMemoryMB { get; set; }
}