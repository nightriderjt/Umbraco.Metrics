# UmbMetrics - Performance Monitoring for Umbraco

Keep your Umbraco website running smoothly with real-time insights into your application's health and performance.

## What Does UmbMetrics Do?

UmbMetrics adds a powerful monitoring dashboard to your Umbraco backoffice, giving you instant visibility into how your website is performing. See at a glance if your server is struggling, identify performance bottlenecks, and make informed decisions about when to scale your infrastructure.

## Why Use UmbMetrics?

### 🔍 **Spot Problems Before Users Do**
Know immediately when CPU usage spikes, memory runs low, or requests start failing. Don't wait for angry emails or support tickets.

### ⚡ **Optimize Performance**
Understand which resources your application is consuming most. See if slow response times correlate with high CPU usage, memory pressure, or thread exhaustion.

### 📈 **Plan for Growth**
Track trends over time to understand when you'll need to upgrade your hosting plan or optimize your code. Make data-driven infrastructure decisions.

### 🎯 **Troubleshoot with Confidence**
When something goes wrong, immediately see what's happening with your server. No need to remote into servers or dig through log files for basic health information.

## Key Metrics You'll Monitor

### Application Health
- **CPU Usage**: Is your processor keeping up with demand?
- **Memory Consumption**: How much RAM is your application using?
- **Uptime**: How long has your application been running?
- **Response Times**: How quickly are pages loading for your users?

### Request Activity
- **Traffic Levels**: How many requests per second is your site handling?
- **Failed Requests**: Are errors occurring? How many?
- **Active Requests**: How many requests are currently being processed?
- **Request History**: Total requests served since last restart

### Resource Management
- **Thread Usage**: Is your application efficiently handling concurrent work?
- **Work Queue**: Are tasks backing up waiting to be processed?
- **Memory Allocation**: How is .NET managing memory for your application?
- **Garbage Collection**: Is the garbage collector running efficiently?

## Perfect For

✅ **Site Administrators** monitoring production environments  
✅ **Developers** optimizing application performance  
✅ **DevOps Teams** tracking system health  
✅ **Agencies** managing multiple client sites  
✅ **Anyone** who wants peace of mind about their Umbraco site

## How It Works

Once installed, UmbMetrics adds a new dashboard to your Umbraco **Settings** section. Simply navigate to it to see your metrics. Toggle on real-time updates to watch your metrics refresh automatically every 1 second - perfect for monitoring during deployments, traffic spikes, or performance testing.

### Two Views, Complete Picture

**Overview Dashboard**
Get a bird's-eye view of your application: CPU, memory, requests, threads, and timing - everything you need to assess overall health in seconds.

**Heap & Garbage Collection**
Deep dive into .NET's memory management: see how the garbage collector is performing, understand memory allocation patterns, and identify potential memory leaks.

## Requirements

- Umbraco CMS 17 or higher
- .NET 10

## Installation & Configuration

### Step 1: Install the Package

Add UmbMetrics to your Umbraco project via NuGet:

```bash
dotnet add package UmbMetrics
```

Or install via NuGet Package Manager in Visual Studio.

### Step 2: Configure SignalR Hub Endpoint

While most services are registered automatically via the `MetricsComposer`, you need to map the SignalR hub endpoint in your `Program.cs` file to enable real-time metrics updates:

```csharp
using Umbraco.Metrics;

var builder = WebApplication.CreateBuilder(args);

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

var app = builder.Build();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
        
        // Map SignalR hub endpoint for real-time metrics
        u.EndpointRouteBuilder?.MapHub<UmbMetrics.Hubs.MetricsHub>("/umbraco/metrics-hub");
    });

app.Run();
```

**Note:** The `MetricsComposer` automatically registers all other required services (PerformanceMetricsService, UmbracoMetricsService, MetricsExportService, HistoricalMetricsService, SignalR services, middleware, and background services).

### Step 3: Access the Dashboard

After installation and configuration, restart your Umbraco site and navigate to `Settings` -> `Umbraco Metrics` to access your monitoring dashboard.

## Advanced Features

### Historical Metrics Collection
UmbMetrics automatically collects and stores historical performance data, allowing you to:
- Track performance trends over time (default: 30 days retention)
- Export historical data for analysis
- Identify patterns and anomalies in system performance
- Configure storage settings (path, retention, file size limits)

### Active Requests Monitoring
Monitor real-time request activity with detailed insights:
- View currently processing requests with method, path, and duration
- Identify slow or problematic endpoints
- Track request status codes and client information
- Monitor request queue and thread usage

## Real-Time Updates

Enable the "Real-time Updates" toggle to watch your metrics update live. Perfect for:
- Monitoring deployments
- Load testing
- Identifying the impact of specific user actions
- Watching resource usage during peak traffic
- Troubleshooting performance issues as they happen

## Privacy & Security

All metrics stay within your environment. Nothing is sent to external services. Only authenticated Umbraco backoffice users can access the dashboard.

## Support

- GitHub: https://github.com/nightriderjt/Umbraco.Metrics
- Report issues: https://github.com/nightriderjt/Umbraco.Metrics/issues

## Export Functionality

UmbMetrics includes powerful export capabilities, allowing you to download your metrics data for offline analysis, reporting, or archiving. The export system provides both quick one-click exports and customizable export options.

### Available Export Formats

1. **CSV (Comma-Separated Values)**
   - Perfect for spreadsheet analysis in Excel, Google Sheets, or data visualization tools
   - Includes proper escaping for Excel compatibility
   - Structured with clear column headers
   - Ideal for data analysis and reporting

2. **JSON (JavaScript Object Notation)**
   - Ideal for programmatic analysis and integration with other systems
   - Preserves the complete data structure with nested objects
   - Easy to parse with any programming language
   - Suitable for API integrations and custom dashboards

3. **XML (eXtensible Markup Language)**
   - Suitable for enterprise systems and legacy integrations
   - Well-structured hierarchical format with proper schema
   - Includes comprehensive metadata
   - Compatible with enterprise reporting systems

### Export Scopes

- **Current Snapshot**: Export only the currently displayed real-time metrics
- **Historical Data**: Export metrics collected over time from the historical database
- **Custom Range**: Export metrics from a specific date range with precise control

### What You Can Export

- **Performance Metrics**: 
  - CPU usage percentages and trends
  - Memory consumption (working set, private bytes, heap size)
  - Thread information (count, pool statistics)
  - Garbage collection statistics (gen0, gen1, gen2 collections)
  - Request metrics (active, total, failed requests)

- **Umbraco Metrics**:
  - Content statistics (total nodes, published nodes, by content type)
  - Media library information (total items, storage usage)
  - Cache performance (runtime cache items, cache hit ratios)
  - User data (total users, active sessions)
  - Database statistics

- **Active Requests**:
  - Detailed information about currently processing requests
  - Request methods, paths, durations, and status codes
  - Client IP addresses and user agents
  - Query string parameters

- **Application Information**:
  - Server details (process ID, architecture, runtime version)
  - Uptime information
  - Environment configuration
  - SignalR connection status

### How to Export

#### Quick Export (One-Click)
1. Navigate to the UmbMetrics dashboard in your Umbraco backoffice
2. Click the "Export Metrics" button in the dashboard controls
3. Use the quick export buttons for instant CSV or JSON exports
4. Download will start immediately with default settings

#### Custom Export (Advanced Options)
1. Open the Export Metrics modal from the dashboard
2. Choose between **Quick Export** (one-click) or **Custom Export** (configured)
3. For custom exports:
   - Select your preferred format (CSV, JSON, XML)
   - Choose the export scope (Current, Historical, Custom Range)
   - Configure date range if selecting custom scope
   - Select which metric types to include
   - Choose timezone for timestamp formatting
4. Review the estimated file size
5. Click "Export Metrics" to generate and download your data

### Export Modal Features

- **Real-time File Size Estimation**: See estimated download size before exporting
- **Progress Tracking**: Visual progress bar during export generation
- **Format Descriptions**: Clear explanations of each export format
- **Timezone Support**: Export timestamps in UTC, local time, or specific timezones
- **Metric Selection**: Choose exactly which data to include
- **Date Range Picker**: Intuitive calendar interface for custom date ranges

### Quick Export Buttons

For maximum convenience, the dashboard includes dedicated quick export buttons:
- **Export as CSV**: One-click export of all current metrics in CSV format
- **Export as JSON**: One-click export of all current metrics in JSON format

### File Size Optimization

The export system automatically optimizes file sizes by:
- Compressing redundant data structures
- Using efficient serialization formats
- Supporting partial exports (select specific metric types only)

### Use Cases

- **Performance Analysis**: Export metrics for detailed performance troubleshooting
- **Capacity Planning**: Analyze historical trends to plan infrastructure upgrades
- **Compliance Reporting**: Generate audit reports for regulatory requirements
- **Development Testing**: Capture metrics during load testing and optimization
- **Client Reporting**: Share performance data with stakeholders
- **System Monitoring**: Integrate with external monitoring systems

### Integration Options

Exported data can be easily integrated with:
- Business Intelligence tools (Power BI, Tableau)
- Monitoring systems (Grafana, Prometheus)
- Custom dashboards and reporting tools
- Data analysis platforms
- Archival systems for compliance

### Best Practices

1. **For Quick Analysis**: Use CSV format with current snapshot
2. **For System Integration**: Use JSON format with historical data
3. **For Enterprise Reporting**: Use XML format with custom date ranges
4. **For Large Datasets**: Use custom ranges to limit data volume
5. **For Regular Reporting**: Schedule exports during off-peak hours

The export functionality is designed to be both powerful and user-friendly, providing enterprise-grade data export capabilities with an intuitive interface.

## What's Next?

Future enhancements planned:
- Alerting and notifications
- Custom metric thresholds
- Multi-server monitoring
- Advanced analytics and visualization

---

**Monitor smarter, not harder. Install UmbMetrics today.**
