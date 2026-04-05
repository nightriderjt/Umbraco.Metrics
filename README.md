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
- Windows Server, Tested also on Ubuntu 24.04.4 LTS

## Installation & Configuration

### Step 1: Install the Package

Add UmbMetrics to your Umbraco project via NuGet:

```bash
dotnet add package UmbMetrics
```

Or install via NuGet Package Manager in Visual Studio.

### Step 2: Configure SignalR Hub Endpoint

You do not need to map the SignalR hub anymore as you did in the previous versions. It is maped in the composer from version 17.2.0.1+ .

**Note:** The `MetricsComposer` automatically registers all other required services (PerformanceMetricsService, UmbracoMetricsService, MetricsExportService, HistoricalMetricsService, SignalR services, middleware, and background services).
In any case you need to modify the default options you can do it with your own composer and a PostConfigure call.
For example, to change the default metrics collection interval:

```csharp   
using Umbraco.Metrics;
public class CustomMetricsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.PostConfigure<MetricsOptions>(options =>
        {
            options.CollectionInterval = TimeSpan.FromSeconds(5); // Change to 5 seconds
        });
    }
}
```

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

UmbMetrics includes  export capabilities, allowing you to download your metrics data for offline analysis, reporting, or archiving. The export system provides both quick one-click exports and customizable export options.

### Available Export Formats

1. **CSV (Comma-Separated Values)**
   - Perfect for spreadsheet analysis in Excel, Google Sheets, or data visualization tools
   - Structured with clear column headers
   - Ideal for data analysis and reporting

2. **JSON (JavaScript Object Notation)**
   - Ideal for programmatic analysis and integration with other systems
   - Easy to parse with any programming language
   - Suitable for API integrations and custom dashboards

3. **XML (eXtensible Markup Language)**
   - Suitable for enterprise systems and legacy integrations
   - Includes comprehensive metadata  

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

- **Progress Tracking**: Visual progress bar during export generation
- **Timezone Support**: Export timestamps in UTC, local time, or specific timezones
- **Metric Selection**: Choose exactly which data to include
- **Date Range Picker**: Intuitive calendar interface for custom date ranges

### Quick Export Buttons

For maximum convenience, the dashboard includes dedicated quick export buttons:
- **Export as CSV**: One-click export of all current metrics in CSV format
- **Export as JSON**: One-click export of all current metrics in JSON format

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

## Threshold Monitoring

UmbMetrics includes threshold monitoring that lets you set up alerts for

### Key Features

- **Custom Threshold Rules**: Define rules based on any performance metric
- **Complex Conditions**: Create AND/OR logic with nested conditions
- **Multiple Alert Channels**: Dashboard notifications, email alerts, and webhook integrations
- **Cooldown Periods**: Prevent alert spam with configurable cooldown intervals

### Available Metrics for Threshold Rules

You can create threshold rules based on the following performance metrics:

- **CPU Usage**: Monitor processor utilization percentages
- **Memory Usage**: Track memory consumption and pressure
- **Active Requests**: Monitor concurrent request processing
- **Average Response Time**: Track application responsiveness
- **Requests Per Second**: Monitor traffic volume
- **Failed Requests**: Track error rates
- **Thread Count**: Monitor thread pool usage
- **Memory Statistics**: Working set, private memory, and GC memory

### Creating Threshold Rules

Threshold rules consist of:
1. **Rule Name & Description**: Descriptive identifiers for your rule
2. **Root Condition**: The main condition to evaluate (supports nested AND/OR logic)
3. **Evaluation Window**: Time period over which to evaluate the condition
4. **Alert Severity**: Info, Warning, or Critical levels
5. **Notification Settings**: Email recipients
6. **Cooldown Period**: Minimum time between alert triggers

### Example Threshold Rules

#### Simple CPU Alert
```json
{
  "name": "High CPU Usage",
  "description": "Alert when CPU exceeds 80% for 2 minutes",
  "rootCondition": {
    "type": "Single",
    "metric": "CpuUsage",
    "operator": "GreaterThan",
    "value": 80
  },
  "evaluationWindow": "00:02:00",
  "severity": "Warning"
}
```

#### Complex Memory & Request Alert
```json
{
  "name": "Memory Pressure with High Traffic",
  "description": "Alert when memory > 90% AND requests > 100/sec",
  "rootCondition": {
    "type": "And",
    "children": [
      {
        "type": "Single",
        "metric": "MemoryUsage",
        "operator": "GreaterThan",
        "value": 90
      },
      {
        "type": "Single",
        "metric": "RequestsPerSecond",
        "operator": "GreaterThan",
        "value": 100
      }
    ]
  },
  "evaluationWindow": "00:05:00",
  "severity": "Critical"
}
```

### Alert Management

- **Active Alerts Dashboard**: View all currently triggered alerts
- **Alert Acknowledgment**: Mark alerts as acknowledged to track resolution
- **Alert Statistics**: View alert frequency and severity trends
- **Email Notifications**: Receive alerts directly in your inbox
- **Webhook Integrations**: Send alerts to external systems (Slack, Teams, etc.)



#### Email Notifications
- Configure multiple email recipients per rule
- Customizable email templates
- Include detailed metric information in alerts

#### Webhook Integrations
- Using the built in Umbraco's webhook mechanism

### Best Practices

1. **Start Conservative**: Begin with higher thresholds and adjust based on your environment
2. **Use Cooldown Periods**: Prevent alert fatigue with 15-30 minute cooldowns
3. **Combine Related Metrics**: Use AND conditions to reduce false positives
4. **Test with Lower Severities**: Start with Info/Warning alerts before moving to Critical
5. **Monitor Alert Volume**: Adjust thresholds if you're receiving too many or too few alerts


Detailed example :
```json
{
  "EmailNotifications": {
    "FromAddress": "metrics@yourdomain.com",
    "FromName": "Umbraco Metrics",
    "DefaultRecipients": [
      "admin@yourdomain.com",
      "devops@yourdomain.com"
    ],
    "AlertTriggeredSubjectTemplate": "[ALERT] {RuleName} - {ServerName}",
    "AlertTriggeredBodyTemplatePath": "", 
    "MaxRetryAttempts": 3,
    "RetryDelaySeconds": 30,
    "IsEnabled": true
  },
  "ThresholdRules": {
    "Rules": [
      {
        "Name": "High CPU Usage",
        "Description": "Alert when CPU usage exceeds 80% for 2 minutes",
        "RootCondition": {
          "Type": "Single",
          "Metric": "CpuUsage",
          "Operator": "GreaterThan",
          "Value": 80.0,
          "Children": []
        },
        "EvaluationWindow": "00:02:00",
        "Severity": "Warning",
        "IsEnabled": true,
        "EmailRecipients": [],       
        "CooldownPeriod": "00:15:00"
      },
      {
        "Name": "High Memory Usage",
        "Description": "Alert when memory usage exceeds 1.5GB for 1 minute",
        "RootCondition": {
          "Type": "Single",
          "Metric": "MemoryUsage",
          "Operator": "GreaterThan",
          "Value": 1500.0,
          "Children": []
        },
        "EvaluationWindow": "00:01:00",
        "Severity": "Warning",
        "IsEnabled": true,
        "EmailRecipients": [],      
        "CooldownPeriod": "00:10:00"
      },
      {
        "Name": "High Active Requests",
        "Description": "Alert when active requests exceed 50 for 30 seconds",
        "RootCondition": {
          "Type": "Single",
          "Metric": "ActiveRequests",
          "Operator": "GreaterThan",
          "Value": 50.0,
          "Children": []
        },
        "EvaluationWindow": "00:00:30",
        "Severity": "Critical",
        "IsEnabled": true,
        "EmailRecipients": [],       
        "CooldownPeriod": "00:05:00"
      },
      {
        "Name": "Slow Response Time",
        "Description": "Alert when average response time exceeds 500ms for 1 minute",
        "RootCondition": {
          "Type": "Single",
          "Metric": "AverageResponseTime",
          "Operator": "GreaterThan",
          "Value": 500.0,
          "Children": []
        },
        "EvaluationWindow": "00:01:00",
        "Severity": "Warning",
        "IsEnabled": true,
        "EmailRecipients": [],      
        "CooldownPeriod": "00:10:00"
      },
      {
        "Name": "CPU and Memory High",
        "Description": "Alert when both CPU > 70% AND Memory > 1GB for 2 minutes",
        "RootCondition": {
          "Type": "And",
          "Metric": null,
          "Operator": null,
          "Value": null,
          "Children": [
            {
              "Type": "Single",
              "Metric": "CpuUsage",
              "Operator": "GreaterThan",
              "Value": 70.0,
              "Children": []
            },
            {
              "Type": "Single",
              "Metric": "MemoryUsage",
              "Operator": "GreaterThan",
              "Value": 1000.0,
              "Children": []
            }
          ]
        },
        "EvaluationWindow": "00:02:00",
        "Severity": "Critical",
        "IsEnabled": true,
        "EmailRecipients": [],      
        "CooldownPeriod": "00:20:00"
      },
      {
        "Name": "CPU High OR Active Requests High",
        "Description": "Alert when CPU > 70% OR Active Requests > 30 for 1 minute",
        "RootCondition": {
          "Type": "Or",
          "Metric": null,
          "Operator": null,
          "Value": null,
          "Children": [
            {
              "Type": "Single",
              "Metric": "CpuUsage",
              "Operator": "GreaterThan",
              "Value": 70.0,
              "Children": []
            },
            {
              "Type": "Single",
              "Metric": "ActiveRequests",
              "Operator": "GreaterThan",
              "Value": 30.0,
              "Children": []
            }
          ]
        },
        "EvaluationWindow": "00:01:00",
        "Severity": "Warning",
        "IsEnabled": true,
        "EmailRecipients": [],     
        "CooldownPeriod": "00:15:00"
      }
    ]
  }
}
```

#### Configuration Options

- **Rules**: Array of threshold rule definitions
- **Name**: Unique identifier for the rule
- **Description**: Human-readable description
- **RootCondition**: The condition to evaluate (supports nested AND/OR conditions)
- **EvaluationWindow**: TimeSpan format (HH:MM:SS) - how long the condition must be true before triggering
- **Severity**: Info, Warning, or Critical
- **IsEnabled**: Enable/disable the rule
- **EmailRecipients**: List of email addresses to notify
- **CooldownPeriod**: TimeSpan format - minimum time between alert triggers


## What's Next?

Future enhancements planned:
- Multi-server monitoring
- Advanced analytics and visualization

---

**Monitor smarter, not harder. Install UmbMetrics today.**
