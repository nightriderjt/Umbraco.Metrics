namespace UmbMetrics.Models;

public class ApplicationInfo
{
    public int ProcessId { get; set; }
    public string ProcessName { get; set; } = string.Empty;
    public bool Is64BitProcess { get; set; }
    public bool Is64BitOperatingSystem { get; set; }
    public int ProcessorCount { get; set; }
    public string DotNetVersion { get; set; } = string.Empty;
    public string RuntimeVersion { get; set; } = string.Empty;
    public string MachineName { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public long UptimeSeconds { get; set; }
    public DateTime StartTime { get; set; }
}