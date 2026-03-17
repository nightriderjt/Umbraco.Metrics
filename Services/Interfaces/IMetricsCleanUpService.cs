namespace UmbMetrics.Services.Interfaces;

public interface IMetricsCleanUpService
{

    /// <summary>
    /// Cleans up old historical data based on retention policy
    /// </summary>
    Task CleanupOldDataAsync();
  
}
