using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text.Json;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Services;

public class ThresholdEvaluationService : IThresholdEvaluationService
{
    private readonly ILogger<ThresholdEvaluationService> _logger;
    private readonly IEmailNotificationService _emailService;
    private readonly IWebhookNotificationService _webhookService;
    private readonly IOptions<ThresholdRulesSettings> _thresholdRulesSettings;
    private readonly List<ThresholdRule> _rulesCache = new();
    private readonly Dictionary<string, List<DateTime>> _ruleEvaluationHistory = new();
    private readonly object _lock = new();
    private DateTime _lastCacheRefresh = DateTime.MinValue;
    private readonly TimeSpan _cacheRefreshInterval = TimeSpan.FromMinutes(5);

    public ThresholdEvaluationService(
        ILogger<ThresholdEvaluationService> logger,
        IEmailNotificationService emailService,
        IWebhookNotificationService webhookService,
        IOptions<ThresholdRulesSettings> thresholdRulesSettings)
    {
        _logger = logger;
        _emailService = emailService;
        _webhookService = webhookService;
        _thresholdRulesSettings = thresholdRulesSettings;
    }

    public async Task EvaluateThresholdsAsync(PerformanceMetrics metrics)
    {
        try
        {
            await RefreshRulesCacheIfNeededAsync();
            
            var enabledRules = _rulesCache.Where(r => r.IsEnabled).ToList();
            
            foreach (var rule in enabledRules)
            {
                try
                {
                    var conditionMet = await EvaluateRuleAsync(rule, metrics);
                    
                    if (conditionMet && rule.ShouldEvaluate)
                    {
                        await TriggerAlertAsync(rule, metrics);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error evaluating threshold rule: {RuleName}", rule.Name);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error evaluating thresholds");
        }
    }

    public async Task<bool> EvaluateRuleAsync(ThresholdRule rule, PerformanceMetrics metrics)
    {
        // Record evaluation time
        RecordEvaluationTime(rule.Name);
        
        // Check if we have enough data points for the evaluation window
        if (!HasEnoughDataPoints(rule.Name, rule.EvaluationWindow))
        {
            return false;
        }
        
        // Evaluate the condition
        return EvaluateCondition(rule.RootCondition, metrics);
    }

    private bool EvaluateCondition(ThresholdCondition condition, PerformanceMetrics metrics)
    {
        if (condition.IsSingleCondition)
        {
            return EvaluateSingleCondition(condition, metrics);
        }
        else if (condition.IsCompositeCondition)
        {
            return EvaluateCompositeCondition(condition, metrics);
        }
        
        return false;
    }

    private bool EvaluateSingleCondition(ThresholdCondition condition, PerformanceMetrics metrics)
    {
        if (!condition.Metric.HasValue || !condition.Operator.HasValue || !condition.Value.HasValue)
        {
            return false;
        }

        double metricValue = GetMetricValue(condition.Metric.Value, metrics);
        
        return CompareValues(metricValue, condition.Operator.Value, condition.Value.Value);
    }

    private bool EvaluateCompositeCondition(ThresholdCondition condition, PerformanceMetrics metrics)
    {
        if (condition.Children == null || condition.Children.Count == 0)
        {
            return false;
        }

        var childResults = condition.Children.Select(c => EvaluateCondition(c, metrics)).ToList();
        
        return condition.Type switch
        {
            ConditionType.And => childResults.All(r => r),
            ConditionType.Or => childResults.Any(r => r),
            _ => false
        };
    }

    private double GetMetricValue(MetricType metricType, PerformanceMetrics metrics)
    {
        return metricType switch
        {
            MetricType.CpuUsage => metrics.CpuUsage,
            MetricType.MemoryUsage => metrics.MemoryUsage.WorkingSetMB,
            MetricType.ActiveRequests => metrics.RequestMetrics.ActiveRequests,
            MetricType.AverageResponseTime => metrics.RequestMetrics.AverageResponseTimeMs,
            MetricType.RequestsPerSecond => metrics.RequestMetrics.RequestsPerSecond,
            MetricType.FailedRequests => metrics.RequestMetrics.FailedRequests,
            MetricType.ThreadCount => metrics.ThreadInfo.ThreadCount,
            MetricType.WorkingSetMB => metrics.MemoryUsage.WorkingSetMB,
            MetricType.PrivateMemoryMB => metrics.MemoryUsage.PrivateMemoryMB,
            MetricType.GcTotalMemoryMB => metrics.MemoryUsage.GcTotalMemoryMB,
            _ => 0
        };
    }

    private bool CompareValues(double actualValue, ComparisonOperator op, double expectedValue)
    {
        return op switch
        {
            ComparisonOperator.GreaterThan => actualValue > expectedValue,
            ComparisonOperator.GreaterThanOrEqual => actualValue >= expectedValue,
            ComparisonOperator.LessThan => actualValue < expectedValue,
            ComparisonOperator.LessThanOrEqual => actualValue <= expectedValue,
            ComparisonOperator.Equal => Math.Abs(actualValue - expectedValue) < 0.001,
            ComparisonOperator.NotEqual => Math.Abs(actualValue - expectedValue) >= 0.001,
            _ => false
        };
    }

    private void RecordEvaluationTime(string ruleName)
    {
        lock (_lock)
        {
            if (!_ruleEvaluationHistory.ContainsKey(ruleName))
            {
                _ruleEvaluationHistory[ruleName] = new List<DateTime>();
            }
            
            _ruleEvaluationHistory[ruleName].Add(DateTime.UtcNow);
            
            // Keep only last 1000 evaluations to prevent memory leak
            if (_ruleEvaluationHistory[ruleName].Count > 1000)
            {
                _ruleEvaluationHistory[ruleName] = _ruleEvaluationHistory[ruleName]
                    .Skip(_ruleEvaluationHistory[ruleName].Count - 1000)
                    .ToList();
            }
        }
    }

    private bool HasEnoughDataPoints(string ruleName, TimeSpan evaluationWindow)
    {
        lock (_lock)
        {
            if (!_ruleEvaluationHistory.ContainsKey(ruleName))
            {
                return false;
            }
            
            var cutoff = DateTime.UtcNow - evaluationWindow;
            var evaluationsInWindow = _ruleEvaluationHistory[ruleName].Count(t => t >= cutoff);
            
            // We need at least 2 evaluations in the window to make a determination
            return evaluationsInWindow >= 2;
        }
    }

    private async Task TriggerAlertAsync(ThresholdRule rule, PerformanceMetrics metrics)
    {
        try
        {
            // Create alert - use rule name as identifier since rules come from configuration
            var alert = new ThresholdAlert
            {
                RuleName = rule.Name,
                Severity = rule.Severity,
                Status = AlertStatus.Active,
                TriggeredAt = DateTime.UtcNow
            };
            
            // Store current metric values
            var triggeredValues = new Dictionary<string, object>
            {
                ["CpuUsage"] = metrics.CpuUsage,
                ["MemoryUsage"] = metrics.MemoryUsage.WorkingSetMB,
                ["ActiveRequests"] = metrics.RequestMetrics.ActiveRequests,
                ["AverageResponseTime"] = metrics.RequestMetrics.AverageResponseTimeMs,
                ["RequestsPerSecond"] = metrics.RequestMetrics.RequestsPerSecond,
                ["Timestamp"] = metrics.Timestamp
            };
            
            alert.SetTriggeredValues(triggeredValues);
            
            // TODO: Save alert to database
            
            // Update rule tracking (in memory only since rules are from configuration)
            rule.LastTriggeredAt = DateTime.UtcNow;
            rule.TriggerCount++;
            
            // Send notifications
            await SendNotificationsAsync(alert, rule, metrics);
            
            _logger.LogWarning("Threshold alert triggered: {RuleName}", rule.Name);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error triggering alert for rule: {RuleName}", rule.Name);
        }
    }

    private async Task SendNotificationsAsync(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics metrics)
    {
        try
        {
            // Send email notifications
            if (rule.EmailRecipients.Any())
            {
                await _emailService.SendAlertEmailAsync(alert, rule, metrics);
            }
            
            // Send webhook notifications
            if (rule.WebhookEndpoints.Any(e => e.IsEnabled))
            {
                await _webhookService.SendAlertWebhooksAsync(alert, rule, metrics);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending notifications for alert {AlertId}", alert.Id);
        }
    }

    private async Task RefreshRulesCacheIfNeededAsync()
    {
        if (DateTime.UtcNow - _lastCacheRefresh > _cacheRefreshInterval)
        {
            await RefreshRulesCacheAsync();
        }
    }

    private async Task RefreshRulesCacheAsync()
    {
        try
        {
            // Load rules from configuration
            var settings = _thresholdRulesSettings.Value;
            _rulesCache.Clear();
            
            if (settings.Rules != null)
            {
                foreach (var rule in settings.Rules)
                {
                    if (rule.IsValid())
                    {
                        _rulesCache.Add(rule);
                    }
                    else
                    {
                        _logger.LogWarning("Invalid threshold rule configuration: {RuleName}", rule.Name);
                    }
                }
            }
            
            _lastCacheRefresh = DateTime.UtcNow;
            _logger.LogInformation("Loaded {RuleCount} threshold rules from configuration", _rulesCache.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing rules cache");
        }
    }

    // Implementation of other interface methods
    public Task<IEnumerable<ThresholdAlert>> GetActiveAlertsAsync()
    {
        // TODO: Implement database query
        return Task.FromResult(Enumerable.Empty<ThresholdAlert>());
    }

    public Task<IEnumerable<ThresholdRule>> GetThresholdRulesAsync()
    {
        return Task.FromResult(_rulesCache.AsEnumerable());
    }

    public Task<ThresholdRule?> GetThresholdRuleAsync(int id)
    {
        // Rules are now identified by name, not ID
        // For backward compatibility, we can try to find by index or return null
        if (id >= 0 && id < _rulesCache.Count)
        {
            return Task.FromResult(_rulesCache[id]);
        }
        return Task.FromResult<ThresholdRule?>(null);
    }

    public Task<ThresholdRule> CreateThresholdRuleAsync(ThresholdRule rule)
    {
        // Rules are read-only from configuration
        throw new NotSupportedException("Threshold rules are configured via appsettings.json and cannot be created at runtime.");
    }

    public Task<ThresholdRule> UpdateThresholdRuleAsync(int id, ThresholdRule rule)
    {
        // Rules are read-only from configuration
        throw new NotSupportedException("Threshold rules are configured via appsettings.json and cannot be updated at runtime.");
    }

    public Task<bool> DeleteThresholdRuleAsync(int id)
    {
        // Rules are read-only from configuration
        throw new NotSupportedException("Threshold rules are configured via appsettings.json and cannot be deleted at runtime.");
    }

    public Task<bool> AcknowledgeAlertAsync(int alertId, string acknowledgedBy)
    {
        // TODO: Implement database update
        return Task.FromResult(true);
    }

    public Task<bool> ResolveAlertAsync(int alertId, string resolvedBy, string? notes = null)
    {
        // TODO: Implement database update
        return Task.FromResult(true);
    }

    public Task<ThresholdAlertStats> GetAlertStatsAsync()
    {
        // TODO: Implement database query
        var stats = new ThresholdAlertStats
        {
            TotalAlerts = 0,
            ActiveAlerts = 0,
            AcknowledgedAlerts = 0,
            ResolvedAlerts = 0,
            Last24Hours = 0,
            Last7Days = 0,
            LastAlertTime = null,
            BySeverity = new Dictionary<string, int>
            {
                ["low"] = 0,
                ["medium"] = 0,
                ["high"] = 0,
                ["critical"] = 0
            },
            AlertsByRule = new Dictionary<string, int>()
        };
        
        return Task.FromResult(stats);
    }

    public async Task<ThresholdTestResult> TestThresholdRuleAsync(ThresholdRule rule)
    {
        // TODO: Get current metrics and test the rule
        var result = new ThresholdTestResult
        {
            ConditionMet = false,
            EvaluationDetails = "Test not implemented yet",
            EvaluationWindow = rule.EvaluationWindow,
            WouldTriggerAlert = false
        };
        
        return await Task.FromResult(result);
    }
}