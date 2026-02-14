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

Add UmbMetrics to your Umbraco project via NuGet or by referencing the project.

### Step 2: Configure Your Startup (Program.cs)



Update your `Program.cs` file to add SignalR services and map the MetricsHub endpoint. This uses the modern minimal hosting model (no `Startup.cs` or `ConfigureServices` method):

```csharp
// Add using statement
using Umbraco.Metrics;
var builder = WebApplication.CreateBuilder(args);
builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();
// Register services
builder.Services.AddSignalR();


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
        
        // Map SignalR hub endpoint
        u.EndpointRouteBuilder?.MapHub<UmbMetrics.Hubs.MetricsHub>("/umbraco/metrics-hub");
    });

```



### Step 3: Access the Dashboard

After installation and configuration, restart your Umbraco site and navigate to `Settings` -> `Umbraco Metrics` to access your monitoring dashboard.

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

UmbMetrics now includes powerful export capabilities, allowing you to download your metrics data for offline analysis, reporting, or archiving.

### Available Export Formats

1. **CSV (Comma-Separated Values)**
   - Perfect for spreadsheet analysis in Excel, Google Sheets, or data visualization tools
   - Includes proper escaping for Excel compatibility
   - Structured with clear column headers

2. **JSON (JavaScript Object Notation)**
   - Ideal for programmatic analysis and integration with other systems
   - Preserves the complete data structure
   - Easy to parse with any programming language

3. **XML (eXtensible Markup Language)**
   - Suitable for enterprise systems and legacy integrations
   - Well-structured hierarchical format
   - Includes schema information

### Export Scopes

- **Current Metrics**: Export only the currently displayed metrics
- **Historical Data**: Export metrics collected over time (requires historical storage)
- **Custom Range**: Export metrics from a specific date range

### What You Can Export

- **Performance Metrics**: CPU usage, memory consumption, thread information, garbage collection stats
- **Umbraco Metrics**: Content statistics, media library information, cache performance, user data
- **Active Requests**: Detailed information about currently processing requests
- **Application Information**: Server details, uptime, version information

### How to Export

1. Navigate to the UmbMetrics dashboard in your Umbraco backoffice
2. Click the "Export Metrics" button in the dashboard controls
3. Choose your preferred format (CSV, JSON, or XML)
4. Select which metrics to include
5. Configure the export scope and date range if needed
6. Click "Export Metrics" to download your data

### Quick Export Options

For convenience, UmbMetrics provides one-click export buttons:
- **Export as CSV**: Quick export of all metrics in CSV format
- **Export as JSON**: Quick export of all metrics in JSON format

### File Size Estimation

The export modal provides real-time file size estimates based on your selected options, helping you choose the right format and scope for your needs.

## What's Next?

Future enhancements planned:
- Historical metrics storage
- Alerting and notifications
- Custom metric thresholds
- Multi-server monitoring
- Advanced analytics and visualization

---

**Monitor smarter, not harder. Install UmbMetrics today.**
