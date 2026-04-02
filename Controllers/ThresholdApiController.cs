using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Web.Common.Authorization;

namespace UmbMetrics.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Metrics")]
[VersionedApiBackOfficeRoute("metrics/thresholds")]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
public class ThresholdApiController : ManagementApiControllerBase
{
    private readonly IThresholdEvaluationService _thresholdService;
    private readonly IEmailNotificationService _emailService;
    private readonly IWebhookNotificationService _webhookService;

    public ThresholdApiController(
        IThresholdEvaluationService thresholdService,
        IEmailNotificationService emailService,
        IWebhookNotificationService webhookService)
    {
        _thresholdService = thresholdService;
        _emailService = emailService;
        _webhookService = webhookService;
    }

    /// <summary>
    /// Gets all threshold rules
    /// </summary>
    [HttpGet("rules")]
    [ProducesResponseType(typeof(IEnumerable<ThresholdRule>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetThresholdRules()
    {
        try
        {
            var rules = await _thresholdService.GetThresholdRulesAsync();
            return Ok(rules);
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to retrieve threshold rules",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Gets a specific threshold rule by ID
    /// </summary>
    [HttpGet("rules/{id:int}")]
    [ProducesResponseType(typeof(ThresholdRule), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetThresholdRule(int id)
    {
        try
        {
            var rule = await _thresholdService.GetThresholdRuleAsync(id);
            if (rule == null)
            {
                return NotFound(new ProblemDetails
                {
                    Title = "Threshold rule not found",
                    Detail = $"Threshold rule with ID {id} was not found",
                    Status = StatusCodes.Status404NotFound
                });
            }

            return Ok(rule);
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to retrieve threshold rule",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

 

 


    /// <summary>
    /// Gets all active alerts
    /// </summary>
    [HttpGet("alerts/active")]
    [ProducesResponseType(typeof(IEnumerable<ThresholdAlert>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetActiveAlerts()
    {
        try
        {
            var alerts = await _thresholdService.GetActiveAlertsAsync();
            return Ok(alerts);
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to retrieve active alerts",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Acknowledges an alert
    /// </summary>
    [HttpPost("alerts/{id:int}/acknowledge")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> AcknowledgeAlert(int id, [FromBody] AcknowledgeAlertRequest request)
    {
        try
        {
            if (request == null || string.IsNullOrWhiteSpace(request.AcknowledgedBy))
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Invalid request",
                    Detail = "AcknowledgedBy is required",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            var success = await _thresholdService.AcknowledgeAlertAsync(id, request.AcknowledgedBy);
            if (!success)
            {
                return NotFound(new ProblemDetails
                {
                    Title = "Alert not found",
                    Detail = $"Alert with ID {id} was not found",
                    Status = StatusCodes.Status404NotFound
                });
            }

            return Ok(new { message = "Alert acknowledged successfully" });
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to acknowledge alert",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Resolves an alert
    /// </summary>
    [HttpPost("alerts/{id:int}/resolve")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ResolveAlert(int id, [FromBody] ResolveAlertRequest request)
    {
        try
        {
            if (request == null || string.IsNullOrWhiteSpace(request.ResolvedBy))
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Invalid request",
                    Detail = "ResolvedBy is required",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            var success = await _thresholdService.ResolveAlertAsync(id, request.ResolvedBy, request.Notes);
            if (!success)
            {
                return NotFound(new ProblemDetails
                {
                    Title = "Alert not found",
                    Detail = $"Alert with ID {id} was not found",
                    Status = StatusCodes.Status404NotFound
                });
            }

            return Ok(new { message = "Alert resolved successfully" });
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to resolve alert",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Gets alert statistics
    /// </summary>
    [HttpGet("alerts/stats")]
    [ProducesResponseType(typeof(ThresholdAlertStats), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAlertStats()
    {
        try
        {
            var stats = await _thresholdService.GetAlertStatsAsync();
            return Ok(stats);
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to retrieve alert statistics",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

  





    /// <summary>
    /// Gets all webhook endpoints
    /// </summary>
    [HttpGet("notifications/webhooks")]
    [ProducesResponseType(typeof(IEnumerable<WebhookEndpoint>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetWebhookEndpoints()
    {
        try
        {
            var endpoints = await _webhookService.GetWebhookEndpointsAsync();
            return Ok(endpoints);
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to retrieve webhook endpoints",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Creates a new webhook endpoint
    /// </summary>
    [HttpPost("notifications/webhooks")]
    [ProducesResponseType(typeof(WebhookEndpoint), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateWebhookEndpoint([FromBody] WebhookEndpoint endpoint)
    {
        try
        {
            if (endpoint == null)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Invalid request",
                    Detail = "Webhook endpoint data is required",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            if (!endpoint.IsValid())
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Invalid webhook endpoint",
                    Detail = "Webhook endpoint configuration is invalid",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            var createdEndpoint = await _webhookService.CreateWebhookEndpointAsync(endpoint);
            
            return CreatedAtAction(
                nameof(GetWebhookEndpoints),
                createdEndpoint
            );
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to create webhook endpoint",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

}