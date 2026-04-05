namespace UmbMetrics.Models;

public class EmailNotificationSettings
{
    // Sender Information (optional - can use Umbraco's default sender)
    public string FromAddress { get; set; } = string.Empty;
    public string FromName { get; set; } = "Umbraco Metrics";

    // Default recipients (can be overridden per rule)
    public List<string> DefaultRecipients { get; set; } = new();

    // Email templates - these can be file paths or inline HTML
    public string AlertTriggeredSubjectTemplate { get; set; } = "[ALERT] {RuleName} - {ServerName}";
    public string AlertTriggeredBodyTemplatePath { get; set; } = string.Empty;

    public string AlertResolvedSubjectTemplate { get; set; } = "[RESOLVED] {RuleName} - {ServerName}";
    public string AlertResolvedBodyTemplatePath { get; set; } = string.Empty;

    // Delivery settings
    public int MaxRetryAttempts { get; set; } = 3;
    public int RetryDelaySeconds { get; set; } = 30;
    public bool IsEnabled { get; set; } = true;

    // Validation
    public bool IsValid()
    {
        // Only validate FromAddress if provided, otherwise use Umbraco's default
        return string.IsNullOrWhiteSpace(FromAddress) ||
               Uri.TryCreate($"mailto:{FromAddress}", UriKind.Absolute, out _);
    }



}