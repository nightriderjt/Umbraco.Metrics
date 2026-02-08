using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using UmbMetrics.Middleware;
using UmbMetrics.Services;
using Microsoft.Extensions.DependencyInjection;

namespace UmbMetrics.Composers;

public class MetricsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Register services
        builder.Services.AddSingleton<IPerformanceMetricsService, PerformanceMetricsService>();
        builder.Services.AddScoped<IUmbracoMetricsService, UmbracoMetricsService>();
        
        // Register middleware
        builder.Services.AddSingleton<MetricsMiddleware>();
    }
}