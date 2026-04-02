namespace UmbMetrics.Models;

public enum MetricType
{
    CpuUsage,
    MemoryUsage,
    ActiveRequests,
    AverageResponseTime,
    RequestsPerSecond,
    FailedRequests,
    ThreadCount,
    WorkingSetMB,
    PrivateMemoryMB,
    GcTotalMemoryMB
}

public enum ComparisonOperator
{
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual,
    Equal,
    NotEqual
}

public enum ConditionType
{
    Single,
    And,
    Or
}

public enum AlertSeverity
{
    Info,
    Warning,
    Critical
}

public enum AlertStatus
{
    Active,
    Resolved,
    Acknowledged
}

public enum NotificationChannel
{
    Dashboard,
    Email,
    Webhook
}