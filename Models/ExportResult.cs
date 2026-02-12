namespace UmbMetrics.Models;

public class ExportResult
{
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public byte[] Data { get; set; } = Array.Empty<byte>();
    public long SizeBytes { get; set; }
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
}