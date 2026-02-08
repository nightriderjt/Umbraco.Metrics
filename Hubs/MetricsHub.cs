using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using UmbMetrics.Services;
using Umbraco.Cms.Web.Common.Authorization;

namespace UmbMetrics.Hubs;

/// <summary>
/// SignalR hub for broadcasting real-time performance metrics
/// </summary>
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
public class MetricsHub : Hub
{
    private readonly IPerformanceMetricsService _metricsService;

    public MetricsHub(IPerformanceMetricsService metricsService)
    {
        _metricsService = metricsService;
    }

    /// <summary>
    /// Called when a client connects to the hub
    /// </summary>
    public override async Task OnConnectedAsync()
    {
        // Send initial metrics on connection
        var metrics = await _metricsService.GetMetricsAsync();
        await Clients.Caller.SendAsync("ReceiveMetrics", metrics);
        
        await base.OnConnectedAsync();
    }

    /// <summary>
    /// Manually request metrics update
    /// </summary>
    public async Task RequestMetrics()
    {
        var metrics = await _metricsService.GetMetricsAsync();
        await Clients.Caller.SendAsync("ReceiveMetrics", metrics);
    }
}