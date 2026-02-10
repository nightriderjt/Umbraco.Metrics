export interface ActiveRequestInfo {
  requestId: string;
  path: string;
  method: string;
  startTime: string;
  durationMs: number;
  queryString: string;
  userAgent: string;
  remoteIp: string;
}