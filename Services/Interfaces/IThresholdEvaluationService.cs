using UmbMetrics.Models;

namespace UmbMetrics.Services.Interfaces;

public interface IThresholdEvaluationService
{
    /// <summary>
    /// Evaluates all enabled threshold rules against current metrics
    /// </summary>
    Task EvaluateThresholdsAsync(PerformanceMetrics metrics);
    
    /// <summary>
    /// Evaluates a specific threshold rule against current metrics
    /// </summary>
    Task<bool> EvaluateRuleAsync(ThresholdRule rule, PerformanceMetrics metrics);
    
    /// <summary>
    /// Gets all active alerts
    /// </summary>
    Task<IEnumerable<ThresholdAlert>> GetActiveAlertsAsync();
    
    /// <summary>
    /// Gets all threshold rules
    /// </summary>
    Task<IEnumerable<ThresholdRule>> GetThresholdRulesAsync();
    
    /// <summary>
    /// Gets a specific threshold rule by ID
    /// </summary>
    Task<ThresholdRule?> GetThresholdRuleAsync(int id);
    
    /// <summary>
    /// Creates a new threshold rule
    /// </summary>
    Task<ThresholdRule> CreateThresholdRuleAsync(ThresholdRule rule);
    
    /// <summary>
    /// Updates an existing threshold rule
    /// </summary>
    Task<ThresholdRule> UpdateThresholdRuleAsync(int id, ThresholdRule rule);
    
    /// <summary>
    /// Deletes a threshold rule
    /// </summary>
    Task<bool> DeleteThresholdRuleAsync(int id);
    
    /// <summary>
    /// Acknowledges an alert
    /// </summary>
    Task<bool> AcknowledgeAlertAsync(int alertId, string acknowledgedBy);
    
    /// <summary>
    /// Resolves an alert
    /// </summary>
    Task<bool> ResolveAlertAsync(int alertId, string resolvedBy, string? notes = null);
    
    /// <summary>
    /// Gets alert statistics
    /// </summary>
    Task<ThresholdAlertStats> GetAlertStatsAsync();
    
    /// <summary>
    /// Tests a threshold rule against current metrics
    /// </summary>
    Task<ThresholdTestResult> TestThresholdRuleAsync(ThresholdRule rule);
}

public interface IEmailNotificationService
{
    /// <summary>
    /// Sends an alert notification email
    /// </summary>
    Task<bool> SendAlertEmailAsync(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics metrics);
    
    /// <summary>
    /// Sends an alert resolved email
    /// </summary>
    Task<bool> SendAlertResolvedEmailAsync(ThresholdAlert alert, ThresholdRule rule);
    

    
  
}

public interface IWebhookNotificationService
{
    /// <summary>
    /// Sends alert notification to all configured webhooks
    /// </summary>
    Task SendAlertWebhooksAsync(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics metrics);
    
    /// <summary>
    /// Sends alert resolved notification to all configured webhooks
    /// </summary>
    Task SendAlertResolvedWebhooksAsync(ThresholdAlert alert, ThresholdRule rule);
    
    /// <summary>
    /// Tests a webhook endpoint
    /// </summary>
    Task<WebhookTestResult> TestWebhookEndpointAsync(WebhookEndpoint endpoint);
    
    /// <summary>
    /// Gets all webhook endpoints
    /// </summary>
    Task<IEnumerable<WebhookEndpoint>> GetWebhookEndpointsAsync();
    
    /// <summary>
    /// Creates a new webhook endpoint
    /// </summary>
    Task<WebhookEndpoint> CreateWebhookEndpointAsync(WebhookEndpoint endpoint);
    
    /// <summary>
    /// Updates a webhook endpoint
    /// </summary>
    Task<WebhookEndpoint> UpdateWebhookEndpointAsync(int id, WebhookEndpoint endpoint);
    
    /// <summary>
    /// Deletes a webhook endpoint
    /// </summary>
    Task<bool> DeleteWebhookEndpointAsync(int id);
}

public class ThresholdAlertStats
{
    public int TotalAlerts { get; set; }
    public int ActiveAlerts { get; set; }
    public int AcknowledgedAlerts { get; set; }
    public int ResolvedAlerts { get; set; }
    public Dictionary<string, int> BySeverity { get; set; } = new();
    public int Last24Hours { get; set; }
    public int Last7Days { get; set; }
    public DateTime? LastAlertTime { get; set; }
    public Dictionary<string, int> AlertsByRule { get; set; } = new();
}

public class ThresholdTestResult
{
    public bool ConditionMet { get; set; }
    public string EvaluationDetails { get; set; } = string.Empty;
    public Dictionary<string, object> CurrentValues { get; set; } = new();
    public TimeSpan EvaluationWindow { get; set; }
    public bool WouldTriggerAlert { get; set; }
}

public class WebhookTestResult
{
    public bool Success { get; set; }
    public int StatusCode { get; set; }
    public string? ResponseBody { get; set; }
    public string? ErrorMessage { get; set; }
    public TimeSpan Duration { get; set; }
}