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
import stylesString from './dashboard.element.css?inline';

@customElement("umbmetrics-dashboard")
export class ExampleDashboardElement extends UmbElementMixin(LitElement) {
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
      
      // Initialize metrics service with token provider
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
        // Request update through SignalR
        await this.#metricsService.requestMetrics();
      } else {
        // Direct HTTP request
        await this.#loadPerformanceMetrics();
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
      // Show connecting state
      if (this.#notificationContext) {
        this.#notificationContext.peek("default", {
          data: {
            headline: "Connecting...",
            message: "Establishing connection to metrics hub",
          },
        });
      }

      // Subscribe to metrics updates FIRST
      this.#unsubscribe = this.#metricsService.onMetricsUpdate((metrics) => {
        this._performanceMetrics = metrics;
        this._isConnected = true;
      });

      // Then connect to SignalR hub
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

      // Cleanup on failure
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
      // Unsubscribe from updates
      if (this.#unsubscribe) {
        this.#unsubscribe();
        this.#unsubscribe = undefined;
      }

      // Disconnect from hub
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

  #getStatusColor(value: number, threshold: number): string {
    return value > threshold
      ? "danger"
      : value > threshold * 0.7
      ? "warning"
      : "positive";
  }

  #formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  }

  #formatNumber(num: number): string {
    return num.toLocaleString();
  }

  #switchTab = (tabName: string) => {
    this._activeTab = tabName;
  };

  #renderOverviewTab() {
    if (!this._performanceMetrics) {
      return html`<p>Click "Refresh Metrics" to load application performance data</p>`;
    }

    return html`
      <!-- Application Info Banner -->
      <div class="app-info-banner">
        <div class="info-item">
          <strong>Process:</strong> ${this._performanceMetrics.applicationInfo.processName} (PID: ${this._performanceMetrics.applicationInfo.processId})
        </div>
        <div class="info-item">
          <strong>Runtime:</strong> ${this._performanceMetrics.applicationInfo.runtimeVersion}
        </div>
        <div class="info-item">
          <strong>Architecture:</strong> ${this._performanceMetrics.applicationInfo.is64BitProcess ? "64-bit" : "32-bit"}
        </div>
        <div class="info-item">
          <strong>CPU Cores:</strong> ${this._performanceMetrics.applicationInfo.processorCount}
        </div>
        <div class="info-item">
          <strong>Uptime:</strong> ${this.#formatUptime(this._performanceMetrics.applicationInfo.uptimeSeconds)}
        </div>
        ${this._isConnected ? html`
          <div class="info-item connected">
            <uui-icon name="icon-check"></uui-icon>
            <strong>SignalR Connected</strong>
          </div>
        ` : ''}
      </div>

      <div class="metrics-grid">
        <!-- CPU Usage -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-dashboard"></uui-icon>
            <h3>CPU Usage</h3>
            <div class="metric-value ${this.#getStatusColor(this._performanceMetrics.cpuUsage, 80)}">
              ${this._performanceMetrics.cpuUsage.toFixed(1)}%
            </div>
            <div class="metric-detail">Process CPU</div>
          </div>
        </uui-box>

        <!-- Memory Usage -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-memory"></uui-icon>
            <h3>Working Set</h3>
            <div class="metric-value">
              ${this._performanceMetrics.memoryUsage.workingSetMB.toFixed(0)} MB
            </div>
            <div class="metric-detail">
              Private: ${this._performanceMetrics.memoryUsage.privateMemoryMB.toFixed(0)} MB
            </div>
          </div>
        </uui-box>

        <!-- Requests Per Second -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-activity"></uui-icon>
            <h3>Requests/Sec</h3>
            <div class="metric-value">
              ${this._performanceMetrics.requestMetrics.requestsPerSecond.toFixed(2)}
            </div>
            <div class="metric-detail">
              Last min: ${this._performanceMetrics.requestMetrics.lastMinuteRequests}
            </div>
          </div>
        </uui-box>

        <!-- Response Time -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-timer"></uui-icon>
            <h3>Avg Response</h3>
            <div class="metric-value ${this.#getStatusColor(this._performanceMetrics.requestMetrics.averageResponseTimeMs, 1000)}">
              ${this._performanceMetrics.requestMetrics.averageResponseTimeMs.toFixed(0)} ms
            </div>
            <div class="metric-detail">Last 1000 requests</div>
          </div>
        </uui-box>

        <!-- Active Requests -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-link"></uui-icon>
            <h3>Active Requests</h3>
            <div class="metric-value">
              ${this._performanceMetrics.requestMetrics.activeRequests}
            </div>
            <div class="metric-detail">
              Total: ${this.#formatNumber(this._performanceMetrics.requestMetrics.totalRequests)}
            </div>
          </div>
        </uui-box>

        <!-- Failed Requests -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-alert"></uui-icon>
            <h3>Failed Requests</h3>
            <div class="metric-value ${this._performanceMetrics.requestMetrics.failedRequests > 0 ? 'danger' : 'positive'}">
              ${this.#formatNumber(this._performanceMetrics.requestMetrics.failedRequests)}
            </div>
            <div class="metric-detail">4xx/5xx responses</div>
          </div>
        </uui-box>

        <!-- Thread Count -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-nodes"></uui-icon>
            <h3>Threads</h3>
            <div class="metric-value">
              ${this._performanceMetrics.threadInfo.threadCount}
            </div>
            <div class="metric-detail">
              Pool: ${this._performanceMetrics.threadInfo.threadPoolThreadCount}
            </div>
          </div>
        </uui-box>

        <!-- Thread Pool Work Items -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-list"></uui-icon>
            <h3>Work Items</h3>
            <div class="metric-value">
              ${this._performanceMetrics.threadInfo.pendingWorkItemCount}
            </div>
            <div class="metric-detail">
              Completed: ${this.#formatNumber(this._performanceMetrics.threadInfo.completedWorkItemCount)}
            </div>
          </div>
        </uui-box>

        <!-- Timestamp -->
        <uui-box class="span-4">
          <div class="metric-card">
            <uui-icon name="icon-calendar"></uui-icon>
            <h3>Last Updated</h3>
            <div class="metric-detail">
              ${new Date(this._performanceMetrics.timestamp).toLocaleString()}
            </div>
          </div>
        </uui-box>
      </div>
    `;
  }

  #renderHeapTab() {
    if (!this._performanceMetrics) {
      return html`<p>Click "Refresh Metrics" to load heap information</p>`;
    }

    return html`
      <div class="metrics-grid">
        <!-- GC Heap Sizes -->
        <uui-box class="span-2">
          <div class="metric-card">
            <uui-icon name="icon-box"></uui-icon>
            <h3>GC Heap Sizes</h3>
            <div class="gc-stats">
              <div>
                <div class="gc-label">Gen 0</div>
                <div class="gc-value">${this._performanceMetrics.memoryUsage.gcGen0HeapSizeMB.toFixed(2)} MB</div>
              </div>
              <div>
                <div class="gc-label">Gen 1</div>
                <div class="gc-value">${this._performanceMetrics.memoryUsage.gcGen1HeapSizeMB.toFixed(2)} MB</div>
              </div>
              <div>
                <div class="gc-label">Gen 2</div>
                <div class="gc-value">${this._performanceMetrics.memoryUsage.gcGen2HeapSizeMB.toFixed(2)} MB</div>
              </div>
            </div>
          </div>
        </uui-box>

        <!-- GC Collections -->
        <uui-box class="span-2">
          <div class="metric-card">
            <uui-icon name="icon-trash"></uui-icon>
            <h3>GC Collections</h3>
            <div class="gc-stats">
              <div>
                <div class="gc-label">Gen 0</div>
                <div class="gc-value">${this.#formatNumber(this._performanceMetrics.garbageCollectionStats.gen0Collections)}</div>
              </div>
              <div>
                <div class="gc-label">Gen 1</div>
                <div class="gc-value">${this.#formatNumber(this._performanceMetrics.garbageCollectionStats.gen1Collections)}</div>
              </div>
              <div>
                <div class="gc-label">Gen 2</div>
                <div class="gc-value">${this.#formatNumber(this._performanceMetrics.garbageCollectionStats.gen2Collections)}</div>
              </div>
            </div>
          </div>
        </uui-box>

        <!-- GC Memory Details -->
        <uui-box class="span-4">
          <div class="metric-card">
            <uui-icon name="icon-chart"></uui-icon>
            <h3>Garbage Collector Details</h3>
            <div class="gc-details">
              <div class="gc-detail-row">
                <span>GC Mode:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.isServerGC ? "Server" : "Workstation"}</strong>
              </div>
              <div class="gc-detail-row">
                <span>Total Heap Size:</span>
                <strong>${this._performanceMetrics.memoryUsage.totalHeapSizeMB.toFixed(2)} MB</strong>
              </div>
              <div class="gc-detail-row">
                <span>Fragmented Memory:</span>
                <strong>${this._performanceMetrics.memoryUsage.fragmentedMemoryMB.toFixed(2)} MB</strong>
              </div>
              <div class="gc-detail-row">
                <span>Memory Load:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.memoryLoadMB.toFixed(2)} MB</strong>
              </div>
              <div class="gc-detail-row">
                <span>High Memory Threshold:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.highMemoryLoadThresholdMB.toFixed(2)} MB</strong>
              </div>
              <div class="gc-detail-row">
                <span>Latency Mode:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.gcLatencyMode}</strong>
              </div>
              <div class="gc-detail-row">
                <span>Total Pause Time:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.totalPauseTimeMs.toFixed(2)} ms</strong>
              </div>
            </div>
          </div>
        </uui-box>
      </div>
    `;
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

        <!-- Custom Tab Navigation -->
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
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          ${this._activeTab === 'overview' ? this.#renderOverviewTab() : this.#renderHeapTab()}
        </div>
      </uui-box>
    `;
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default ExampleDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-dashboard": ExampleDashboardElement;
  }
}
