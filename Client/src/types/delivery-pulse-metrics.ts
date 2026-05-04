export interface DeliveryPulseEndpointStats {
  path: string;
  method: string;
  requestCount: number;
  averageLatencyMs: number;
  maxLatencyMs: number;
  errorCount: number;
  notFoundCount: number;
  averageRequestSizeBytes?: number | null;
  averageResponseSizeBytes?: number | null;
  lastAccessed: string;
}

export interface DeliveryPulseMetrics {
  timestamp: string;
  totalRequests: number;
  totalErrors: number;
  total404s: number;
  averageLatencyMs: number;
  maxLatencyMs: number;
  topEndpoints: DeliveryPulseEndpointStats[];
}
