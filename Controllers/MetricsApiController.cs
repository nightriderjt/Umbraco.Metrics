using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UmbMetrics.Middleware;
using UmbMetrics.Models;
using UmbMetrics.Services;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Web.Common.Authorization;

namespace UmbMetrics.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Metrics")]
[VersionedApiBackOfficeRoute("metrics")]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
public class MetricsApiController : ManagementApiControllerBase
{
    private readonly IPerformanceMetricsService _metricsService;
    private readonly IUmbracoMetricsService _umbracoMetricsService;
    private readonly IMetricsExportService _exportService;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public MetricsApiController(
        IPerformanceMetricsService metricsService,
        IUmbracoMetricsService umbracoMetricsService,
        IMetricsExportService exportService,
        IWebHostEnvironment webHostEnvironment)
    {
        _metricsService = metricsService;
        _umbracoMetricsService = umbracoMetricsService;
        _exportService = exportService;
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

    /// <summary>
    /// Export metrics in various formats (JSON, CSV, XML)
    /// </summary>
    [HttpPost("export")]
    [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ExportMetrics([FromBody] ExportOptions options)
    {
        try
        {
            if (options == null)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Invalid request",
                    Detail = "Export options are required",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            var exportResult = await _exportService.ExportMetricsAsync(options);

            return File(
                exportResult.Data,
                exportResult.ContentType,
                exportResult.FileName
            );
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Invalid export configuration",
                Detail = ex.Message,
                Status = StatusCodes.Status400BadRequest
            });
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to export metrics",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Export performance metrics only
    /// </summary>
    [HttpPost("export/performance")]
    [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ExportPerformanceMetrics([FromQuery] ExportFormat format = ExportFormat.Json)
    {
        try
        {
            var options = new ExportOptions
            {
                Format = format,
                IncludePerformanceMetrics = true,
                IncludeUmbracoMetrics = false
            };

            var exportResult = await _exportService.ExportPerformanceMetricsAsync(options);

            return File(
                exportResult.Data,
                exportResult.ContentType,
                exportResult.FileName
            );
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to export performance metrics",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Export Umbraco metrics only
    /// </summary>
    [HttpPost("export/umbraco")]
    [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ExportUmbracoMetrics([FromQuery] ExportFormat format = ExportFormat.Json)
    {
        try
        {
            var options = new ExportOptions
            {
                Format = format,
                IncludePerformanceMetrics = false,
                IncludeUmbracoMetrics = true
            };

            var exportResult = await _exportService.ExportUmbracoMetricsAsync(options);

            return File(
                exportResult.Data,
                exportResult.ContentType,
                exportResult.FileName
            );
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to export Umbraco metrics",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
}
