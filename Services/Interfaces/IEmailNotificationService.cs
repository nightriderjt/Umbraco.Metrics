using UmbMetrics.Models;

namespace UmbMetrics.Services.Interfaces;

public interface IEmailNotificationService
{
    /// <summary>
    /// Sends an alert notification email
    /// </summary>
    Task<bool> SendAlertEmailAsync(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics metrics);

}



