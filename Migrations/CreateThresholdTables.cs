using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Migrations;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Cms.Infrastructure.Migrations.Upgrade;

namespace UmbMetrics.Migrations;

public class UmbMetricsMigratorComposer : ComponentComposer<UmbMetricsMigratorComponent>
{
}

public class UmbMetricsMigratorComponent : IAsyncComponent
{
    private readonly ICoreScopeProvider _coreScopeProvider;
    private readonly IMigrationPlanExecutor _migrationPlanExecutor;
    private readonly IKeyValueService _keyValueService;
    private readonly IRuntimeState _runtimeState;

    public UmbMetricsMigratorComponent(
        ICoreScopeProvider coreScopeProvider,
        IMigrationPlanExecutor migrationPlanExecutor,
        IKeyValueService keyValueService,
        IRuntimeState runtimeState)
    {
        _coreScopeProvider = coreScopeProvider;
        _migrationPlanExecutor = migrationPlanExecutor;
        _keyValueService = keyValueService;
        _runtimeState = runtimeState;
    }

    public Task InitializeAsync(bool isRestarting, CancellationToken cancellationToken)
    {
        if (_runtimeState.Level < RuntimeLevel.Run)
        {
            return Task.CompletedTask;
        }

        // Create a migration plan for a specific project/feature
        var migrationPlan = new MigrationPlan("UmbMetrics");
        migrationPlan.From(string.Empty)
            .To<CreateThresholdTables>("ThresholdTables");

        // Go and upgrade our site
        var upgrader = new Upgrader(migrationPlan);
        return upgrader.ExecuteAsync(_migrationPlanExecutor, _coreScopeProvider, _keyValueService);
    }

    public Task TerminateAsync(bool isRestarting, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}

public class CreateThresholdTables : AsyncMigrationBase
{
    public CreateThresholdTables(IMigrationContext context) : base(context)
    { }

    protected override async Task MigrateAsync()
    {
        Logger.LogInformation("Creating threshold monitoring tables...");

        // Note: Threshold rules are now configured via appsettings.json, not database tables
        // Removed UmbMetrics_ThresholdRules table creation

        // Table for threshold alerts
        if (!TableExists("UmbMetrics_ThresholdAlerts"))
        {
            Create.Table("UmbMetrics_ThresholdAlerts")
                .WithColumn("Id").AsInt32().Identity()
                .WithColumn("RuleId").AsInt32().NotNullable()
                .WithColumn("RuleName").AsString(200).NotNullable()
                .WithColumn("TriggeredAt").AsDateTime().NotNullable().WithDefaultValue(DateTime.UtcNow)
                .WithColumn("ResolvedAt").AsDateTime().Nullable()
                .WithColumn("AcknowledgedAt").AsDateTime().Nullable()
                .WithColumn("Status").AsInt32().NotNullable().WithDefaultValue(0)
                .WithColumn("Severity").AsInt32().NotNullable().WithDefaultValue(1)
                .WithColumn("TriggeredValuesJson").AsString().Nullable()
                .WithColumn("EmailSent").AsBoolean().NotNullable().WithDefaultValue(0)
                .WithColumn("EmailSentAt").AsDateTime().Nullable()
                .WithColumn("WebhookDeliveriesJson").AsString().Nullable()
                .WithColumn("ResolvedBy").AsString(200).Nullable()
                .WithColumn("ResolutionNotes").AsString(1000).Nullable()
                .Do();

          
        }

        // Table for webhook endpoints
        if (!TableExists("UmbMetrics_WebhookEndpoints"))
        {
            Create.Table("UmbMetrics_WebhookEndpoints")
                .WithColumn("Id").AsInt32().Identity()
                .WithColumn("Name").AsString(200).NotNullable()
                .WithColumn("Url").AsString(500).NotNullable()
                .WithColumn("HeadersJson").AsString().Nullable()
                .WithColumn("PayloadTemplate").AsString().Nullable()
                .WithColumn("IsEnabled").AsBoolean().NotNullable().WithDefaultValue(1)
                .WithColumn("MaxRetries").AsInt32().NotNullable().WithDefaultValue(3)
                .WithColumn("RetryDelayTicks").AsInt64().NotNullable().WithDefaultValue(3000000000)
                .Do();
        }

        // Table for webhook deliveries
        if (!TableExists("UmbMetrics_WebhookDeliveries"))
        {
            Create.Table("UmbMetrics_WebhookDeliveries")
                .WithColumn("Id").AsInt32().Identity()
                .WithColumn("WebhookEndpointId").AsInt32().NotNullable()
                .WithColumn("WebhookName").AsString(200).NotNullable()
                .WithColumn("WebhookUrl").AsString(500).NotNullable()
                .WithColumn("SentAt").AsDateTime().NotNullable().WithDefaultValue(DateTime.UtcNow)
                .WithColumn("Success").AsBoolean().NotNullable().WithDefaultValue(0)
                .WithColumn("StatusCode").AsInt32().Nullable()
                .WithColumn("ResponseBody").AsString().Nullable()
                .WithColumn("ErrorMessage").AsString(1000).Nullable()
                .WithColumn("RetryCount").AsInt32().NotNullable().WithDefaultValue(0)
                .WithColumn("NextRetryAt").AsDateTime().Nullable()
                .Do();

        
        }

    

        Logger.LogInformation("Threshold monitoring tables created successfully.");
    }

    private static string GetDefaultAlertTriggeredTemplate()
    {
        return @"<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .alert-details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .metric-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .metric-table th, .metric-table td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        .metric-table th { background-color: #f2f2f2; }
        .severity-critical { color: #dc3545; font-weight: bold; }
        .severity-warning { color: #ffc107; font-weight: bold; }
        .severity-info { color: #17a2b8; font-weight: bold; }
        .actions { margin-top: 20px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🚨 Threshold Alert Triggered</h2>
        </div>
        
        <div class='alert-details'>
            <h3>Alert Details</h3>
            <p><strong>Rule:</strong> {RuleName}</p>
            <p><strong>Description:</strong> {RuleDescription}</p>
            <p><strong>Severity:</strong> <span class='severity-{Severity}'>{Severity}</span></p>
            <p><strong>Triggered At:</strong> {TriggeredAt}</p>
            <p><strong>Server:</strong> {ServerName}</p>
            <p><strong>Condition:</strong> {Condition}</p>
        </div>
        
        <h3>Current Metrics</h3>
        <table class='metric-table'>
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Threshold</th>
                </tr>
            </thead>
            <tbody>
                {MetricRows}
            </tbody>
        </table>
        
        <div class='actions'>
            <p>You can view detailed metrics and manage this alert in the Umbraco Metrics Dashboard.</p>
            <a href='{DashboardUrl}' class='button'>View Dashboard</a>
            <a href='{AcknowledgeUrl}' class='button' style='background-color: #6c757d; margin-left: 10px;'>Acknowledge Alert</a>
            <a href='{ResolveUrl}' class='button' style='background-color: #28a745; margin-left: 10px;'>Mark as Resolved</a>
        </div>
        
        <hr>
        <p style='font-size: 12px; color: #6c757d;'>
            This is an automated alert from Umbraco Metrics. 
            To manage your alert preferences, visit the Threshold Settings in the dashboard.
        </p>
    </div>
</body>
</html>";
    }

    private static string GetDefaultAlertResolvedTemplate()
    {
        return @"<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .alert-details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .duration { font-weight: bold; color: #28a745; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>✅ Alert Resolved</h2>
        </div>
        
        <div class='alert-details'>
            <h3>Alert Details</h3>
            <p><strong>Rule:</strong> {RuleName}</p>
            <p><strong>Description:</strong> {RuleDescription}</p>
            <p><strong>Severity:</strong> {Severity}</p>
            <p><strong>Triggered At:</strong> {TriggeredAt}</p>
            <p><strong>Resolved At:</strong> {ResolvedAt}</p>
            <p><strong>Duration:</strong> <span class='duration'>{Duration}</span></p>
            <p><strong>Resolved By:</strong> {ResolvedBy}</p>
            <p><strong>Resolution Notes:</strong> {ResolutionNotes}</p>
            <p><strong>Server:</strong> {ServerName}</p>
        </div>
        
        <p>The threshold condition has returned to normal levels.</p>
        
        <div class='actions'>
            <a href='{DashboardUrl}' class='button' style='display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;'>
                View Dashboard
            </a>
        </div>
        
        <hr>
        <p style='font-size: 12px; color: #6c757d;'>
            This is an automated notification from Umbraco Metrics.
        </p>
    </div>
</body>
</html>";
    }
}