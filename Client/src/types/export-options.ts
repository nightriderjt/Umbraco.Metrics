



export interface ExportOptions {
  format: string; // e.g. 'csv', 'json', 'xml'
  scope: string;
  startDate?: string; // ISO string
  endDate?: string; // ISO string
  includePerformanceMetrics: boolean;
  includeUmbracoMetrics: boolean;
  includeActiveRequests: boolean;
  timezone: string;
}

export interface ExportResult {
  fileName: string;
  contentType: string;
  data: ArrayBuffer;
  sizeBytes: number;
  generatedAt: string;
}

export interface ExportProgress {
  status: 'idle' | 'preparing' | 'exporting' | 'downloading' | 'complete' | 'error';
  progress: number; // 0-100
  message?: string;
  error?: string;
}