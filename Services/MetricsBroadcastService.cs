using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using UmbMetrics.Hubs;

namespace UmbMetrics.Services;

/// <summary>
/// Background service that broadcasts metrics to all connected clients
/// </summary>
public class MetricsBroadcastService : BackgroundService
{
    private readonly IHubContext<MetricsHub> _hubContext;
    private readonly IPerformanceMetricsService _metricsService;
    private readonly ILogger<MetricsBroadcastService> _logger;
    private readonly TimeSpan _broadcastInterval = TimeSpan.FromSeconds(5);

    public MetricsBroadcastService(
        IHubContext<MetricsHub> hubContext,
        IPerformanceMetricsService metricsService,
        ILogger<MetricsBroadcastService> logger)
    {
        _hubContext = hubContext;
        _metricsService = metricsService;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Metrics broadcast service started");

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

                _logger.LogDebug("Broadcasted metrics to all connected clients");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error broadcasting metrics");
            }

            await Task.Delay(_broadcastInterval, stoppingToken);
        }

        _logger.LogInformation("Metrics broadcast service stopped");
    }
}