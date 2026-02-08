namespace UmbMetrics.Models;

public class ThreadInfo
{
    public int ThreadCount { get; set; }
    public int ThreadPoolThreadCount { get; set; }
    public long CompletedWorkItemCount { get; set; }
    public long PendingWorkItemCount { get; set; }
}