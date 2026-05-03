import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT, UmbCurrentUserModel } from "@umbraco-cms/backoffice/current-user";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import type { UmbAuthContext } from "@umbraco-cms/backoffice/auth";

import { MetricsPerformanceService } from "../services/metrics-performance.service.js";
import { ThresholdService } from "../services/threshold.service.js";
import type { PerformanceMetrics } from "../types/performance-metrics.js";
import type { DeliveryPulseMetrics } from "../types/delivery-pulse-metrics.js";
import type { UmbracoMetrics } from "../types/umbraco-metrics.js";
import type { 
  ThresholdAlert, 
  ThresholdAlertStats,
  AcknowledgeAlertRequest
} from "../types/threshold-models.js";

import "../components/app-info-banner.element.js";
import "../components/metric-card.element.js";
import "../components/metrics-grid.element.js";
import "../components/active-requests-sidebar.element.js";
import "../components/export-modal.element.js";
import stylesString from '../css/dashboard.element.css?inline';
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import { ACTIVE_REQUESTS_SIDEBAR_MODAL } from "../components/active-requests-sidebar.modal.js";
import { UMB_METRICS_EXPORT_MODAL } from "../components/export-modal.token.js";
import { UMB_METRICS_CLEANUP_DIALOG } from "../components/cleanup-dialog.token.js";
import { SQL_STACKTRACE_MODAL } from "../components/sql-stacktrace.modal.js";

// Import tab components
import "./tabs/overview-tab.element.js";
import "./tabs/heap-tab.element.js";
import "./tabs/umbraco-tab.element.js";
import "./tabs/delivery-pulse-tab.element.js";
import "./tabs/database-tab.element.js";
import "./tabs/thresholds-tab.element.js";
import "./tabs/utils-tab.element.js";

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

  @state()
  private _deliveryPulseMetrics?: DeliveryPulseMetrics;

  @state()
  private _thresholdAlerts: ThresholdAlert[] = [];

  @state()
  private _alertStats?: ThresholdAlertStats;

  @state()
  private _loadingAlerts: boolean = false;

  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;
  #authContext?: UmbAuthContext;
  #metricsService?: MetricsPerformanceService;
  #thresholdService?: ThresholdService;
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
        "currentUserObserver"
      );
    });


    this.consumeContext(UMB_AUTH_CONTEXT, (authContext) => {
      this.#authContext = authContext;
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.#initServices();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#unsubscribe?.();
  }

  async #initServices() {
    if (!this.#authContext) return;
    const tokenProvider = async () => {
      const token = await this.#authContext?.getLatestToken();
      if (!token) throw new Error('No authentication token available');
      return token;
    };
    this.#metricsService = new MetricsPerformanceService(tokenProvider);
    this.#thresholdService = new ThresholdService(tokenProvider);
  }

  async #loadPerformanceMetrics() {
    if (!this.#metricsService) return;
    try {
      const metrics = await this.#metricsService.getPerformanceMetrics();
      this._performanceMetrics = metrics;
      this._deliveryPulseMetrics = metrics.deliveryPulse ?? undefined;
    } catch (error) {
      console.error("Failed to load performance metrics:", error);
      this.#notificationContext?.peek("danger", {
        data: { message: "Failed to load performance metrics" },
      });
    }
  }

  async #loadUmbracoMetrics() {
    if (!this.#metricsService) return;
    try {
      this._umbracoMetrics = await this.#metricsService.getUmbracoMetrics();
    } catch (error) {
      console.error("Failed to load Umbraco metrics:", error);
      this.#notificationContext?.peek("danger", {
        data: { message: "Failed to load Umbraco metrics" },
      });
    }
  }

  async #loadThresholdAlerts() {
    if (!this.#thresholdService) return;
    this._loadingAlerts = true;
    try {
      const [alerts, stats] = await Promise.all([
        this.#thresholdService.getActiveAlerts(),
        this.#thresholdService.getAlertStats(),
      ]);
      this._thresholdAlerts = alerts;
      this._alertStats = stats;
    } catch (error) {
      console.error("Failed to load threshold alerts:", error);
    } finally {
      this._loadingAlerts = false;
    }
  }

  async #onClickRefreshMetrics() {
    await Promise.all([
      this.#loadPerformanceMetrics(),
      this.#loadUmbracoMetrics(),
      this.#loadThresholdAlerts(),
    ]);
  }

  async #toggleAutoRefresh() {
    this._autoRefresh = !this._autoRefresh;
    if (this._autoRefresh) {
      await this.#connectToHub();
    } else {
      await this.#disconnectFromHub();
    }
  }

  async #connectToHub() {
    if (!this.#metricsService) return;
    try {
      await this.#metricsService.connectToHub();
      this._isConnected = true;
      this.#unsubscribe = this.#metricsService.onMetricsUpdate((metrics) => {
        this._performanceMetrics = metrics;
        this._deliveryPulseMetrics = metrics.deliveryPulse ?? undefined;
      });
    } catch (error) {
      console.error("Failed to connect to SignalR hub:", error);
      this._isConnected = false;
      this._autoRefresh = false;
    }
  }

  async #disconnectFromHub() {
    if (!this.#metricsService) return;
    try {
      this.#unsubscribe?.();
      this.#unsubscribe = undefined;
      await this.#metricsService.disconnectFromHub();
      this._isConnected = false;
    } catch (error) {
      console.error("Failed to disconnect from SignalR hub:", error);
    }
  }

  #switchTab(tab: string) {
    this._activeTab = tab;
  }

  #onOpenActiveRequests() {
    this.#openActiveRequestsModal();
  }

  async #openActiveRequestsModal() {
    const modalManagerContext = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
    modalManagerContext?.open(this, ACTIVE_REQUESTS_SIDEBAR_MODAL, {
      data: {
        activeRequests: this._performanceMetrics?.requestMetrics.activeRequests ?? 0,
        totalRequests: this._performanceMetrics?.requestMetrics.totalRequests ?? 0,
        failedRequests: this._performanceMetrics?.requestMetrics.failedRequests ?? 0,
        requestsPerSecond: this._performanceMetrics?.requestMetrics.requestsPerSecond ?? 0,
        averageResponseTimeMs: this._performanceMetrics?.requestMetrics.averageResponseTimeMs ?? 0,
      },
    });
  }

  async #openExportModal() {
    const modalManagerContext = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
    modalManagerContext?.open(this, UMB_METRICS_EXPORT_MODAL, {
      data: {
        performanceMetrics: this._performanceMetrics,
        umbracoMetrics: this._umbracoMetrics,
      },
    });
  }

  async #openCleanupDialog() {
    const modalManagerContext = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
    modalManagerContext?.open(this, UMB_METRICS_CLEANUP_DIALOG, {
      data: {},
    });
  }

  async #openSqlStacktraceModal(e: CustomEvent) {
    const { operationKey, operationValue } = e.detail;
    const modalManagerContext = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
    modalManagerContext?.open(this, SQL_STACKTRACE_MODAL, {
      data: {
        operationKey,
        operationValue,
      },
    });
  }

  async #onAcknowledgeAlert(e: CustomEvent) {
    const { alertId } = e.detail;
    if (!this.#thresholdService) return;
    try {
      const request: AcknowledgeAlertRequest = { acknowledgedBy: this._contextCurrentUser?.name || 'Unknown' };
      await this.#thresholdService.acknowledgeAlert(alertId, request);
      await this.#loadThresholdAlerts();
      this.#notificationContext?.peek('positive', {
        data: { message: "Alert acknowledged" },
      });
    } catch (error) {
      console.error("Failed to acknowledge alert:", error);
      this.#notificationContext?.peek('danger', {
        data: { message: "Failed to acknowledge alert" },
      });
    }
  }

  #renderTabContent() {
    switch (this._activeTab) {
      case 'overview':
        return html`
          <umbmetrics-overview-tab
            .performanceMetrics=${this._performanceMetrics}
            .isConnected=${this._isConnected}
            @open-active-requests=${this.#onOpenActiveRequests}
          ></umbmetrics-overview-tab>`;
      case 'heap':
        return html`
          <umbmetrics-heap-tab
            .performanceMetrics=${this._performanceMetrics}
          ></umbmetrics-heap-tab>`;
      case 'umbraco':
        return html`
          <umbmetrics-umbraco-tab
            .umbracoMetrics=${this._umbracoMetrics}
          ></umbmetrics-umbraco-tab>`;
      case 'deliveryPulse':
        return html`
          <umbmetrics-delivery-pulse-tab
            .deliveryPulseMetrics=${this._deliveryPulseMetrics}
            @refresh-delivery-pulse=${this.#onClickRefreshMetrics}
          ></umbmetrics-delivery-pulse-tab>`;
      case 'database':
        return html`
          <umbmetrics-database-tab
            .performanceMetrics=${this._performanceMetrics}
            @refresh-metrics=${this.#onClickRefreshMetrics}
            @open-sql-stacktrace=${this.#openSqlStacktraceModal}
          ></umbmetrics-database-tab>`;
      case 'thresholds':
        return html`
          <umbmetrics-thresholds-tab
            .alerts=${this._thresholdAlerts}
            .alertStats=${this._alertStats}
            .loading=${this._loadingAlerts}
            @refresh-thresholds=${this.#onClickRefreshMetrics}
            @acknowledge-alert=${this.#onAcknowledgeAlert}
          ></umbmetrics-thresholds-tab>`;
      case 'utils':
        return html`
          <umbmetrics-utils-tab
            @open-export-modal=${this.#openExportModal}
            @open-cleanup-dialog=${this.#openCleanupDialog}
          ></umbmetrics-utils-tab>`;
      default:
        return html`
          <umbmetrics-overview-tab
            .performanceMetrics=${this._performanceMetrics}
            .isConnected=${this._isConnected}
            @open-active-requests=${this.#onOpenActiveRequests}
          ></umbmetrics-overview-tab>`;
    }
  }

  render() {
    return html`
      <uui-box headline="${this.localize?.term('dashboard_applicationPerformanceMetrics') || 'Application Performance Metrics'} - ${import.meta.env.VITE_APP_VERSION}" class="wide">
        <div slot="header">[${this.localize?.term('dashboard_dotnetApplication') || '.NET Application'} - ${this.localize?.term('dashboard_realTimeMetrics') || 'Real-time Metrics'}${this._contextCurrentUser?.name ? ` - ${this._contextCurrentUser.name}` : ''}]</div>

        <div class="metrics-controls">
          <uui-button color="default" look="primary" @click="${this.#onClickRefreshMetrics}">
            <uui-icon name="icon-refresh"></uui-icon> ${this.localize?.term('dashboard_refreshMetrics') || 'Refresh Metrics'}
          </uui-button>

          <uui-toggle
            label="${this.localize?.term('dashboard_realTimeUpdates') || 'Real-time Updates (SignalR)'}"
            .checked="${this._autoRefresh}"
            @change="${this.#toggleAutoRefresh}"
          ></uui-toggle>

          ${this._isConnected ? html`
            <span class="connection-status connected">
              <uui-icon name="icon-check"></uui-icon> ${this.localize?.term('dashboard_connected') || 'Connected'}
            </span>
          ` : this._autoRefresh ? html`
            <span class="connection-status connecting">
              <uui-icon name="icon-time"></uui-icon> ${this.localize?.term('dashboard_connecting') || 'Connecting...'}
            </span>
          ` : ''}
        </div>

        <div class="tab-navigation">
          <uui-button 
            look="${this._activeTab === 'overview' ? 'primary' : 'default'}"
            color="${this._activeTab === 'overview' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('overview')}"
          >
            <uui-icon name="icon-chart"></uui-icon> ${this.localize?.term('dashboard_overview') || 'Overview'}
          </uui-button>
          <uui-button 
            look="${this._activeTab === 'heap' ? 'primary' : 'default'}"
            color="${this._activeTab === 'heap' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('heap')}"
          >
            <uui-icon name="icon-box"></uui-icon> ${this.localize?.term('dashboard_heapAndGC') || 'Heap & GC'}
          </uui-button>
          <uui-button 
            look="${this._activeTab === 'deliveryPulse' ? 'primary' : 'default'}"
            color="${this._activeTab === 'deliveryPulse' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('deliveryPulse')}"
          >
            <uui-icon name="icon-nodes"></uui-icon> ${this.localize?.term('dashboard_deliveryPulse') || 'Delivery Pulse'}
          </uui-button>
          <uui-button 
            look="${this._activeTab === 'database' ? 'primary' : 'default'}"
            color="${this._activeTab === 'database' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('database')}"
          >
            <uui-icon name="icon-database"></uui-icon> ${this.localize?.term('dashboard_database') || 'Database'}
          </uui-button>
          <uui-button 
            look="${this._activeTab === 'umbraco' ? 'primary' : 'default'}"
            color="${this._activeTab === 'umbraco' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('umbraco')}"
          >
            <uui-icon name="icon-umbraco"></uui-icon> ${this.localize?.term('dashboard_umbracoMetrics') || 'Umbraco Metrics'}
          </uui-button>          
          <uui-button 
            look="${this._activeTab === 'thresholds' ? 'primary' : 'default'}"
            color="${this._activeTab === 'thresholds' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('thresholds')}"
          >
            <uui-icon name="icon-alert"></uui-icon> ${this.localize?.term('threshold_thresholds') || 'Thresholds'}
          </uui-button>
          <uui-button 
            look="${this._activeTab === 'utils' ? 'primary' : 'default'}"
            color="${this._activeTab === 'utils' ? 'positive' : 'default'}"
            @click="${() => this.#switchTab('utils')}"
          >
            <uui-icon name="icon-settings"></uui-icon> ${this.localize?.term('dashboard_utils') || 'Utils'}
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
