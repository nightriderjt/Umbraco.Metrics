import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import stylesString from '../../css/dashboard.element.css?inline';

@customElement("umbmetrics-utils-tab")
export class UmbMetricsUtilsTabElement extends UmbElementMixin(LitElement) {
  render() {
    return html`
      <div class="utils-tab">
        <h3>${this.localize?.term('dashboard_utilityTools') || 'Utility Tools'}</h3>
        <p class="description">${this.localize?.term('dashboard_utilityToolsDescription') || 'Additional tools for managing and exporting metrics data'}</p>
        
        <div class="utils-grid">
          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-download"></uui-icon>
            </div>
            <div class="util-content">
              <h4>${this.localize?.term('dashboard_exportMetricsCard') || 'Export Metrics'}</h4>
              <p>${this.localize?.term('dashboard_exportMetricsDescription') || 'Export performance and Umbraco metrics in various formats (CSV, JSON)'}</p>
              <uui-button 
                look="primary" 
                color="positive"
                @click="${this.#onOpenExport}"
                style="margin-top: 1rem;"
              >
                <uui-icon name="icon-download"></uui-icon>
                ${this.localize?.term('dashboard_openExportDialog') || 'Open Export Dialog'}
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-settings"></uui-icon>
            </div>
            <div class="util-content">
              <h4>${this.localize?.term('dashboard_dataManagement') || 'Data Management'}</h4>
              <p>${this.localize?.term('dashboard_dataManagementDescription') || 'Manage historical metrics data and cleanup options'}</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                color="warning"
                @click="${this.#onOpenCleanup}"
              >
                <uui-icon name="icon-trash"></uui-icon>
                ${this.localize?.term('dashboard_cleanupOldData') || 'Cleanup Old Data'}
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-chart"></uui-icon>
            </div>
            <div class="util-content">
              <h4>${this.localize?.term('dashboard_advancedAnalytics') || 'Advanced Analytics'}</h4>
              <p>${this.localize?.term('dashboard_advancedAnalyticsDescription') || 'Generate detailed reports and analytics from collected metrics'}</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-chart"></uui-icon>
                ${this.localize?.term('dashboard_generateReport') || 'Generate Report'}
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-alarm-clock"></uui-icon>
            </div>
            <div class="util-content">
              <h4>${this.localize?.term('dashboard_scheduledTasks') || 'Scheduled Tasks'}</h4>
              <p>${this.localize?.term('dashboard_scheduledTasksDescription') || 'Schedule automatic exports and data collection tasks'}</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-time"></uui-icon>
                ${this.localize?.term('dashboard_scheduleExport') || 'Schedule Export'}
              </uui-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  #onOpenExport() {
    this.dispatchEvent(new CustomEvent('open-export-modal', { bubbles: true, composed: true }));
  }

  #onOpenCleanup() {
    this.dispatchEvent(new CustomEvent('open-cleanup-dialog', { bubbles: true, composed: true }));
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default UmbMetricsUtilsTabElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-utils-tab": UmbMetricsUtilsTabElement;
  }
}
