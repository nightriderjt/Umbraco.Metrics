import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { PerformanceMetrics } from "../../types/performance-metrics.js";
import { getStatusColor, formatNumber } from "../../utils/format-utils.js";
import "../../components/app-info-banner.element.js";
import "../../components/metric-card.element.js";
import "../../components/metrics-grid.element.js";
import stylesString from '../../css/dashboard.element.css?inline';

@customElement("umbmetrics-overview-tab")
export class UmbMetricsOverviewTabElement extends UmbElementMixin(LitElement) {
  @property({ type: Object, attribute: false })
  performanceMetrics?: PerformanceMetrics;

  @property({ type: Boolean, attribute: false })
  isConnected: boolean = false;

  render() {
    if (!this.performanceMetrics) {
      return html`<p>${this.localize?.term('dashboard_clickToLoadPerformance') || 'Click "Refresh Metrics" to load application performance data'}</p>`;
    }

    const m = this.performanceMetrics;

    return html`
      <umbmetrics-app-info-banner
        .applicationInfo=${m.applicationInfo}
        .isConnected=${this.isConnected}
      ></umbmetrics-app-info-banner>

      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-metric-card
          icon="icon-dashboard"
          title="${this.localize?.term('metrics_cpuUsage') || 'CPU Usage'}"
          value="${m.cpuUsage.toFixed(1)}%"
          detail="Process CPU"
          color="${getStatusColor(m.cpuUsage, 80)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-memory"
          title="${this.localize?.term('metrics_memoryUsage') || 'Memory Usage'}"
          value="${m.memoryUsage.workingSetMB.toFixed(0)} MB"
          detail="Private: ${m.memoryUsage.privateMemoryMB.toFixed(0)} MB"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-activity"
          title="Requests/Sec"
          value="${m.requestMetrics.requestsPerSecond.toFixed(2)}"
          detail="Last min: ${m.requestMetrics.lastMinuteRequests}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-timer"
          title="Avg Response"
          value="${m.requestMetrics.averageResponseTimeMs.toFixed(0)} ms"
          detail="Last 100 requests"
          color="${getStatusColor(m.requestMetrics.averageResponseTimeMs, 1000)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-link"
          title="${this.localize?.term('metrics_activeRequests') || 'Active Requests'}"
          value="${m.requestMetrics.activeRequests}"
          detail="Total: ${formatNumber(m.requestMetrics.totalRequests)}"
          ?clickable=${true}
          actionLabel="View Details"
          @card-action="${this.#onOpenActiveRequests}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-alert"
          title="Failed Requests"
          value="${formatNumber(m.requestMetrics.failedRequests)}"
          detail="4xx/5xx responses"
          color="${m.requestMetrics.failedRequests > 0 ? 'danger' : 'positive'}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-nodes"
          title="${this.localize?.term('metrics_threadCount') || 'Thread Count'}"
          value="${m.threadInfo.threadCount}"
          detail="Pool: ${m.threadInfo.threadPoolThreadCount}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-list"
          title="Work Items"
          value="${m.threadInfo.pendingWorkItemCount}"
          detail="Completed: ${formatNumber(m.threadInfo.completedWorkItemCount)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          span="4"
          icon="icon-calendar"
          title="${this.localize?.term('dashboard_lastUpdated') || 'Last updated'}"
          value="${new Date(m.timestamp).toLocaleString()}"
        ></umbmetrics-metric-card>
      </umbmetrics-metrics-grid>
    `;
  }

  #onOpenActiveRequests() {
    this.dispatchEvent(new CustomEvent('open-active-requests', { bubbles: true, composed: true }));
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default UmbMetricsOverviewTabElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-overview-tab": UmbMetricsOverviewTabElement;
  }
}
