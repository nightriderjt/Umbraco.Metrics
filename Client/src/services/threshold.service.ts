import type { 
    ThresholdRule, 
    ThresholdAlert, 
    ThresholdAlertStats, 
    ThresholdTestResult,
    EmailNotificationSettings,
    WebhookEndpoint,
    WebhookTestResult,
    AcknowledgeAlertRequest,
    ResolveAlertRequest,
    TestEmailRequest
} from '../types/threshold-models.js';

export class ThresholdService {
    private baseUrl = '/umbraco/management/api/v1/metrics/thresholds';
    private getAuthToken: () => Promise<string>;

    constructor(getAuthToken: () => Promise<string>) {
        this.getAuthToken = getAuthToken;
    }

    private async fetchWithAuth(url: string, options: RequestInit = {}) {
        const token = await this.getAuthToken();
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers
        };

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ 
                title: 'Request failed', 
                detail: `HTTP ${response.status}: ${response.statusText}` 
            }));
            throw new Error(error.detail || error.title || 'Request failed');
        }

        return response.json();
    }

    // Threshold Rules
    async getThresholdRules(): Promise<ThresholdRule[]> {
        return this.fetchWithAuth(`${this.baseUrl}/rules`);
    }

    async getThresholdRule(id: number): Promise<ThresholdRule> {
        return this.fetchWithAuth(`${this.baseUrl}/rules/${id}`);
    }

    async createThresholdRule(rule: Omit<ThresholdRule, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>): Promise<ThresholdRule> {
        return this.fetchWithAuth(`${this.baseUrl}/rules`, {
            method: 'POST',
            body: JSON.stringify(rule)
        });
    }

    async updateThresholdRule(id: number, rule: Partial<ThresholdRule>): Promise<ThresholdRule> {
        return this.fetchWithAuth(`${this.baseUrl}/rules/${id}`, {
            method: 'PUT',
            body: JSON.stringify(rule)
        });
    }

    async deleteThresholdRule(id: number): Promise<boolean> {
        await this.fetchWithAuth(`${this.baseUrl}/rules/${id}`, {
            method: 'DELETE'
        });
        return true;
    }

    async testThresholdRule(rule: ThresholdRule): Promise<ThresholdTestResult> {
        return this.fetchWithAuth(`${this.baseUrl}/rules/test`, {
            method: 'POST',
            body: JSON.stringify(rule)
        });
    }

    // Threshold Alerts
    async getActiveAlerts(): Promise<ThresholdAlert[]> {
        return this.fetchWithAuth(`${this.baseUrl}/alerts/active`);
    }

    async acknowledgeAlert(id: number, request: AcknowledgeAlertRequest): Promise<boolean> {
        await this.fetchWithAuth(`${this.baseUrl}/alerts/${id}/acknowledge`, {
            method: 'POST',
            body: JSON.stringify(request)
        });
        return true;
    }

    async resolveAlert(id: number, request: ResolveAlertRequest): Promise<boolean> {
        await this.fetchWithAuth(`${this.baseUrl}/alerts/${id}/resolve`, {
            method: 'POST',
            body: JSON.stringify(request)
        });
        return true;
    }

    async getAlertStats(): Promise<ThresholdAlertStats> {
        return this.fetchWithAuth(`${this.baseUrl}/alerts/stats`);
    }

    // Email Notifications
    async getEmailSettings(): Promise<EmailNotificationSettings> {
        return this.fetchWithAuth(`${this.baseUrl}/notifications/email/settings`);
    }

    async updateEmailSettings(settings: EmailNotificationSettings): Promise<EmailNotificationSettings> {
        return this.fetchWithAuth(`${this.baseUrl}/notifications/email/settings`, {
            method: 'PUT',
            body: JSON.stringify(settings)
        });
    }

    async testEmailConfiguration(request: TestEmailRequest): Promise<boolean> {
        const result = await this.fetchWithAuth(`${this.baseUrl}/notifications/email/test`, {
            method: 'POST',
            body: JSON.stringify(request)
        });
        return result.success;
    }

    // Webhook Notifications
    async getWebhookEndpoints(): Promise<WebhookEndpoint[]> {
        return this.fetchWithAuth(`${this.baseUrl}/notifications/webhooks`);
    }

    async createWebhookEndpoint(endpoint: Omit<WebhookEndpoint, 'id' | 'createdAt' | 'updatedAt'>): Promise<WebhookEndpoint> {
        return this.fetchWithAuth(`${this.baseUrl}/notifications/webhooks`, {
            method: 'POST',
            body: JSON.stringify(endpoint)
        });
    }

    async updateWebhookEndpoint(id: number, endpoint: Partial<WebhookEndpoint>): Promise<WebhookEndpoint> {
        return this.fetchWithAuth(`${this.baseUrl}/notifications/webhooks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(endpoint)
        });
    }

    async deleteWebhookEndpoint(id: number): Promise<boolean> {
        await this.fetchWithAuth(`${this.baseUrl}/notifications/webhooks/${id}`, {
            method: 'DELETE'
        });
        return true;
    }

    async testWebhookEndpoint(endpoint: WebhookEndpoint): Promise<WebhookTestResult> {
        return this.fetchWithAuth(`${this.baseUrl}/notifications/webhooks/test`, {
            method: 'POST',
            body: JSON.stringify(endpoint)
        });
    }

    // Helper methods
    getMetricDisplayName(metricType: string): string {
        const metricNames: Record<string, string> = {
            'cpu_usage': 'CPU Usage',
            'memory_usage': 'Memory Usage',
            'active_requests': 'Active Requests',
            'average_response_time': 'Average Response Time',
            'requests_per_second': 'Requests Per Second',
            'failed_requests': 'Failed Requests',
            'thread_count': 'Thread Count',
            'gc_memory_load': 'GC Memory Load',
            'total_heap_size': 'Total Heap Size'
        };
        return metricNames[metricType] || metricType;
    }

    getOperatorDisplayName(operator: string): string {
        const operatorNames: Record<string, string> = {
            'greater_than': '>',
            'greater_than_or_equal': '≥',
            'less_than': '<',
            'less_than_or_equal': '≤',
            'equal': '=',
            'not_equal': '≠'
        };
        return operatorNames[operator] || operator;
    }

    getSeverityColor(severity: string): string {
        const severityColors: Record<string, string> = {
            'low': 'positive',
            'medium': 'warning',
            'high': 'danger',
            'critical': 'danger'
        };
        return severityColors[severity] || 'default';
    }

    formatCondition(condition: any): string {
        if (!condition) return '';
        
        if (condition.conditionType === 'combined' && condition.subConditions) {
            const subConditions = condition.subConditions.map((sub: any) => 
                this.formatCondition(sub)
            ).join(` ${condition.combinationOperator === 'and' ? 'AND' : 'OR'} `);
            return `(${subConditions})`;
        }
        
        const metricName = this.getMetricDisplayName(condition.metricType);
        const operator = this.getOperatorDisplayName(condition.operator);
        const duration = condition.durationSeconds > 0 ? 
            ` for ${condition.durationSeconds}s` : '';
        
        return `${metricName} ${operator} ${condition.value}${duration}`;
    }
}