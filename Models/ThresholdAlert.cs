namespace UmbMetrics.Models;

public class ThresholdAlert
{
    public int Id { get; set; }
    public int RuleId { get; set; }
    public string RuleName { get; set; } = string.Empty;

    // Alert timing
    public DateTime TriggeredAt { get; set; } = DateTime.UtcNow;
    public DateTime? ResolvedAt { get; set; }
    public DateTime? AcknowledgedAt { get; set; }

    // Alert status
    public AlertStatus Status { get; set; } = AlertStatus.Active;
    public AlertSeverity Severity { get; set; } = AlertSeverity.Warning;

    // Metric values at trigger time
    public string TriggeredValuesJson { get; set; } = string.Empty;

    // Notification tracking
    public bool EmailSent { get; set; }
    public DateTime? EmailSentAt { get; set; }
    public List<WebhookDelivery> WebhookDeliveries { get; set; } = new();

    // Resolution info
    public string? ResolvedBy { get; set; }
    public string? ResolutionNotes { get; set; }

    // Helper methods
    public bool IsActive => Status == AlertStatus.Active;
    public bool IsResolved => Status == AlertStatus.Resolved;
    public bool IsAcknowledged => Status == AlertStatus.Acknowledged;

    public TimeSpan Duration =>
        IsActive ? DateTime.UtcNow - TriggeredAt :
        ResolvedAt.HasValue ? ResolvedAt.Value - TriggeredAt : TimeSpan.Zero;

    public Dictionary<string, object> GetTriggeredValues()
    {
        if (string.IsNullOrEmpty(TriggeredValuesJson))
            return new Dictionary<string, object>();

        try
        {
            return System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, object>>(TriggeredValuesJson)
                ?? new Dictionary<string, object>();
        }
        catch
        {
            return new Dictionary<string, object>();
        }
    }

    public void SetTriggeredValues(Dictionary<string, object> values)
    {
        TriggeredValuesJson = System.Text.Json.JsonSerializer.Serialize(values);
    }

    public void Acknowledge(string acknowledgedBy)
    {
        if (IsActive)
        {
            Status = AlertStatus.Acknowledged;
            AcknowledgedAt = DateTime.UtcNow;
            ResolvedBy = acknowledgedBy;
        }
    }

    public void Resolve(string resolvedBy, string? notes = null)
    {
        if (IsActive || IsAcknowledged)
        {
            Status = AlertStatus.Resolved;
            ResolvedAt = DateTime.UtcNow;
            ResolvedBy = resolvedBy;
            ResolutionNotes = notes;
        }
    }
}

public class WebhookDelivery
{
    public int Id { get; set; }
    public int WebhookEndpointId { get; set; }
    public string WebhookName { get; set; } = string.Empty;
    public string WebhookUrl { get; set; } = string.Empty;

    public DateTime SentAt { get; set; } = DateTime.UtcNow;
    public bool Success { get; set; }
    public int StatusCode { get; set; }
    public string? ResponseBody { get; set; }
    public string? ErrorMessage { get; set; }

    // Retry tracking
    public int RetryCount { get; set; }
    public DateTime? NextRetryAt { get; set; }

    public bool ShouldRetry =>
        !Success &&
        RetryCount < 3 &&
        (!NextRetryAt.HasValue || DateTime.UtcNow >= NextRetryAt.Value);
}