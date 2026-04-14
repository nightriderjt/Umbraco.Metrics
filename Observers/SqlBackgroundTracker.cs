using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using UmbMetrics.Services;

namespace UmbMetrics.Observers
{
    public class SqlTrackingBootstrapper : IHostedService
    {
        private readonly IPerformanceMetricsService _metrics;
        private IDisposable? _subscription;

        public SqlTrackingBootstrapper(IPerformanceMetricsService metrics) => _metrics = metrics;

        public Task StartAsync(CancellationToken cancellationToken)
        {
            // Start listening the moment the app starts
            _subscription = DiagnosticListener.AllListeners.Subscribe(new SqlBackgroundTracker(_metrics));
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _subscription?.Dispose();
            return Task.CompletedTask;
        }
    }
    public class SqlBackgroundTracker : IObserver<DiagnosticListener>
    {
        private readonly IPerformanceMetricsService _performanceMetricsService;
        public SqlBackgroundTracker(IPerformanceMetricsService  performanceMetricsService)
        {
            _performanceMetricsService = performanceMetricsService;
        }
        public void OnCompleted() { }
        public void OnError(Exception error) { }

        public void OnNext(DiagnosticListener value)
        {
            if (value.Name == "SqlClientDiagnosticListener")
            {             
                value.Subscribe(new SqlQueryObserver(_performanceMetricsService));
            }
        }
    }  
}
