using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using UmbMetrics.Hubs;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Services;

/// <summary>
/// Background service that broadcasts metrics to all connected clients
/// </summary>
public class MetricsBroadcastService : BackgroundService
{
    private readonly IHubContext<MetricsHub> _hubContext;
    private readonly IPerformanceMetricsService _metricsService;
    private readonly ILogger<MetricsBroadcastService> _logger;
    private readonly IThresholdEvaluationService _thresholdEvaluationService;
    private readonly TimeSpan _broadcastInterval = TimeSpan.FromSeconds(1);
    public static bool _isRunning { get;  set; }

    public MetricsBroadcastService(
        IHubContext<MetricsHub> hubContext,
        IPerformanceMetricsService metricsService,
        ILogger<MetricsBroadcastService> logger,
        IThresholdEvaluationService thresholdEvaluationService)
    {
        _hubContext = hubContext;
        _metricsService = metricsService;
        _logger = logger;
        _thresholdEvaluationService = thresholdEvaluationService;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Metrics broadcast service started");
        _isRunning = true;
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var metrics = await _metricsService.GetMetricsAsync();
                
                // Broadcast to all connected clients
                await _hubContext.Clients.All.SendAsync(
                    "ReceiveMetrics", 
                    metrics, 
                    stoppingToken);
                await _thresholdEvaluationService.EvaluateThresholdsAsync(metrics);              
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error broadcasting metrics");
            }
            await Task.Delay(_broadcastInterval, stoppingToken);
        }
        _isRunning = false;
        _logger.LogInformation("Metrics broadcast service stopped");
    }
}