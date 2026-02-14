import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UUIButtonElement } from "@umbraco-cms/backoffice/external/uui";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT, UmbCurrentUserModel } from "@umbraco-cms/backoffice/current-user";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import type { UmbAuthContext } from "@umbraco-cms/backoffice/auth";
import { MetricsPerformanceService } from "../services/metrics-performance.service.js";
import type { PerformanceMetrics } from "../types/performance-metrics.js";
import type { UmbracoMetrics } from "../types/umbraco-metrics.js";

import type { StatRow } from "../components/stat-card.element.js";
import { getStatusColor, formatNumber } from "../utils/format-utils.js";
import "../components/app-info-banner.element.js";
import "../components/metric-card.element.js";
import "../components/metrics-grid.element.js";
import "../components/stat-card.element.js";
import "../components/active-requests-sidebar.element.js";
import "../components/export-modal.element.js";
import stylesString from '../css/dashboard.element.css?inline';
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import { ACTIVE_REQUESTS_SIDEBAR_MODAL } from "../components/active-requests-sidebar.modal.js";
import { UMB_METRICS_EXPORT_MODAL } from "../components/export-modal.token.js";

@customElement("umbmetrics-dashboard")
export class UmbMetrcisDashboardElement extends UmbElementMixin(LitElement) {
  @state()
  private _contextCurrentUser?: UmbCurrentUserModel;

  @state()
  private _performanceMetrics?: PerformanceMetrics;

  @state()
  private _autoRefresh: boolean = false;

  @state()
  private _activeTab: string = "overview";

  @state()
  private _isConnected: boolean = false;

  @state()
  private _umbracoMetrics?: UmbracoMetrics;



  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;
  #authContext?: UmbAuthContext;
  #metricsService?: MetricsPerformanceService;
  #unsubscribe?: () => void;

  constructor() {
    super();

    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (notificationContext) => {
      this.#notificationContext = notificationContext;
    });

    this.consumeContext(UMB_CURRENT_USER_CONTEXT, (currentUserContext) => {
      this.observe(
        currentUserContext?.currentUser,
        (currentUser) => {
          this._contextCurrentUser = currentUser;
        },
        "_contextCurrentUser"
      );
    });

    this.consumeContext(UMB_AUTH_CONTEXT, (authContext) => {
      this.#authContext = authContext;
      
      this.#metricsService = new MetricsPerformanceService(async () => {
        const token = await this.#authContext?.getLatestToken();
        if (!token) {
          throw new Error('No authentication token available');
        }
        return token;
      });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#stopAutoRefresh();
  }

  #onClickRefreshMetrics = async (ev: Event) => {
    if (!this.#metricsService) {
      console.error('Metrics service not initialized');
      return;
    }

    const buttonElement = ev.target as UUIButtonElement;
    buttonElement.state = "waiting";

    try {
      if (this._autoRefresh && this.#metricsService.isConnected) {
        await this.#metricsService.requestMetrics();
        this.#loadUmbracoMetrics();
      } else {
        await Promise.all([
          this.#loadPerformanceMetrics(),
          this.#loadUmbracoMetrics()
        ]);
      }
      buttonElement.state = "success";
    } catch (error) {
      console.error('Error refreshing metrics:', error);
      buttonElement.state = "failed";
    }
  };

  #loadPerformanceMetrics = async () => {
    if (!this.#metricsService) {
      console.error('Metrics service not initialized');
      return;
    }

    try {
      this._performanceMetrics = await this.#metricsService.getPerformanceMetrics();
    } catch (error) {
      console.error("Error loading performance metrics:", error);
      if (this.#notificationContext) {
        this.#notificationContext.peek("danger", {
          data: {
            headline: "Error",
            message: error instanceof Error 
              ? error.message 
              : "Failed to load performance metrics",
          },
        });
      }
    }
  };

  async #loadUmbracoMetrics() {
    if (!this.#metricsService) {
      console.error('Metrics service not initialized');
      return;
    }

    try {
      this._umbracoMetrics = await this.#metricsService.getUmbracoMetrics();
    } catch (error) {
      console.error("Error loading Umbraco metrics:", error);
      if (this.#notificationContext) {
        this.#notificationContext.peek("danger", {
          data: {
            headline: "Error",
            message: error instanceof Error 
              ? error.message 
              : "Failed to load Umbraco metrics",
          },
        });
      }
    }
  }



  


  #openActiveRequestsSidebar = async () => {
    const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
    
    modalManager?.open(
      this, 
      ACTIVE_REQUESTS_SIDEBAR_MODAL   
    );
  }

  #openExportModal = async () => {
    const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
    
    modalManager?.open(
      this, 
      UMB_METRICS_EXPORT_MODAL   
    );
  }
 

  #toggleAutoRefresh = async () => {
    this._autoRefresh = !this._autoRefresh;

    if (this._autoRefresh) {
      await this.#startAutoRefresh();
    } else {
      await this.#stopAutoRefresh();
    }
  };

  #startAutoRefresh = async () => {
    if (!this.#metricsService) {
      console.error('Metrics service not initialized');
      this._autoRefresh = false;
      return;
    }

    try {
      if (this.#notificationContext) {
        this.#notificationContext.peek("default", {
          data: {
            headline: "Connecting...",
            message: "Establishing connection to metrics hub",
          },
        });
      }

      this.#unsubscribe = this.#metricsService.onMetricsUpdate((metrics) => {
        this._performanceMetrics = metrics;
        this._isConnected = true;
      });

      await this.#metricsService.connectToHub();
      this._isConnected = this.#metricsService.isConnected;

      if (this._isConnected && this.#notificationContext) {
        this.#notificationContext.peek("positive", {
          data: {
            headline: "Connected",
            message: "Real-time metrics updates enabled",
          },
        });
      }
    } catch (error) {
      console.error("Error starting auto-refresh:", error);
      this._autoRefresh = false;
      this._isConnected = false;

      if (this.#notificationContext) {
        this.#notificationContext.peek("danger", {
          data: {
            headline: "Connection Failed",
            message: error instanceof Error 
              ? error.message 
              : "Failed to connect to metrics hub. Try again.",
          },
        });
      }

      if (this.#unsubscribe) {
        this.#unsubscribe();
        this.#unsubscribe = undefined;
      }
    }
  };

  #stopAutoRefresh = async () => {
    if (!this.#metricsService) {
      return;
    }

    try {
      if (this.#unsubscribe) {
        this.#unsubscribe();
        this.#unsubscribe = undefined;
      }

      await this.#metricsService.disconnectFromHub();
      this._isConnected = false;

      if (this.#notificationContext) {
        this.#notificationContext.peek("default", {
          data: {
            headline: "Disconnected",
            message: "Real-time updates disabled",
          },
        });
      }
    } catch (error) {
      console.error("Error stopping auto-refresh:", error);
    }
  };

  #switchTab = (tabName: string) => {
    this._activeTab = tabName;
  };

  #renderOverviewTab() {
    if (!this._performanceMetrics) {
      return html`<p>Click "Refresh Metrics" to load application performance data</p>`;
    }

    const m = this._performanceMetrics;

    return html`
      <umbmetrics-app-info-banner
        .applicationInfo=${m.applicationInfo}
        .isConnected=${this._isConnected}
      ></umbmetrics-app-info-banner>

      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-metric-card
          icon="icon-dashboard"
          title="CPU Usage"
          value="${m.cpuUsage.toFixed(1)}%"
          detail="Process CPU"
          color="${getStatusColor(m.cpuUsage, 80)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-memory"
          title="Working Set"
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
          title="Active Requests"
          value="${m.requestMetrics.activeRequests}"
          detail="Total: ${formatNumber(m.requestMetrics.totalRequests)}"
          ?clickable=${true}
          actionLabel="View Details"
          @card-action="${this.#openActiveRequestsSidebar}"
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
          title="Threads"
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
          title="Last Updated"
          value="${new Date(m.timestamp).toLocaleString()}"
        ></umbmetrics-metric-card>
      </umbmetrics-metrics-grid>
    `;
  }

  #renderHeapTab() {
    if (!this._performanceMetrics) {
      return html`<p>Click "Refresh Metrics" to load heap information</p>`;
    }

    const m = this._performanceMetrics;

    const heapStats: StatRow[] = [
      { label: 'Gen 0', value: `${m.memoryUsage.gcGen0HeapSizeMB.toFixed(2)} MB` },
      { label: 'Gen 1', value: `${m.memoryUsage.gcGen1HeapSizeMB.toFixed(2)} MB` },
      { label: 'Gen 2', value: `${m.memoryUsage.gcGen2HeapSizeMB.toFixed(2)} MB` },
    ];

    const collectionStats: StatRow[] = [
      { label: 'Gen 0', value: formatNumber(m.garbageCollectionStats.gen0Collections) },
      { label: 'Gen 1', value: formatNumber(m.garbageCollectionStats.gen1Collections) },
      { label: 'Gen 2', value: formatNumber(m.garbageCollectionStats.gen2Collections) },
    ];

    const gcDetails: StatRow[] = [
      { label: 'GC Mode', value: m.garbageCollectionStats.isServerGC ? "Server" : "Workstation" },
      { label: 'Total Heap Size', value: `${m.memoryUsage.totalHeapSizeMB.toFixed(2)} MB` },
      { label: 'Fragmented Memory', value: `${m.memoryUsage.fragmentedMemoryMB.toFixed(2)} MB` },
      { label: 'Memory Load', value: `${m.garbageCollectionStats.memoryLoadMB.toFixed(2)} MB` },
      { label: 'High Memory Threshold', value: `${m.garbageCollectionStats.highMemoryLoadThresholdMB.toFixed(2)} MB` },
      { label: 'Latency Mode', value: m.garbageCollectionStats.gcLatencyMode },
      { label: 'Total Pause Time', value: `${m.garbageCollectionStats.totalPauseTimeMs.toFixed(2)} ms` },
    ];

    return html`
      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-stat-card
          span="2"
          icon="icon-box"
          title="GC Heap Sizes"
          .stats=${heapStats}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-trash"
          title="GC Collections"
          .stats=${collectionStats}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="4"
          icon="icon-chart"
          title="Garbage Collector Details"
          .stats=${gcDetails}
        ></umbmetrics-stat-card>
      </umbmetrics-metrics-grid>
    `;
  }

  #renderUmbracoTab() {
    if (!this._umbracoMetrics) {
      return html`<p>Click "Refresh Metrics" to load Umbraco-specific data</p>`;
    }

    const m = this._umbracoMetrics;

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
      { label: 'Runtime Cache', value: `${formatNumber(m.cacheStatistics.runtimeCacheCount)} items` },
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

  #renderUtilsTab() {
    return html`
      <div class="utils-tab">
        <h3>Utility Tools</h3>
        <p class="description">Additional tools for managing and exporting metrics data</p>
        
        <div class="utils-grid">
          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-download"></uui-icon>
            </div>
            <div class="util-content">
              <h4>Export Metrics</h4>
              <p>Export performance and Umbraco metrics in various formats (CSV, JSON)</p>
              <uui-button 
                look="primary" 
                color="positive"
                @click="${this.#openExportModal}"
                style="margin-top: 1rem;"
              >
                <uui-icon name="icon-download"></uui-icon>
                Open Export Dialog
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-settings"></uui-icon>
            </div>
            <div class="util-content">
              <h4>Data Management</h4>
              <p>Manage historical metrics data and cleanup options</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-trash"></uui-icon>
                Cleanup Old Data
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-chart"></uui-icon>
            </div>
            <div class="util-content">
              <h4>Advanced Analytics</h4>
              <p>Generate detailed reports and analytics from collected metrics</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-chart"></uui-icon>
                Generate Report
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-alarm-clock"></uui-icon>
            </div>
            <div class="util-content">
              <h4>Scheduled Tasks</h4>
              <p>Schedule automatic exports and data collection tasks</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-time"></uui-icon>
                Schedule Export
              </uui-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  #renderTabContent() {
    switch (this._activeTab) {
      case 'overview':
        return this.#renderOverviewTab();
      case 'heap':
        return this.#renderHeapTab();
      case 'umbraco':
        return this.#renderUmbracoTab();
      case 'utils':
        return this.#renderUtilsTab();
      default:
        return this.#renderOverviewTab();
    }
  }

  render() {
    return html`
      <uui-box headline="Application Performance Metrics" class="wide">
        <div slot="header">[.NET 10 Application - Real-time Metrics${this._contextCurrentUser?.name ? ` - ${this._contextCurrentUser.name}` : ''}]</div>

        <div class="metrics-controls">
          <uui-button color="default" look="primary" @click="${this.#onClickRefreshMetrics}">
            <uui-icon name="icon-refresh"></uui-icon> Refresh Metrics
          </uui-button>

          <uui-toggle
            label="Real-time Updates (SignalR)"
            .checked="${this._autoRefresh}"
            @change="${this.#toggleAutoRefresh}"
          ></uui-toggle>

          ${this._isConnected ? html`
            <span class="connection-status connected">
              <uui-icon name="icon-check"></uui-icon> Connected
            </span>
          ` : this._autoRefresh ? html`
            <span class="connection-status connecting">
              <uui-icon name="icon-time"></uui-icon> Connecting...
            </span>
          ` : ''}
        </div>

        <div class="tab-navigation">
          <uui-button 
            look="${this._activeTab === 'overview' ? 'primary' : 'default'}"
            color="${this._activeTab === 'overview' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('overview')}"
          >
            <uui-icon name="icon-chart"></uui-icon> Overview
          </uui-button>
          <uui-button 
            look="${this._activeTab === 'heap' ? 'primary' : 'default'}"
            color="${this._activeTab === 'heap' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('heap')}"
          >
            <uui-icon name="icon-box"></uui-icon> Heap & GC
          </uui-button>
          <uui-button 
            look="${this._activeTab === 'umbraco' ? 'primary' : 'default'}"
            color="${this._activeTab === 'umbraco' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('umbraco')}"
          >
            <uui-icon name="icon-umbraco"></uui-icon> Umbraco
          </uui-button>
          <uui-button 
            look="${this._activeTab === 'utils' ? 'primary' : 'default'}"
            color="${this._activeTab === 'utils' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('utils')}"
          >
            <uui-icon name="icon-settings"></uui-icon> Utils
          </uui-button>
        </div>

        <div class="tab-content">
          ${this.#renderTabContent()}
        </div>
      </uui-box>
          `;
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default UmbMetrcisDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-dashboard": UmbMetrcisDashboardElement;
  }
}
