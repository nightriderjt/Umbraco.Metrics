import { ExportOptions } from '../types/export-options.js';

export class MetricsExportService {
  private readonly API_BASE_URL = '/umbraco/management/api/v1/metrics';

  constructor(private tokenProvider: () => Promise<string>) {}

  /**
   * Export metrics with custom options
   */
  async exportMetrics(options: ExportOptions): Promise<void> {
    const token = await this.tokenProvider();
    
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(`${this.API_BASE_URL}/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const error = await response.json();
        throw new Error(error.detail || 'Invalid export configuration');
      }
      
      throw new Error(
        `Failed to export metrics: ${response.status} ${response.statusText}`
      );
    }

    // Trigger file download
    await this.downloadFile(response);
  }

  /**
   * Export performance metrics only
   */
  async exportPerformanceMetrics(format: string = 'json'): Promise<void> {
    const token = await this.tokenProvider();
    
    const response = await fetch(
      `${this.API_BASE_URL}/export/performance?format=${format}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to export performance metrics: ${response.statusText}`);
    }

    await this.downloadFile(response);
  }

  /**
   * Export Umbraco metrics only
   */
  async exportUmbracoMetrics(format: string='json'): Promise<void> {
    const token = await this.tokenProvider();
    
    const response = await fetch(
      `${this.API_BASE_URL}/export/umbraco?format=${format}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to export Umbraco metrics: ${response.statusText}`);
    }

    await this.downloadFile(response);
  }

  /**
   * Quick export with default options
   */
  async quickExport(
    includePerformance: boolean = true,
    includeUmbraco: boolean = true,
    format: string ='csv'
  ): Promise<void> {
    const options: ExportOptions = {
      format,
      scope: 'current',
      includePerformanceMetrics: includePerformance,
      includeUmbracoMetrics: includeUmbraco,
      includeActiveRequests: false,
      timezone: 'UTC'
    };

    await this.exportMetrics(options);
  }

  /**
   * Download file from response
   */
  private async downloadFile(response: Response): Promise<void> {
    // Get filename from Content-Disposition header or generate one
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'metrics-export';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }

    // Get blob and create download link
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
  a.target = '_blank';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  /**
   * Get file size estimate for export
   */
  estimateFileSize(options: ExportOptions): string {
    // Simple estimation based on format and included metrics
    let estimatedSize = 0;
    
    // Base size for current snapshot
    if (options.includePerformanceMetrics) estimatedSize += 5; // ~5KB for performance metrics
    if (options.includeUmbracoMetrics) estimatedSize += 3; // ~3KB for Umbraco metrics
    if (options.includeActiveRequests) estimatedSize += 2; // ~2KB for active requests
    
    // Adjust for historical data
    if (options.scope === 'historical' || options.scope === 'custom') {
      // Historical data is much larger - estimate based on number of records
      // Assume ~1KB per performance metric record for historical data
      if (options.includePerformanceMetrics) {
        // For historical scope, estimate last 30 days with 5-second intervals
        if (options.scope === 'historical') {
          estimatedSize += 30 * 24 * 60 * 60 / 5 * 1; // 30 days * 24 hours * 60 minutes * 60 seconds / 5 second intervals * 1KB
        } else if (options.scope === 'custom' && options.startDate && options.endDate) {
          // For custom scope, estimate based on date range
          const start = new Date(options.startDate);
          const end = new Date(options.endDate);
          const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
          estimatedSize += days * 24 * 60 * 60 / 5 * 1; // days * 24 hours * 60 minutes * 60 seconds / 5 second intervals * 1KB
        }
      }
      
      // Note: Historical Umbraco metrics not implemented yet
      if (options.includeUmbracoMetrics) {
        estimatedSize += 0; // No historical Umbraco metrics storage yet
      }
    }
    
    // Format multipliers
    switch (options.format) {
      case 'json':
        estimatedSize *= 1.2; // JSON is slightly larger
        break;
      case 'csv':
        estimatedSize *= 0.8; // CSV is more compact
        break;
      case 'xml':
        estimatedSize *= 1.5; // XML has more markup
        break;
    }
    
    if (estimatedSize < 1) {
      return '< 1 KB';
    } else if (estimatedSize < 1024) {
      return `${Math.round(estimatedSize)} KB`;
    } else if (estimatedSize < 1024 * 1024) {
      return `${(estimatedSize / 1024).toFixed(1)} MB`;
    } else {
      return `${(estimatedSize / (1024 * 1024)).toFixed(1)} GB`;
    }
  }



}