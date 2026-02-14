using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UmbMetrics.Middleware;
using UmbMetrics.Models;
using UmbMetrics.Services;
using UmbMetrics.Services.Interfaces;
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
    private readonly IHistoricalMetricsService _historicalMetricsService;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public MetricsApiController(
        IPerformanceMetricsService metricsService,
        IUmbracoMetricsService umbracoMetricsService,
        IMetricsExportService exportService,
        IHistoricalMetricsService historicalMetricsService,
        IWebHostEnvironment webHostEnvironment)
    {
        _metricsService = metricsService;
        _umbracoMetricsService = umbracoMetricsService;
        _exportService = exportService;
        _historicalMetricsService = historicalMetricsService;
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

    /// <summary>
    /// Gets historical performance metrics within a date range
    /// </summary>
    [HttpGet("historical")]
    [ProducesResponseType(typeof(IEnumerable<PerformanceMetrics>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetHistoricalMetrics(
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate)
    {
        try
        {
            if (startDate > endDate)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Invalid date range",
                    Detail = "Start date must be before end date",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            var metrics = await _historicalMetricsService.GetHistoricalMetricsAsync(startDate, endDate);
            return Ok(metrics);
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to retrieve historical metrics",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Gets the latest N historical performance metrics
    /// </summary>
    [HttpGet("historical/latest")]
    [ProducesResponseType(typeof(IEnumerable<PerformanceMetrics>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetLatestHistoricalMetrics([FromQuery] int count = 100)
    {
        try
        {
            if (count <= 0 || count > 1000)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Invalid count parameter",
                    Detail = "Count must be between 1 and 1000",
                    Status = StatusCodes.Status400BadRequest
                });
            }

            var metrics = await _historicalMetricsService.GetLatestMetricsAsync(count);
            return Ok(metrics);
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to retrieve latest metrics",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Gets statistics about historical metrics storage
    /// </summary>
    [HttpGet("historical/stats")]
    [ProducesResponseType(typeof(HistoricalMetricsStats), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetHistoricalMetricsStats()
    {
        try
        {
            var stats = await _historicalMetricsService.GetStorageStatsAsync();
            return Ok(stats);
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to retrieve storage statistics",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Manually triggers cleanup of old historical data
    /// </summary>
    [HttpPost("historical/cleanup")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CleanupHistoricalData()
    {
        try
        {
            await _historicalMetricsService.CleanupOldDataAsync();
            return Ok(new { message = "Historical data cleanup completed" });
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to cleanup historical data",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }

    /// <summary>
    /// Manually saves current metrics to historical storage
    /// </summary>
    [HttpPost("historical/save")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> SaveCurrentMetrics()
    {
        try
        {
            await _historicalMetricsService.SaveMetricsAsync();
            return Ok(new { message = "Metrics saved to historical storage" });
        }
        catch (Exception ex)
        {
            return Problem(
                title: "Failed to save metrics",
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError
            );
        }
    }
}
