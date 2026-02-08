using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;
using UmbMetrics.Services;

namespace UmbMetrics.Controllers;

[PluginController("UmbMetrics")]
[Authorize(Policy = Umbraco.Cms.Web.Common.Authorization.AuthorizationPolicies.BackOfficeAccess)]
public class UmbracoMetricsController : UmbracoAuthorizedApiController
{
    private readonly IUmbracoMetricsService _umbracoMetricsService;

    public UmbracoMetricsController(IUmbracoMetricsService umbracoMetricsService)
    {
        _umbracoMetricsService = umbracoMetricsService;
    }

    [HttpGet("umbraco")]
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
}