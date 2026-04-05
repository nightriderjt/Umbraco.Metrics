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
    /// Acknowledges an alert
    /// </summary>
    Task<bool> AcknowledgeAlertAsync(int alertId, string acknowledgedBy);  
    
    /// <summary>
    /// Gets alert statistics
    /// </summary>
    Task<ThresholdAlertStats> GetAlertStatsAsync();
}



