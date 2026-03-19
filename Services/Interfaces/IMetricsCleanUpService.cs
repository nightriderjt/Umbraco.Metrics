namespace UmbMetrics.Services.Interfaces;

public interface IMetricsCleanUpService
{

    /// <summary>
    /// Cleans up old historical data based on retention policy
    /// </summary>
    /// <param name="retentionDays">Optional custom retention days. If null, uses default from configuration.</param>
    Task CleanupOldDataAsync(int? retentionDays = null);
  
}
