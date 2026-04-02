using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Services;

/// <summary>
/// Background service that monitors thresholds every second
/// </summary>
public class ThresholdMonitoringService : BackgroundService
{
    private readonly IThresholdEvaluationService _thresholdService;
    private readonly IPerformanceMetricsService _metricsService;
    private readonly ILogger<ThresholdMonitoringService> _logger;
    private readonly TimeSpan _evaluationInterval = TimeSpan.FromSeconds(1);

    public ThresholdMonitoringService(
        IThresholdEvaluationService thresholdService,
        IPerformanceMetricsService metricsService,
        ILogger<ThresholdMonitoringService> logger)
    {
        _thresholdService = thresholdService;
        _metricsService = metricsService;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Threshold monitoring service started. Evaluation interval: {Interval} seconds", _evaluationInterval.TotalSeconds);

        // Small delay to allow other services to initialize
        await Task.Delay(TimeSpan.FromSeconds(2), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                // Get current metrics
                var metrics = await _metricsService.GetMetricsAsync();
                
                // Evaluate thresholds
                await _thresholdService.EvaluateThresholdsAsync(metrics);
                
                _logger.LogDebug("Threshold evaluation completed at {Timestamp}", DateTime.UtcNow);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during threshold evaluation");
            }

            // Wait for the next evaluation interval
            try
            {
                await Task.Delay(_evaluationInterval, stoppingToken);
            }
            catch (TaskCanceledException)
            {
                // Service is stopping
                break;
            }
        }

        _logger.LogInformation("Threshold monitoring service stopped");
    }

    public override async Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Starting threshold monitoring service...");
        await base.StartAsync(cancellationToken);
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Stopping threshold monitoring service...");
        await base.StopAsync(cancellationToken);
    }
}