using System.IO;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Services;

public class MetricsCleanUpService : BackgroundService, IMetricsCleanUpService
{
    private IPerformanceMetricsService _performanceMetricsService;
    private ILogger<HistoricalMetricsService> _logger;
    private HistoricalMetricsOptions _options;

    public MetricsCleanUpService(
         IPerformanceMetricsService performanceMetricsService,
        ILogger<HistoricalMetricsService> logger,
        IOptions<HistoricalMetricsOptions> options)
    {
        _performanceMetricsService = performanceMetricsService;
        _logger = logger;
        _options = options.Value;
    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Historical Metrics Cleanup started");
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CleanupOldDataAsync();
                await Task.Delay(_options.CleanupIntervalHours * 60*1000, stoppingToken);
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogInformation(ex, "Historical Metrics Cleanup stopped");
            }
        }
    }


    public async Task CleanupOldDataAsync(int? retentionDays = null)
    {
        try
        {
            UpdateCleanupLogicForDailyFiles(retentionDays);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cleaning up old data");
        }
    }

    private void UpdateCleanupLogicForDailyFiles(int? customRetentionDays = null)
    {
        try
        {
            var effectiveRetentionDays = customRetentionDays ?? _options.RetentionDays;
            var cutoffDate = DateTime.UtcNow.AddDays(-effectiveRetentionDays).Date;
            var files = Directory.GetFiles(_options.StoragePath, "metrics-*.json");

            int deletedCount = 0;
            foreach (var file in files)
            {
                if (Utils.TryParseDateFromFileName(file, out var fileDate) && fileDate < cutoffDate)
                {
                    try
                    {
                        File.Delete(file);
                        deletedCount++;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Error deleting old metrics file: {File}", file);
                    }
                }
            }

            if (deletedCount > 0)
            {
                _logger.LogInformation("Cleaned up {Count} old metrics files (retention: {RetentionDays} days)", deletedCount, effectiveRetentionDays);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cleaning up old data");
        }
    }
}
