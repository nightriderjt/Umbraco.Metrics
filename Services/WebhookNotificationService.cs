using Microsoft.Extensions.Logging;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Services;

public class WebhookNotificationService : IWebhookNotificationService
{
    private readonly ILogger<WebhookNotificationService> _logger;
    private readonly HttpClient _httpClient;
    private readonly List<WebhookEndpoint> _endpointsCache = new();
    private DateTime _lastCacheRefresh = DateTime.MinValue;
    private readonly TimeSpan _cacheRefreshInterval = TimeSpan.FromMinutes(5);

    public WebhookNotificationService(ILogger<WebhookNotificationService> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("WebhookClient");
        _httpClient.Timeout = TimeSpan.FromSeconds(30);
    }

    public async Task SendAlertWebhooksAsync(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics metrics)
    {
        try
        {
            await RefreshEndpointsCacheIfNeededAsync();
            
            var enabledEndpoints = _endpointsCache
                .Where(e => e.IsEnabled && e.IsValid())
                .ToList();

            if (enabledEndpoints.Count == 0)
            {
                _logger.LogDebug("No enabled webhook endpoints configured");
                return;
            }

            var tasks = enabledEndpoints.Select(endpoint => 
                SendWebhookAsync(endpoint, CreateAlertPayload(alert, rule, metrics, false)));
            
            await Task.WhenAll(tasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending alert webhooks for alert {AlertId}", alert.Id);
        }
    }

    public async Task SendAlertResolvedWebhooksAsync(ThresholdAlert alert, ThresholdRule rule)
    {
        try
        {
            await RefreshEndpointsCacheIfNeededAsync();
            
            var enabledEndpoints = _endpointsCache
                .Where(e => e.IsEnabled && e.IsValid())
                .ToList();

            if (enabledEndpoints.Count == 0)
            {
                _logger.LogDebug("No enabled webhook endpoints configured");
                return;
            }

            var tasks = enabledEndpoints.Select(endpoint => 
                SendWebhookAsync(endpoint, CreateAlertPayload(alert, rule, null, true)));
            
            await Task.WhenAll(tasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending alert resolved webhooks for alert {AlertId}", alert.Id);
        }
    }

    public async Task<WebhookTestResult> TestWebhookEndpointAsync(WebhookEndpoint endpoint)
    {
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        
        try
        {
            if (!endpoint.IsValid())
            {
                return new WebhookTestResult
                {
                    Success = false,
                    StatusCode = 0,
                    ErrorMessage = "Webhook endpoint configuration is invalid",
                    Duration = stopwatch.Elapsed
                };
            }

            var testPayload = new
            {
                Event = "test",
                Timestamp = DateTime.UtcNow,
                Message = "Webhook configuration test from Umbraco Metrics",
                Server = Environment.MachineName,
                Application = "Umbraco Metrics"
            };

            var response = await SendHttpRequestAsync(endpoint, testPayload);
            
            stopwatch.Stop();
            
            return new WebhookTestResult
            {
                Success = response.IsSuccessStatusCode,
                StatusCode = (int)response.StatusCode,
                ResponseBody = await response.Content.ReadAsStringAsync(),
                Duration = stopwatch.Elapsed
            };
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            
            return new WebhookTestResult
            {
                Success = false,
                StatusCode = 0,
                ErrorMessage = ex.Message,
                Duration = stopwatch.Elapsed
            };
        }
    }

    public async Task<IEnumerable<WebhookEndpoint>> GetWebhookEndpointsAsync()
    {
        await RefreshEndpointsCacheIfNeededAsync();
        return _endpointsCache.AsEnumerable();
    }

    public async Task<WebhookEndpoint> CreateWebhookEndpointAsync(WebhookEndpoint endpoint)
    {
        // TODO: Save to database
        endpoint.Id = _endpointsCache.Count + 1;
        _endpointsCache.Add(endpoint);
        await RefreshEndpointsCacheAsync();
        return endpoint;
    }

    public async Task<WebhookEndpoint> UpdateWebhookEndpointAsync(int id, WebhookEndpoint endpoint)
    {
        // TODO: Update in database
        var existing = _endpointsCache.FirstOrDefault(e => e.Id == id);
        if (existing != null)
        {
            _endpointsCache.Remove(existing);
            endpoint.Id = id;
            _endpointsCache.Add(endpoint);
        }
        await RefreshEndpointsCacheAsync();
        return endpoint;
    }

    public async Task<bool> DeleteWebhookEndpointAsync(int id)
    {
        // TODO: Delete from database
        var endpoint = _endpointsCache.FirstOrDefault(e => e.Id == id);
        if (endpoint != null)
        {
            _endpointsCache.Remove(endpoint);
            await RefreshEndpointsCacheAsync();
            return true;
        }
        return false;
    }

    private async Task SendWebhookAsync(WebhookEndpoint endpoint, object payload)
    {
        try
        {
            var response = await SendHttpRequestAsync(endpoint, payload);
            
            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Webhook sent successfully to {WebhookName} ({Url})", endpoint.Name, endpoint.Url);
                
                // Record successful delivery
                await RecordWebhookDeliveryAsync(endpoint, true, (int)response.StatusCode);
            }
            else
            {
                _logger.LogWarning("Webhook failed with status {StatusCode} for {WebhookName} ({Url})", 
                    response.StatusCode, endpoint.Name, endpoint.Url);
                
                // Record failed delivery
                await RecordWebhookDeliveryAsync(endpoint, false, (int)response.StatusCode, 
                    await response.Content.ReadAsStringAsync());
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending webhook to {WebhookName} ({Url})", endpoint.Name, endpoint.Url);
            
            // Record failed delivery
            await RecordWebhookDeliveryAsync(endpoint, false, 0, ex.Message);
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

    private object CreateAlertPayload(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics? metrics, bool isResolved)
    {
        var triggeredValues = alert.GetTriggeredValues();
        
        var payload = new
        {
            Event = isResolved ? "threshold_alert_resolved" : "threshold_alert_triggered",
            Timestamp = DateTime.UtcNow,
            Alert = new
            {
                Id = alert.Id,
                RuleId = alert.RuleId,
                RuleName = alert.RuleName,
                Severity = alert.Severity.ToString(),
                Status = alert.Status.ToString(),
                TriggeredAt = alert.TriggeredAt,
                ResolvedAt = alert.ResolvedAt,
                AcknowledgedAt = alert.AcknowledgedAt,
                Duration = alert.Duration.TotalSeconds,
                ResolvedBy = alert.ResolvedBy,
                ResolutionNotes = alert.ResolutionNotes
            },
            Rule = new
            {
                Name = rule.Name,
                Description = rule.Description,
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
                CpuUsage = metrics.CpuUsage,
                MemoryUsage = metrics.MemoryUsage.WorkingSetMB,
                ActiveRequests = metrics.RequestMetrics.ActiveRequests,
                AverageResponseTime = metrics.RequestMetrics.AverageResponseTimeMs,
                RequestsPerSecond = metrics.RequestMetrics.RequestsPerSecond,
                FailedRequests = metrics.RequestMetrics.FailedRequests
            } : null,
            TriggeredValues = triggeredValues
        };

        return payload;
    }

    private async Task RecordWebhookDeliveryAsync(WebhookEndpoint endpoint, bool success, int statusCode, string? errorMessage = null)
    {
        var delivery = new WebhookDelivery
        {
            WebhookEndpointId = endpoint.Id,
            WebhookName = endpoint.Name,
            WebhookUrl = endpoint.Url,
            SentAt = DateTime.UtcNow,
            Success = success,
            StatusCode = statusCode,
            ErrorMessage = errorMessage
        };

        // TODO: Save delivery to database
        
        await Task.CompletedTask;
    }

    private async Task RefreshEndpointsCacheIfNeededAsync()
    {
        if (DateTime.UtcNow - _lastCacheRefresh > _cacheRefreshInterval)
        {
            await RefreshEndpointsCacheAsync();
        }
    }

    private async Task RefreshEndpointsCacheAsync()
    {
        try
        {
            // TODO: Load endpoints from database
            // For now, using empty cache
            _endpointsCache.Clear();
            _lastCacheRefresh = DateTime.UtcNow;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing webhook endpoints cache");
        }
        
        await Task.CompletedTask;
    }
}