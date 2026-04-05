using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UmbMetrics.Models;
using UmbMetrics.Notifications;
using UmbMetrics.Services.Interfaces;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Infrastructure.Persistence;

namespace UmbMetrics.Services;

public class ThresholdEvaluationService : IThresholdEvaluationService
{
    private readonly ILogger<ThresholdEvaluationService> _logger;
    private readonly IOptions<ThresholdRulesSettings> _thresholdRulesSettings;
    private readonly IUmbracoDatabaseFactory _databaseFactory;

    private readonly IEventAggregator _eventAggregator;
    private readonly List<ThresholdRule> _rulesCache = new();
    private readonly Dictionary<string, List<DateTime>> _ruleEvaluationHistory = new();
    private readonly object _lock = new();
    private DateTime _lastCacheRefresh = DateTime.MinValue;
    private readonly TimeSpan _cacheRefreshInterval = TimeSpan.FromMinutes(5);

    public ThresholdEvaluationService(
        ILogger<ThresholdEvaluationService> logger,

        IOptions<ThresholdRulesSettings> thresholdRulesSettings,
        IUmbracoDatabaseFactory databaseFactory,
          IEventAggregator eventAggregator)
    {
        _logger = logger;
        _thresholdRulesSettings = thresholdRulesSettings;
        _databaseFactory = databaseFactory;
        _eventAggregator = eventAggregator;

        // Load rules eagerly on startup
        Task.Run(async () => await RefreshRulesCacheAsync());
    }

    public async Task EvaluateThresholdsAsync(PerformanceMetrics metrics)
    {
        try
        {
            await RefreshRulesCacheIfNeededAsync();

            var enabledRules = _rulesCache.Where(r => r.IsEnabled).ToList();

            foreach (var rule in enabledRules.Where(x => !x.IsInCooldown))
            {
                try
                {

                    var conditionMet = await EvaluateRuleAsync(rule, metrics);

                    if (conditionMet && rule.ShouldEvaluate)
                    {
                        _eventAggregator.Publish(new ThresholdAlertTriggeredNotification(rule, metrics));

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

            return evaluationsInWindow >= 2;
            // We need at least 2 evaluations in the window to make a determination
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
        try
        {
            using var db = _databaseFactory.CreateDatabase();

            var alerts = db.Fetch<ThresholdAlert>(Constants.SqlQueries.Thresholds.GetActiveAlerts, (int)AlertStatus.Active);
            return Task.FromResult(alerts.AsEnumerable());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting active alerts from database");
            return Task.FromResult(Enumerable.Empty<ThresholdAlert>());
        }
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
            return Task.FromResult<ThresholdRule?>(_rulesCache[id]);
        }
        return Task.FromResult<ThresholdRule?>(null);
    }







    public Task<bool> AcknowledgeAlertAsync(int alertId, string acknowledgedBy)
    {
        try
        {
            using var db = _databaseFactory.CreateDatabase();
            var rowsAffected = db.Execute(Constants.SqlQueries.Thresholds.AcknowledgeAlert,
                (int)AlertStatus.Acknowledged,
                DateTime.UtcNow,               
                alertId,
                (int)AlertStatus.Active);

            return Task.FromResult(rowsAffected > 0);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error acknowledging alert {AlertId}", alertId);
            return Task.FromResult(false);
        }
    }



    public Task<ThresholdAlertStats> GetAlertStatsAsync()
    {
        try
        {
            using var db = _databaseFactory.CreateDatabase();
            var stats = new ThresholdAlertStats
            {
                TotalAlerts = db.ExecuteScalar<int>(Constants.SqlQueries.Thresholds.TotalAlertsCount),
                ActiveAlerts = db.ExecuteScalar<int>(Constants.SqlQueries.Thresholds.AlertsCountByStatus, new { status = (int)AlertStatus.Active }),
                AcknowledgedAlerts = db.ExecuteScalar<int>(Constants.SqlQueries.Thresholds.AlertsCountByStatus, new { status = (int)AlertStatus.Acknowledged }),
                Last24Hours = db.ExecuteScalar<int>(Constants.SqlQueries.Thresholds.Last24HoursAlertsCount),
                Last7Days = db.ExecuteScalar<int>(Constants.SqlQueries.Thresholds.Last7DaysAlertsCount),
                LastAlertTime = db.ExecuteScalar<DateTime?>(Constants.SqlQueries.Thresholds.LastAlertTime),
                BySeverity = [],
                AlertsByRule = []
            };

            // Get severity counts
            var severityResults = db.Fetch<SeverityResult>(Constants.SqlQueries.Thresholds.AlertsBySeverity);
            foreach (var result in severityResults)
            {
                stats.BySeverity[result.Severity.ToString()] = (int)result.Count;
            }

            // Get rule counts
            var ruleResults = db.Fetch<dynamic>(Constants.SqlQueries.Thresholds.AlertsByRule);
            foreach (var result in ruleResults)
            {
                var ruleName = (string)result.RuleName;
                stats.AlertsByRule[ruleName] = (int)result.Count;
            }

            return Task.FromResult(stats);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting alert statistics from database");

            // Return empty stats on error
            var stats = new ThresholdAlertStats
            {
                TotalAlerts = 0,
                ActiveAlerts = 0,
                AcknowledgedAlerts = 0,
                Last24Hours = 0,
                Last7Days = 0,
                LastAlertTime = null,
                BySeverity = new Dictionary<string, int>
                {
                    ["0"] = 0,
                    ["1"] = 0,
                    ["2"] = 0,
                    ["3"] = 0
                },
                AlertsByRule = []
            };

            return Task.FromResult(stats);
        }
    }
}