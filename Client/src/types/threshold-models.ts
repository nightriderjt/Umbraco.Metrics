export enum ThresholdMetricType {
    CpuUsage = 'cpu_usage',
    MemoryUsage = 'memory_usage',
    ActiveRequests = 'active_requests',
    AverageResponseTime = 'average_response_time',
    RequestsPerSecond = 'requests_per_second',
    FailedRequests = 'failed_requests',
    ThreadCount = 'thread_count',
    GcMemoryLoad = 'gc_memory_load',
    TotalHeapSize = 'total_heap_size'
}

export enum ThresholdOperator {
    GreaterThan = 'greater_than',
    GreaterThanOrEqual = 'greater_than_or_equal',
    LessThan = 'less_than',
    LessThanOrEqual = 'less_than_or_equal',
    Equal = 'equal',
    NotEqual = 'not_equal'
}

export enum ThresholdConditionType {
    Single = 'single',
    Combined = 'combined'
}

export enum ThresholdCombinationOperator {
    And = 'and',
    Or = 'or'
}

export enum ThresholdSeverity {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
    Critical = 'critical'
}

export enum ThresholdAlertStatus {
    Active = 'active',
    Acknowledged = 'acknowledged'  
}

export interface ThresholdCondition {
    id: number;
    metricType: ThresholdMetricType;
    operator: ThresholdOperator;
    value: number;
    durationSeconds: number;
    conditionType: ThresholdConditionType;
    combinationOperator?: ThresholdCombinationOperator;
    subConditions?: ThresholdCondition[];
}

export interface ThresholdRule {
    id: number;
    name: string;
    description?: string;
    conditions: ThresholdCondition[];
    severity: ThresholdSeverity;
    isEnabled: boolean;
    notificationChannels: string[];
    cooldownMinutes: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}

export interface ThresholdAlert {
    id: number;
    ruleId: number;
    ruleName: string;
    severity: ThresholdSeverity;
    message: string;
    triggeredValuesJson: string;
    thresholdValue: number;
    triggeredAt: Date;
    acknowledgedAt?: Date;
    acknowledgedBy?: string;   
    status: ThresholdAlertStatus;
    metadata?: Record<string, any>;
}

export interface ThresholdAlertStats {
    totalAlerts: number;
    activeAlerts: number;
    acknowledgedAlerts: number;   
    bySeverity: Record<string, number>;
    last24Hours: number;
    last7Days: number;
}
export interface AcknowledgeAlertRequest {
    acknowledgedBy: string;
}



