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
                .WithColumn("AcknowledgedAt").AsDateTime().Nullable()
                .WithColumn("Status").AsInt32().NotNullable().WithDefaultValue(0)
                .WithColumn("Severity").AsInt32().NotNullable().WithDefaultValue(1)
                .WithColumn("TriggeredValuesJson").AsString().Nullable()
                .WithColumn("EmailSent").AsBoolean().NotNullable().WithDefaultValue(0)
                .WithColumn("EmailSentAt").AsDateTime().Nullable()
                .WithColumn("WebhookDeliveriesJson").AsString().Nullable()                
                .Do();

          
        }
        Logger.LogInformation("Threshold monitoring tables created successfully.");
    }
}