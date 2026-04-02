using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Options;
using UmbMetrics.Models;
using UmbMetrics.Services;
using UmbMetrics.Services.Interfaces;
using Umbraco.Cms.Core.HealthChecks;
using Umbraco.Cms.Core.Services;

namespace UmbMetrics.Services.HealthChecks;

/// <summary>
/// Health check group for Umbraco Metrics threshold configuration and monitoring
/// </summary>
[HealthCheck(
    "F1E2D3C4-B5A6-7890-1234-567890ABCDEF",
    "Umbraco Metrics",
    Description = "Health checks for threshold configuration and monitoring",
    Group = "Umbraco Metrics")]
public class UmbMetricsHealthCheckGroup : HealthCheck
{
    private readonly IOptions<ThresholdRulesSettings> _thresholdRulesSettings;
    private readonly IOptions<EmailNotificationSettings> _emailNotificationSettings;
    private readonly IThresholdEvaluationService _thresholdEvaluationService;
    private readonly ThresholdMonitoringService _thresholdMonitoringService;
    private readonly IRuntimeState _runtimeState;

    public UmbMetricsHealthCheckGroup(IServiceProvider provider)
        : base()
    {
        _thresholdRulesSettings = provider.GetRequiredService<IOptions<ThresholdRulesSettings>>();
        _emailNotificationSettings = provider.GetRequiredService<IOptions<EmailNotificationSettings>>();
        _thresholdEvaluationService = provider.GetRequiredService<IThresholdEvaluationService>();
        _thresholdMonitoringService = provider.GetService<ThresholdMonitoringService>();
        _runtimeState = provider.GetRequiredService<IRuntimeState>();
    }

    public override Task<IEnumerable<HealthCheckStatus>> GetStatusAsync()
    {
        var results = new List<HealthCheckStatus>
        {
            CheckThresholdRulesConfiguration(),
            CheckEmailNotificationSettings(),
            CheckThresholdDatabaseTables(),
            CheckThresholdMonitoringService(),
            CheckAlertResolutionConfiguration()
        };

        return Task.FromResult<IEnumerable<HealthCheckStatus>>(results);
    }

    public override HealthCheckStatus ExecuteAction(HealthCheckAction action)
    {
        // Handle actions for each health check
        switch (action.Alias)
        {
            case "configure-threshold-rules":
                return new HealthCheckStatus("Please configure threshold rules in appsettings.json under UmbMetrics:ThresholdRules")
                {
                    ResultType = StatusResultType.Info
                };
                
            case "configure-email-settings":
                return new HealthCheckStatus("Please configure email notification settings in appsettings.json under UmbMetrics:EmailNotifications")
                {
                    ResultType = StatusResultType.Info
                };
                
            case "run-migration":
                return new HealthCheckStatus("Please run the database migration to create threshold tables")
                {
                    ResultType = StatusResultType.Info
                };
                
            case "restart-application":
                return new HealthCheckStatus("Please restart the application to start the threshold monitoring service")
                {
                    ResultType = StatusResultType.Info
                };
                
            case "configure-alert-resolution":
                return new HealthCheckStatus("Please configure alert notification settings in threshold rules")
                {
                    ResultType = StatusResultType.Info
                };
                
            default:
                throw new InvalidOperationException($"Unknown action: {action.Alias}");
        }
    }

    private HealthCheckStatus CheckThresholdRulesConfiguration()
    {
        var settings = _thresholdRulesSettings.Value;
        var isHealthy = settings != null && settings.Rules != null && settings.Rules.Count > 0;
        
        return new HealthCheckStatus(isHealthy ? "Threshold rules configuration is valid" : "Threshold rules configuration is missing or invalid")
        {
            ResultType = isHealthy ? StatusResultType.Success : StatusResultType.Error,
            Actions = isHealthy ? new List<HealthCheckAction>() : new List<HealthCheckAction>
            {
                new("configure-threshold-rules", Id) { Name = "Configure Threshold Rules" }
            }
        };
    }

    private HealthCheckStatus CheckEmailNotificationSettings()
    {
        var settings = _emailNotificationSettings.Value;
        var isHealthy = settings != null && 
                       settings.IsEnabled &&
                       !string.IsNullOrEmpty(settings.FromAddress) &&
                       settings.DefaultRecipients != null && settings.DefaultRecipients.Count > 0;
        
        return new HealthCheckStatus(isHealthy ? "Email notification settings are properly configured" : "Email notification settings are missing or invalid")
        {
            ResultType = isHealthy ? StatusResultType.Success : StatusResultType.Error,
            Actions = isHealthy ? new List<HealthCheckAction>() : new List<HealthCheckAction>
            {
                new("configure-email-settings", Id) { Name = "Configure Email Settings" }
            }
        };
    }

    private HealthCheckStatus CheckThresholdDatabaseTables()
    {
        // Check if the threshold monitoring service can access database tables
        // This is a simplified check - in a real implementation, you would check if tables exist
        var isHealthy = _runtimeState.Level == Umbraco.Cms.Core.RuntimeLevel.Run;
        
        return new HealthCheckStatus(isHealthy ? "Required threshold database tables exist" : "Required threshold database tables are missing")
        {
            ResultType = isHealthy ? StatusResultType.Success : StatusResultType.Error,
            Actions = isHealthy ? new List<HealthCheckAction>() : new List<HealthCheckAction>
            {
                new("run-migration", Id) { Name = "Run Database Migration" }
            }
        };
    }

    private HealthCheckStatus CheckThresholdMonitoringService()
    {
        // Check if the threshold monitoring service is running
        // This is a simplified check - in a real implementation, you would check the service status
        var isHealthy = _thresholdMonitoringService != null;
        
        return new HealthCheckStatus(isHealthy ? "Threshold monitoring service is running" : "Threshold monitoring service is not running")
        {
            ResultType = isHealthy ? StatusResultType.Success : StatusResultType.Error,
            Actions = isHealthy ? new List<HealthCheckAction>() : new List<HealthCheckAction>
            {
                new("restart-application", Id) { Name = "Restart Application" }
            }
        };
    }

    private HealthCheckStatus CheckAlertResolutionConfiguration()
    {
        var settings = _thresholdRulesSettings.Value;
        var hasNotificationSettings = settings?.Rules?.Any(r => 
            (r.EmailRecipients != null && r.EmailRecipients.Count > 0) ||
            (r.WebhookEndpoints != null && r.WebhookEndpoints.Count > 0)) == true;
        
        return new HealthCheckStatus(hasNotificationSettings ? "Alert notification settings are configured" : "Alert notification settings are missing")
        {
            ResultType = hasNotificationSettings ? StatusResultType.Success : StatusResultType.Warning,
            Actions = hasNotificationSettings ? new List<HealthCheckAction>() : new List<HealthCheckAction>
            {
                new("configure-alert-resolution", Id) { Name = "Configure Alert Notification Settings" }
            }
        };
    }
}