using System.Collections.Concurrent;
using UmbMetrics.Models;

namespace UmbMetrics.Services;

public interface IPerformanceMetricsService
{
     ConcurrentDictionary<Guid, SqlOperation> SqlOperations { get; set; }
    Task<PerformanceMetrics> GetMetricsAsync();
}