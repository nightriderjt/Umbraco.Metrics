using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UmbMetrics.Middleware;
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
    private readonly IUmbracoMetricsService _umbracoMetricsService;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public MetricsApiController(IPerformanceMetricsService metricsService,IUmbracoMetricsService umbracoMetricsService,IWebHostEnvironment webHostEnvironment)
    {
        _metricsService = metricsService;
        _umbracoMetricsService = umbracoMetricsService;
        _webHostEnvironment = webHostEnvironment;
    }

    /// <summary>
    /// Gets the current performance metrics for the application
    /// </summary>
    /// <returns>Performance metrics data</returns>
    [HttpGet("performance")]
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
    [HttpGet("umb")]
    public async Task<IActionResult> GetUmbracoMetrics()
    {
        try
        {
            var metrics = await _umbracoMetricsService.GetMetricsAsync();
            return Ok(metrics);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
    [HttpGet("active-requests")]
    public IActionResult GetActiveRequests()
    {
        var activeRequests = MetricsMiddleware.GetActiveRequestDetails(ControllerContext.HttpContext,_webHostEnvironment);
        return Ok(activeRequests);
    }
}