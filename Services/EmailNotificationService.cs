using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;
using Umbraco.Cms.Core.Mail;
using Umbraco.Cms.Core.Models.Email;

namespace UmbMetrics.Services;

public class EmailNotificationService : IEmailNotificationService
{
    private readonly ILogger<EmailNotificationService> _logger;
    private readonly IEmailSender _emailSender;
    public readonly IOptions<EmailNotificationSettings> _emailSettings;
    private readonly IWebHostEnvironment _env;

    public EmailNotificationService(
        ILogger<EmailNotificationService> logger,
        IEmailSender emailSender,
        IOptions<EmailNotificationSettings> emailSettings,
        IWebHostEnvironment env)
    {
        _logger = logger;
        _emailSender = emailSender;
        _emailSettings = emailSettings;
        _env = env;
    }

    public async Task<bool> SendAlertEmailAsync(ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics metrics)
    {
        try
        {
            var settings = _emailSettings.Value;
            
            if (!settings.IsEnabled || !settings.IsValid())
            {
                _logger.LogWarning("Email notifications are disabled or configuration is invalid");
                return false;
            }

            var recipients = rule.EmailRecipients.Any() ? rule.EmailRecipients : settings.DefaultRecipients;
            if (!recipients.Any())
            {
                _logger.LogWarning("No email recipients configured for alert {AlertId}", alert.Id);
                return false;
            }

            var subject = FormatTemplate(settings.AlertTriggeredSubjectTemplate, alert, rule, metrics);
            var body = await GetEmailBodyAsync(settings.AlertTriggeredBodyTemplatePath, alert, rule, metrics);

            var success = await SendEmailAsync(recipients, subject, body, true);
            
            if (success)
            {
                alert.EmailSent = true;
                alert.EmailSentAt = DateTime.UtcNow;
                // TODO: Update alert in database
            }

            return success;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending alert email for alert {AlertId}", alert.Id);
            return false;
        }
    }

  

 

  

    private async Task<bool> SendEmailAsync(List<string> recipients, string subject, string body, bool isHtml)
    {
        try
        {
            var settings = _emailSettings.Value;
            
            foreach (var recipient in recipients)
            {
                if (!string.IsNullOrWhiteSpace(recipient))
                {
                    // Create email message - use empty string for From if not configured (Umbraco will use default)
                    var fromAddress = string.IsNullOrWhiteSpace(settings.FromAddress) ? string.Empty : settings.FromAddress;
                    var message = new EmailMessage(fromAddress, recipient, subject, body, isHtml);
                

                    await _emailSender.SendAsync(message, "Umbraco Metrics", expires:null);
                }
            }
            
            _logger.LogInformation("Email sent successfully to {RecipientCount} recipients", recipients.Count);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email");
            return false;
        }
    }

    private async Task<string> GetEmailBodyAsync(string templatePath, ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics? metrics)
    {
        // If template path is provided, try to load from file
        if (!string.IsNullOrWhiteSpace(templatePath) && File.Exists(templatePath))
        {
            try
            {
                var templateContent = await File.ReadAllTextAsync(Path.Combine(_env.ContentRootPath, "Views/UmbMetrics/EmailTemplates", templatePath));
                return FormatTemplate(templateContent, alert, rule, metrics);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to load email template from {TemplatePath}, using default", templatePath);
            }
        }

        // Use default template
        var defaultTemplate = await File.ReadAllTextAsync(Path.Combine(_env.ContentRootPath, "Views/UmbMetrics/Emailtemplates/alert-triggered.html"));
            
        
        return FormatTemplate(defaultTemplate, alert, rule, metrics);
    }

    private string FormatTemplate(string template, ThresholdAlert alert, ThresholdRule rule, PerformanceMetrics? metrics)
    {
        var triggeredValues = alert.GetTriggeredValues();
        
        var replacements = new Dictionary<string, string>
        {
            ["{RuleName}"] = rule.Name,
            ["{RuleDescription}"] = rule.Description,
            ["{Severity}"] = rule.Severity.ToString(),
            ["{TriggeredAt}"] = alert.TriggeredAt.ToString("yyyy-MM-dd HH:mm:ss UTC"),          
            ["{Duration}"] = alert.Duration.ToString(@"hh\:mm\:ss"), 
            ["{ServerName}"] = Environment.MachineName,
            ["{Condition}"] = rule.RootCondition.ToString(),
            ["{DashboardUrl}"] = "/umbraco/section/settings/dashboard/umb-metrics",
            ["{AcknowledgeUrl}"] = $"/umbraco#/metrics/alerts/{alert.Id}/acknowledge"         
        };

        if (metrics != null)
        {
            replacements["{CpuUsage}"] = metrics.CpuUsage.ToString("F1");
            replacements["{MemoryUsage}"] = metrics.MemoryUsage.WorkingSetMB.ToString("F1");
            replacements["{ActiveRequests}"] = metrics.RequestMetrics.ActiveRequests.ToString();
            replacements["{AverageResponseTime}"] = metrics.RequestMetrics.AverageResponseTimeMs.ToString("F1");
            
            // Generate metric rows for the table
            var metricRows = new StringBuilder();
            metricRows.AppendLine("<tr><td>CPU Usage</td><td>" + metrics.CpuUsage.ToString("F1") + "%</td><td>" + GetThresholdValue(rule, MetricType.CpuUsage) + "</td></tr>");
            metricRows.AppendLine("<tr><td>Memory Usage</td><td>" + metrics.MemoryUsage.WorkingSetMB.ToString("F1") + " MB</td><td>" + GetThresholdValue(rule, MetricType.MemoryUsage) + "</td></tr>");
            metricRows.AppendLine("<tr><td>Active Requests</td><td>" + metrics.RequestMetrics.ActiveRequests + "</td><td>" + GetThresholdValue(rule, MetricType.ActiveRequests) + "</td></tr>");
            metricRows.AppendLine("<tr><td>Avg Response Time</td><td>" + metrics.RequestMetrics.AverageResponseTimeMs.ToString("F1") + " ms</td><td>" + GetThresholdValue(rule, MetricType.AverageResponseTime) + "</td></tr>");
            
            replacements["{MetricRows}"] = metricRows.ToString();
        }
        else
        {
            replacements["{MetricRows}"] = string.Empty;
        }

        var result = template;
        foreach (var replacement in replacements)
        {
            result = result.Replace(replacement.Key, replacement.Value);
        }

        return result;
    }

    private string GetThresholdValue(ThresholdRule rule, MetricType metricType)
    {
        // TODO: Extract threshold value from rule condition for the specific metric
        return "N/A";
    }

}