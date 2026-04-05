namespace UmbMetrics.Models;

public class AcknowledgeAlertRequest
{
    public string AcknowledgedBy { get; set; } = string.Empty;
}

public class ResolveAlertRequest
{
    public string ResolvedBy { get; set; } = string.Empty;
    public string? Notes { get; set; }
}

public class TestEmailRequest
{
    public string Recipient { get; set; } = string.Empty;
}

public class TestWebhookRequest
{
    public WebhookEndpoint Endpoint { get; set; } = new();
}

public class UpdateWebhookEndpointRequest
{
    public int Id { get; set; }
    public WebhookEndpoint Endpoint { get; set; } = new();
}

public class DeleteWebhookEndpointRequest
{
    public int Id { get; set; }
}