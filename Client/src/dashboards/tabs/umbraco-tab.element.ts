import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { UmbracoMetrics } from "../../types/umbraco-metrics.js";
import type { StatRow } from "../../components/stat-card.element.js";
import { formatNumber } from "../../utils/format-utils.js";
import "../../components/metric-card.element.js";
import "../../components/metrics-grid.element.js";
import "../../components/stat-card.element.js";
import stylesString from '../../css/dashboard.element.css?inline';

@customElement("umbmetrics-umbraco-tab")
export class UmbMetricsUmbracoTabElement extends UmbElementMixin(LitElement) {
  @property({ type: Object, attribute: false })
  umbracoMetrics?: UmbracoMetrics;

  render() {
    if (!this.umbracoMetrics) {
      return html`<p>${this.localize?.term('dashboard_clickToLoadUmbraco') || 'Click "Refresh Metrics" to load Umbraco-specific data'}</p>`;
    }

    const m = this.umbracoMetrics;

    const contentStats: StatRow[] = [
      { label: 'Total Nodes', value: formatNumber(m.contentStatistics.totalContentNodes) },
      { label: 'Published', value: formatNumber(m.contentStatistics.publishedNodes), color: 'positive' },
      { label: 'Unpublished', value: formatNumber(m.contentStatistics.unpublishedNodes), color: 'warning' },
      { label: 'Trashed', value: formatNumber(m.contentStatistics.trashedNodes), color: m.contentStatistics.trashedNodes > 0 ? 'danger' : 'positive' },
      { label: 'Content Types', value: m.contentStatistics.contentTypeCount },
    ];

    const mediaStats: StatRow[] = [
      { label: 'Total Items', value: formatNumber(m.mediaStatistics.totalMediaItems) },
      { label: 'Total Size', value: `${m.mediaStatistics.totalMediaSizeMB.toFixed(2)} MB` },
      { label: 'Images', value: formatNumber(m.mediaStatistics.imagesCount) },
      { label: 'Documents', value: formatNumber(m.mediaStatistics.documentsCount) },
      { label: 'Media Types', value: m.mediaStatistics.mediaTypeCount },
    ];

    const cacheStats: StatRow[] = [
      { label: 'Memory Cache', value: `${formatNumber(m.cacheStatistics.memoryCacheEntryCount)} entries` },
      { label: 'Cache Hit Ratio', value: `${(m.cacheStatistics.cacheHitRatio * 100).toFixed(1)}%` },
      { label: 'NuCache', value: `${formatNumber(m.cacheStatistics.nuCacheCount)} items` },
      { label: 'Total Size', value: m.cacheStatistics.totalCacheSize },
    ];

    const userStats: StatRow[] = [
      { label: 'Total Users', value: formatNumber(m.backofficeUsers.totalUsers) },
      { label: 'Active Users', value: formatNumber(m.backofficeUsers.activeUsers), color: 'positive' },
      { label: 'Administrators', value: formatNumber(m.backofficeUsers.adminUsers) },
      { label: 'Current Sessions', value: formatNumber(m.backofficeUsers.currentSessions), color: m.backofficeUsers.currentSessions > 0 ? 'positive' : 'default' },
    ];

    return html`
      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-stat-card
          span="2"
          icon="icon-document"
          title="Content Statistics"
          .stats=${contentStats}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-picture"
          title="Media Library"
          .stats=${mediaStats}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-server-alt"
          title="Cache Performance"
          .stats=${cacheStats}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-users"
          title="Backoffice Users"
          .stats=${userStats}
        ></umbmetrics-stat-card>
      </umbmetrics-metrics-grid>
    `;
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default UmbMetricsUmbracoTabElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-umbraco-tab": UmbMetricsUmbracoTabElement;
  }
}
