export interface UmbracoMetrics {
  timestamp: Date;
  contentStatistics: ContentStatistics;
  mediaStatistics: MediaStatistics;
  cacheStatistics: CacheStatistics;
  backofficeUsers: BackofficeUserInfo;
}

export interface ContentStatistics {
  totalContentNodes: number;
  publishedNodes: number;
  unpublishedNodes: number;
  trashedNodes: number;
  contentTypeCount: number;
}

export interface MediaStatistics {
  totalMediaItems: number;
  totalMediaSizeMB: number;
  mediaTypeCount: number;
  imagesCount: number;
  documentsCount: number;
}

export interface CacheStatistics {
  memoryCacheEntryCount: number;
  totalCacheHits: number;
  totalCacheMisses: number;
  cacheHitRatio: number;
  nuCacheCount: number;
  nuCacheSizeBytes: number;
  nuCacheSizeMB: number;
  totalCacheSize: string;
}

export interface BackofficeUserInfo {
  activeUsers: number;
  totalUsers: number;
  adminUsers: number;
  currentSessions: number;
}
