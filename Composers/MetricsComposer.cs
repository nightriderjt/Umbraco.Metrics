using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using UmbMetrics.Middleware;
using UmbMetrics.Services;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Web.Common.ApplicationBuilder;

namespace UmbMetrics.Composers;

public class MetricsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Register metrics service
        builder.Services.AddSingleton<IPerformanceMetricsService, PerformanceMetricsService>();
        builder.Services.AddScoped<IUmbracoMetricsService, UmbracoMetricsService>();
        // Register background service for broadcasting metrics
        builder.Services.AddHostedService<MetricsBroadcastService>();

        // Register middleware
        builder.Services.Configure<UmbracoPipelineOptions>(options =>
        {
            options.AddFilter(new UmbracoPipelineFilter(
                "MetricsMiddleware",
                applicationBuilder =>
                {
                    applicationBuilder.UseMiddleware<MetricsMiddleware>();
                },
                applicationBuilder => { },
                applicationBuilder => { }
            ));
        });
    }
}