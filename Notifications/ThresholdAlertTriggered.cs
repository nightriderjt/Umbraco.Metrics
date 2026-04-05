using Microsoft.Extensions.Logging;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Infrastructure.Persistence;

namespace UmbMetrics.Notifications
{
    public class ThresholdAlertTriggered : INotificationHandler<ThresholdAlertTriggeredNotification>
    {
        private readonly ILogger<ThresholdAlertTriggered> _logger;
        private readonly IUmbracoDatabaseFactory _databaseFactory;
        private readonly IEmailNotificationService _emailService;


        public ThresholdAlertTriggered(ILogger<ThresholdAlertTriggered> logger, IUmbracoDatabaseFactory databaseFactory, IEmailNotificationService emailService)
        {
           _logger = logger;
           _databaseFactory = databaseFactory;
            _emailService = emailService;        
        }
        public void Handle(ThresholdAlertTriggeredNotification notification)
        {
            TriggerAlertAsync(notification._rule, notification._metrics).Wait();
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

                // Save alert to database
                await SaveAlertToDatabaseAsync(alert);

                // Update rule tracking (in memory only since rules are from configuration)
                rule.LastTriggeredAt = DateTime.UtcNow;


                // Send notifications
                await SendNotificationsAsync(alert, rule, metrics);

                _logger.LogWarning("Threshold alert triggered: {RuleName}", rule.Name);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error triggering alert for rule: {RuleName}", rule.Name);
            }
        }
        private async Task SaveAlertToDatabaseAsync(ThresholdAlert alert)
        {
            try
            {
                using var db = _databaseFactory.CreateDatabase();

                // Since rules are from configuration, we use RuleName as identifier
                // RuleId is set to 0 for configuration-based rules
                var alertId = db.ExecuteScalar<int>(Constants.SqlQueries.Thresholds.InsertAlert, new
                {
                    ruleid = 0, // RuleId (0 for configuration-based rules)
                    alert.RuleName,
                    alert.TriggeredAt,
                    Status = (int)alert.Status,
                    Severity = (int)alert.Severity,
                    alert.TriggeredValuesJson,
                    alert.EmailSent
                });

                alert.Id = alertId;
                _logger.LogDebug("Alert saved to database with ID: {AlertId}", alertId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving alert to database for rule: {RuleName}", alert.RuleName);
                throw;
            }
        }
        private async Task SendNotificationsAsync(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics metrics)
        {
            try
            {
                // Send email notifications           
                await _emailService.SendAlertEmailAsync(alert, rule, metrics);
                //// Send webhook notifications
                //if (rule.WebhookEndpoints.Any(e => e.IsEnabled))
                //{
                //    await _webhookService.SendAlertWebhooksAsync(alert, rule, metrics);
                //}
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending notifications for alert {AlertId}", alert.Id);
            }
        }
    }
}
