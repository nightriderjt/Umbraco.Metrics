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

 



}