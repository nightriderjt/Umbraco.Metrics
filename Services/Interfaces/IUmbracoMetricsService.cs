using UmbMetrics.Models;

namespace UmbMetrics.Services;

public interface IUmbracoMetricsService
{
    Task<UmbracoMetrics> GetMetricsAsync();
}