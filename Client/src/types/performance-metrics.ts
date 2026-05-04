import { DeliveryPulseMetrics } from "./delivery-pulse-metrics";

export interface SqlStackTrace {
  caller?: string;
  method?: string;
  fileName?: string;
  lineNumber: number;
  child?: SqlStackTrace;
}

export interface SqlOperation {
  operationKey: string;
  operationValue?: string;
  queryHash?: string;
  startCommand: string;
  endCommand: string;
  success?: boolean;
  error?: string;
  duration: number; // TimeSpan serialized as ISO 8601 duration string
  hasStackTrace?: boolean;
}

export interface PerformanceMetrics {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: MemoryMetrics;
  threadInfo: ThreadInfo;
  garbageCollectionStats: GarbageCollectionMetrics;
  requestMetrics: RequestMetrics;
  applicationInfo: ApplicationInfo;
  sqlOperations: SqlOperation[];
  deliveryPulse: DeliveryPulseMetrics;
}

export interface MemoryMetrics {
  workingSetMB: number;
  privateMemoryMB: number;
  virtualMemoryMB: number;
  gcTotalMemoryMB: number;
  gcGen0HeapSizeMB: number;
  gcGen1HeapSizeMB: number;
  gcGen2HeapSizeMB: number;
  totalHeapSizeMB: number;
  fragmentedMemoryMB: number;
}

export interface ThreadInfo {
  threadCount: number;
  threadPoolThreadCount: number;
  completedWorkItemCount: number;
  pendingWorkItemCount: number;
}

export interface GarbageCollectionMetrics {
  gen0Collections: number;
  gen1Collections: number;
  gen2Collections: number;
  totalMemoryMB: number;
  fragmentedMemoryMB: number;
  totalAvailableMemoryMB: number;
  highMemoryLoadThresholdMB: number;
  memoryLoadMB: number;
  isServerGC: boolean;
  gcLatencyMode: string;
  totalPauseTimeMs: number;
}

export interface RequestMetrics {
  totalRequests: number;
  requestsPerSecond: number;
  averageResponseTimeMs: number;
  activeRequests: number;
  failedRequests: number;
  lastMinuteRequests: number;
}

export interface ApplicationInfo {
  processId: number;
  processName: string;
  is64BitProcess: boolean;
  is64BitOperatingSystem: boolean;
  processorCount: number;
  dotNetVersion: string;
  runtimeVersion: string;
  machineName: string;
  userName: string;
  uptimeSeconds: number;
  startTime: string;
}
