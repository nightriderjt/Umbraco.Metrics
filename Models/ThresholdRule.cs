namespace UmbMetrics.Models;

public class ThresholdRule
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    // Root condition (supports nested conditions)
    public ThresholdCondition RootCondition { get; set; } = new();
    
    // Evaluation window (e.g., 2 minutes)
    public TimeSpan EvaluationWindow { get; set; } = TimeSpan.FromMinutes(2);
    
    // Alert settings
    public AlertSeverity Severity { get; set; } = AlertSeverity.Warning;
    public bool IsEnabled { get; set; } = true;
    
    // Notification settings
    public List<string> EmailRecipients { get; set; } = new();
    public List<WebhookEndpoint> WebhookEndpoints { get; set; } = new();
    
    // Cooldown period to prevent alert spam
    public TimeSpan CooldownPeriod { get; set; } = TimeSpan.FromMinutes(15);
    
    // Runtime tracking (not stored in configuration)
    [System.Text.Json.Serialization.JsonIgnore]
    public DateTime? LastTriggeredAt { get; set; }
    
    [System.Text.Json.Serialization.JsonIgnore]
    public int TriggerCount { get; set; }
    
    // Helper methods
    public bool IsInCooldown => 
        LastTriggeredAt.HasValue && 
        DateTime.UtcNow - LastTriggeredAt.Value < CooldownPeriod;
    
    public bool ShouldEvaluate => IsEnabled && !IsInCooldown;
    
    public override string ToString()
    {
        return $"{Name}: {RootCondition} for {EvaluationWindow.TotalMinutes} minute(s)";
    }
    
    // Validation
    public bool IsValid()
    {
        return !string.IsNullOrWhiteSpace(Name) && 
               RootCondition != null && 
               RootCondition.IsValid() &&
               EvaluationWindow > TimeSpan.Zero;
    }
}

public class WebhookEndpoint
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public Dictionary<string, string> Headers { get; set; } = new();
    public string PayloadTemplate { get; set; } = string.Empty;
    public bool IsEnabled { get; set; } = true;
    
    // Retry settings
    public int MaxRetries { get; set; } = 3;
    public TimeSpan RetryDelay { get; set; } = TimeSpan.FromSeconds(30);
    
    public bool IsValid()
    {
        return !string.IsNullOrWhiteSpace(Name) && 
               !string.IsNullOrWhiteSpace(Url) &&
               Uri.TryCreate(Url, UriKind.Absolute, out _);
    }
}