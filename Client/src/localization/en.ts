

export default {
  // Dashboard
  "dashboard": {
    "metrics": "Metrics",
    "exportMetrics": "Export Metrics",
    "performanceMetrics": "Performance Metrics",
    "umbracoMetrics": "Umbraco Metrics",
    "activeRequests": "Active Requests",
    "refresh": "Refresh",
    "lastUpdated": "Last updated",
    "loading": "Loading...",
    "noData": "No data available",
    "errorLoading": "Error loading data",
    "applicationPerformanceMetrics": "Application Performance Metrics",
    "dotnetApplication": ".NET Application",
    "realTimeMetrics": "Real-time Metrics",
    "refreshMetrics": "Refresh Metrics",
    "realTimeUpdates": "Real-time Updates (SignalR)",
    "connected": "Connected",
    "connecting": "Connecting...",
    "overview": "Overview",
    "heapAndGC": "Heap & GC",
    "utils": "Utils",
    "clickToLoadPerformance": "Click \"Refresh Metrics\" to load application performance data",
    "clickToLoadHeap": "Click \"Refresh Metrics\" to load heap information",
    "clickToLoadUmbraco": "Click \"Refresh Metrics\" to load Umbraco-specific data",
    "utilityTools": "Utility Tools",
    "utilityToolsDescription": "Additional tools for managing and exporting metrics data",
    "exportMetricsCard": "Export Metrics",
    "exportMetricsDescription": "Export performance and Umbraco metrics in various formats (CSV, JSON)",
    "openExportDialog": "Open Export Dialog",
    "dataManagement": "Data Management",
    "dataManagementDescription": "Manage historical metrics data and cleanup options",
    "cleanupOldData": "Cleanup Old Data",
    "advancedAnalytics": "Advanced Analytics",
    "advancedAnalyticsDescription": "Generate detailed reports and analytics from collected metrics",
    "generateReport": "Generate Report",
    "scheduledTasks": "Scheduled Tasks",
    "scheduledTasksDescription": "Schedule automatic exports and data collection tasks",
    "scheduleExport": "Schedule Export"
  },

  // Export Modal
  "export": {
    "title": "Export Metrics",
    "quickExport": "Quick Export",
    "quickExportDescription": "Export all metrics with one click",
    "customExport": "Custom Export",
    "customExportDescription": "Configure export options",
    "exportAsCsv": "Export as CSV",
    "exportAsJson": "Export as JSON",
    "exportMetrics": "Export Metrics",
    "cancel": "Cancel",
    "exporting": "Exporting...",
    "exportComplete": "Export Complete",
    "exportFailed": "Export Failed",
    "metricsExportedSuccessfully": "Metrics exported successfully",
    "failedToExportMetrics": "Failed to export metrics",
    "estimatedFileSize": "Estimated file size",
    "quickExportCompleted": "Quick export to",
    "completed": "completed"
  },

  // Export Options
  "exportOptions": {
    "format": "Format",
    "scope": "Scope",
    "dateRange": "Date Range",
    "timezone": "Timezone",
    "includeMetrics": "Include Metrics",
    "performanceMetrics": "Performance Metrics",
    "umbracoMetrics": "Umbraco Metrics",
    "activeRequests": "Active Requests",
    "startDate": "Start Date",
    "endDate": "End Date",
    "to": "to",
    "currentSnapshot": "Current Snapshot",
    "historicalData": "Historical Data",
    "customRange": "Custom Range",
    "exportCurrentMetricsOnly": "Export current metrics only",
    "exportHistoricalMetrics": "Export historical metrics",
    "exportMetricsFromSpecificDateRange": "Export metrics from specific date range"
  },

  // Format Options
  "formats": {
    "json": "JSON",
    "csv": "CSV",
    "xml": "XML",
    "jsonDescription": "Structured data format, good for APIs and programming",
    "csvDescription": "Spreadsheet format, good for Excel and data analysis",
    "xmlDescription": "Markup format, good for legacy systems"
  },

  // Timezone Options
  "timezones": {
    "utc": "UTC",
    "local": "Local Time",
    "europeLondon": "Europe/London",
    "americaNewYork": "America/New_York",
    "asiaTokyo": "Asia/Tokyo"
  },

  // Validation Messages
  "validation": {
    "bothDatesRequired": "Both start and end dates are required for custom range",
    "startDateBeforeEndDate": "Start date must be before end date",
    "atLeastOneMetricRequired": "At least one metric type must be selected",
    "invalidExportConfiguration": "Invalid export configuration"
  },

  // Progress
  "progress": {
    "preparing": "Preparing export...",
    "exporting": "Exporting data...",
    "downloading": "Downloading file...",
    "complete": "Export complete"
  },

  // Metric Cards
  "metrics": {
    "cpuUsage": "CPU Usage",
    "memoryUsage": "Memory Usage",
    "totalRequests": "Total Requests",
    "activeRequests": "Active Requests",
    "totalContentNodes": "Total Content Nodes",
    "totalMediaItems": "Total Media Items",
    "runtimeCacheItems": "Runtime Cache Items",
    "totalUsers": "Total Users",
    "processId": "Process ID",
    "uptime": "Uptime",
    "threadCount": "Thread Count",
    "publishedNodes": "Published Nodes",
    "totalCacheSize": "Total Cache Size",
    "activeUsers": "Active Users"
  },

  // Units
  "units": {
    "percent": "%",
    "megabytes": "MB",
    "requests": "requests",
    "nodes": "nodes",
    "items": "items",
    "users": "users",
    "seconds": "seconds",
    "minutes": "minutes",
    "hours": "hours",
    "days": "days"
  },

  // App Info Banner
  "appInfo": {
    "process": "Process",
    "runtime": "Runtime",
    "architecture": "Architecture",
    "cpuCores": "CPU Cores",
    "uptime": "Uptime",
    "signalRConnected": "SignalR Connected",
    "64bit": "64-bit",
    "32bit": "32-bit"
  },

  // Active Requests Sidebar
  "activeRequests": {
    "title": "Active Requests",
    "loading": "Loading active requests...",
    "noRequests": "No active requests",
    "allRequestsCompleted": "All requests have completed",
    "activeRequestsCount": "active request",
    "activeRequestsCount_plural": "active requests",
    "method": "Method",
    "path": "Path",
    "duration": "Duration",
    "startTime": "Start Time",
    "queryString": "Query String",
    "remoteIp": "Remote IP",
    "userAgent": "User Agent",
    "autoRefresh": "Auto-refresh",
    "refresh": "Refresh",
    "close": "Close",
    "milliseconds": "ms",
    "seconds": "s",
    "minutes": "min",
    "get": "GET",
    "post": "POST",
    "put": "PUT",
    "delete": "DELETE"
  },

  // Common
  "common": {
    "yes": "Yes",
    "no": "No",
    "enabled": "Enabled",
    "disabled": "Disabled",
    "loading": "Loading...",
    "saving": "Saving...",
    "error": "Error",
    "success": "Success",
    "warning": "Warning",
    "info": "Info",
    "close": "Close",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "view": "View",
    "add": "Add",
    "remove": "Remove",
    "search": "Search",
    "filter": "Filter",
    "sort": "Sort",
    "refresh": "Refresh",
    "download": "Download",
    "upload": "Upload",
    "export": "Export",
    "import": "Import",
    "settings": "Settings",
    "help": "Help",
    "about": "About",
    "or": "or"
  },

  // Stat Card Info Tooltips
  "stat_info": {
    "gc_gen0_heap": "Generation 0 heap contains short-lived objects",
    "gc_gen1_heap": "Generation 1 heap contains objects that survived Gen 0 collection",
    "gc_gen2_heap": "Generation 2 heap contains long-lived objects",
    "gc_gen0_collections": "Number of Generation 0 garbage collections",
    "gc_gen1_collections": "Number of Generation 1 garbage collections",
    "gc_gen2_collections": "Number of Generation 2 garbage collections (full GC)",
    "gc_mode": "Server GC is optimized for multi-core servers, Workstation GC for client apps",
    "total_heap_size": "Total memory allocated for managed objects across all generations",
    "fragmented_memory": "Memory that is allocated but cannot be used due to fragmentation",
    "memory_load": "Current memory load on the system",
    "high_memory_threshold": "Memory threshold that triggers aggressive garbage collection",
    "latency_mode": "GC latency mode affects how aggressively garbage collection runs",
    "total_pause_time": "Total time the application was paused for garbage collection"
  }
}
