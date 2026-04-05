namespace UmbMetrics.Models;

public class ThresholdAlertStats
{
    public int TotalAlerts { get; set; }
    public int ActiveAlerts { get; set; }
    public int AcknowledgedAlerts { get; set; }

    public Dictionary<string, int> BySeverity { get; set; } = new();
    public int Last24Hours { get; set; }
    public int Last7Days { get; set; }
    public DateTime? LastAlertTime { get; set; }
    public Dictionary<string, int> AlertsByRule { get; set; } = new();
}



