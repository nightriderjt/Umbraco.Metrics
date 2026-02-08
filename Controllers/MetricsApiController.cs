using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UmbMetrics.Services;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace UmbMetrics.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Metrics")]
[VersionedApiBackOfficeRoute("metrics")]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
public class MetricsApiController : ManagementApiControllerBase
{
    private readonly IPerformanceMetricsService _metricsService;

    public MetricsApiController(IPerformanceMetricsService metricsService)
    {
        _metricsService = metricsService;
    }

    /// <summary>
    /// Gets the current performance metrics for the application
    /// </summary>
    /// <returns>Performance metrics data</returns>
    [HttpGet("performance")]
    [MapToApiVersion("1.0")]
    [ProducesResponseType(typeof(PerformanceMetrics), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPerformanceMetrics()
    {
        try
        {
            var metrics = await _metricsService.GetMetricsAsync();
            return Ok(metrics);
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to retrieve performance metrics",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
}