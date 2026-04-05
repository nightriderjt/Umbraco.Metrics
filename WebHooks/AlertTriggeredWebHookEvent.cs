using Microsoft.Extensions.Options;
using UmbMetrics.Notifications;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Sync;
using Umbraco.Cms.Core.Webhooks;

namespace UmbMetrics.WebHooks
{
    [WebhookEvent("UmbMetrics Alert Triggered", "ThresholdAlert")]
    public class AlertTriggeredWebHookEvent : WebhookEventBase<ThresholdAlertTriggeredNotification>
    {
        public AlertTriggeredWebHookEvent(IWebhookFiringService webhookFiringService, IWebhookService webhookService, IOptionsMonitor<WebhookSettings> webhookSettings, IServerRoleAccessor serverRoleAccessor) : base(webhookFiringService, webhookService, webhookSettings, serverRoleAccessor)
        {
        }

        public override string Alias => "UmbMetricsAlertTriggered";

        public override object? ConvertNotificationToRequestPayload(ThresholdAlertTriggeredNotification notification)
        {
            return new
            {
                notification._rule.Name,
                notification._metrics
            };
        }
    }
}
