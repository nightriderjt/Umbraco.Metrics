import type { MetricCardColor } from "../components/metric-card.element.js";

/**
 * Returns a color based on value relative to threshold
 * @param value - The current value
 * @param threshold - The threshold for danger state
 * @returns 'danger' if > threshold, 'warning' if > 70% of threshold, otherwise 'positive'
 */
export function getStatusColor(value: number, threshold: number): MetricCardColor {
  return value > threshold
    ? "danger"
    : value > threshold * 0.7
    ? "warning"
    : "positive";
}

/**
 * Formats a number with locale-specific separators
 * @param num - The number to format
 * @returns Formatted string with separators (e.g., "1,234,567")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Formats bytes to human-readable string
 * @param bytes - Number of bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

/**
 * Formats uptime seconds to human-readable string
 * @param seconds - Total seconds
 * @returns Formatted string (e.g., "2d 5h 30m 15s")
 */
export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}