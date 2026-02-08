using UmbMetrics.Models;

namespace UmbMetrics.Services;

public interface IPerformanceMetricsService
{
    Task<PerformanceMetrics> GetMetricsAsync();
}