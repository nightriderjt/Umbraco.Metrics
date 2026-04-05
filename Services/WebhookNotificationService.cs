using Microsoft.Extensions.Logging;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;
using Umbraco.Cms.Infrastructure.Persistence;

namespace UmbMetrics.Services;

public class WebhookNotificationService : IWebhookNotificationService
{
    private readonly ILogger<WebhookNotificationService> _logger;
    private readonly HttpClient _httpClient;
    private readonly IUmbracoDatabaseFactory _databaseFactory;
    private readonly List<WebhookEndpoint> _endpointsCache = new();
    private DateTime _lastCacheRefresh = DateTime.MinValue;
    private readonly TimeSpan _cacheRefreshInterval = TimeSpan.FromMinutes(5);

    public WebhookNotificationService(
        ILogger<WebhookNotificationService> logger, 
        IHttpClientFactory httpClientFactory,
        IUmbracoDatabaseFactory databaseFactory)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("WebhookClient");
        _httpClient.Timeout = TimeSpan.FromSeconds(30);
        _databaseFactory = databaseFactory;
    }

    public async Task SendAlertWebhooksAsync(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics metrics)
    {
        try
        {          
            
            var enabledEndpoints =rule.WebhookEndpoints
                .Where(e => e.IsEnabled && e.IsValid())
                .ToList();

            if (enabledEndpoints.Count == 0)
            {
                _logger.LogDebug("No enabled webhook endpoints configured");
                return;
            }

            var tasks = enabledEndpoints.Select(endpoint => 
                SendWebhookAsync(endpoint, CreateAlertPayload(alert, rule, metrics)));
            
            await Task.WhenAll(tasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending alert webhooks for alert {AlertId}", alert.Id);
        }
    }


    private async Task SendWebhookAsync(WebhookEndpoint endpoint, object payload)
    {
        try
        {
            var response = await SendHttpRequestAsync(endpoint, payload);
            
            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Webhook sent successfully to {WebhookName} ({Url})", endpoint.Name, endpoint.Url);
            }
            else
            {
                _logger.LogWarning("Webhook failed with status {StatusCode} for {WebhookName} ({Url})", 
                    response.StatusCode, endpoint.Name, endpoint.Url);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending webhook to {WebhookName} ({Url})", endpoint.Name, endpoint.Url);
        }
    }

    private async Task<HttpResponseMessage> SendHttpRequestAsync(WebhookEndpoint endpoint, object payload)
    {
        var jsonPayload = JsonSerializer.Serialize(payload);
        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, endpoint.Url)
        {
            Content = content
        };

        // Add custom headers
        if (endpoint.Headers != null)
        {
            foreach (var header in endpoint.Headers)
            {
                request.Headers.TryAddWithoutValidation(header.Key, header.Value);
            }
        }

        // Add default headers if not already present
        if (!request.Headers.Contains("User-Agent"))
        {
            request.Headers.Add("User-Agent", "Umbraco-Metrics/1.0");
        }

        return await _httpClient.SendAsync(request);
    }

    private object CreateAlertPayload(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics? metrics)
    {
        var triggeredValues = alert.GetTriggeredValues();
        
        var payload = new
        {
            Event =  "threshold_alert_triggered",
            Timestamp = DateTime.UtcNow,
            Alert = new
            {
                alert.Id,
                alert.RuleId,
                alert.RuleName,
                Severity = alert.Severity.ToString(),
                Status = alert.Status.ToString(),
                alert.TriggeredAt,
                alert.AcknowledgedAt,
                Duration = alert.Duration.TotalSeconds               
            },
            Rule = new
            {
                rule.Name,
                rule.Description,
                Condition = rule.RootCondition.ToString(),
                EvaluationWindowSeconds = rule.EvaluationWindow.TotalSeconds,
                Severity = rule.Severity.ToString(),
                CooldownPeriodSeconds = rule.CooldownPeriod.TotalSeconds
            },
            Server = new
            {
                Name = Environment.MachineName,
                Timestamp = metrics?.Timestamp ?? DateTime.UtcNow
            },
            Metrics = metrics != null ? new
            {
                metrics.CpuUsage,
                MemoryUsage = metrics.MemoryUsage.WorkingSetMB,
                metrics.RequestMetrics.ActiveRequests,
                AverageResponseTime = metrics.RequestMetrics.AverageResponseTimeMs,
                metrics.RequestMetrics.RequestsPerSecond,
                metrics.RequestMetrics.FailedRequests
            } : null,
            TriggeredValues = triggeredValues
        };

        return payload;
    }
}