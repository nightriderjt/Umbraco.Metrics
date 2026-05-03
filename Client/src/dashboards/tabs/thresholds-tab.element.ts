import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
  repeat,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { ThresholdAlert, ThresholdAlertStats } from "../../types/threshold-models.js";
import "../../components/metric-card.element.js";
import "../../components/metrics-grid.element.js";
import stylesString from '../../css/dashboard.element.css?inline';

@customElement("umbmetrics-thresholds-tab")
export class UmbMetricsThresholdsTabElement extends UmbElementMixin(LitElement) {
  @property({ type: Array, attribute: false })
  alerts: ThresholdAlert[] = [];

  @property({ type: Object, attribute: false })
  alertStats?: ThresholdAlertStats;

  @property({ type: Boolean, attribute: false })
  loading: boolean = false;

  render() {
    if (this.loading) {
      return html`<p>${this.localize?.term('threshold_loadingAlerts') || 'Loading threshold alerts...'}</p>`;
    }

    const stats = this.alertStats;
    const alerts = this.alerts;

    return html`
      <div class="thresholds-tab">
        <div class="thresholds-header">
          <h3>${this.localize?.term('threshold_title') || 'Threshold Monitoring'}</h3>
          <div class="thresholds-controls">
            <uui-button 
              look="primary" 
              color="positive"
              @click="${this.#onRefresh}"
            >
              <uui-icon name="icon-refresh"></uui-icon>
              ${this.localize?.term('common_refresh') || 'Refresh'}
            </uui-button>
          </div>
        </div>

        ${stats ? html`
          <div class="thresholds-stats">
            <umbmetrics-metrics-grid columns="4">
              <umbmetrics-metric-card
                icon="icon-alert"
                title="${this.localize?.term('threshold_activeAlerts') || 'Active Alerts'}"
                value="${stats.activeAlerts}"
                detail="${this.localize?.term('threshold_totalAlerts') || 'Total'}: ${stats.totalAlerts}"
                color="${stats.activeAlerts > 0 ? 'danger' : 'positive'}"
              ></umbmetrics-metric-card>

              <umbmetrics-metric-card
                icon="icon-check"
                title="${this.localize?.term('threshold_acknowledgedAlerts') || 'Acknowledged'}"
                value="${stats.acknowledgedAlerts}"
                detail="${this.localize?.term('threshold_acknowledgedAlerts') || 'Acknowledged'}: ${stats.acknowledgedAlerts}"
                color="${stats.acknowledgedAlerts > 0 ? 'warning' : 'default'}"
              ></umbmetrics-metric-card>

              <umbmetrics-metric-card
                icon="icon-time"
                title="${this.localize?.term('threshold_last24Hours') || 'Last 24 Hours'}"
                value="${stats.last24Hours}"
                detail="${this.localize?.term('threshold_last7Days') || 'Last 7 Days'}: ${stats.last7Days}"
              ></umbmetrics-metric-card>

              <umbmetrics-metric-card
                icon="icon-chart"
                title="${this.localize?.term('threshold_bySeverity') || 'By Severity'}"
                value=""
                detail="Low: ${stats.bySeverity['0']}, Med: ${stats.bySeverity['1']}, High: ${stats.bySeverity['2']}, Crit: ${stats.bySeverity['3']}"
              ></umbmetrics-metric-card>
            </umbmetrics-metrics-grid>
          </div>
        ` : ''}

        <div class="thresholds-alerts">
          <h4>${this.localize?.term('threshold_activeAlerts') || 'Active Alerts'}</h4>
          
          ${alerts.length === 0 ? html`
            <p class="no-alerts">${this.localize?.term('threshold_noAlerts') || 'No active alerts'}</p>
          ` : html`
            <div class="alerts-list">
              ${repeat(alerts, alert => alert.id, alert => html`
                <div class="alert-item" data-severity="${alert.severity}">
                  <div class="alert-header">
                    <div class="alert-severity">
                      <uui-icon name="icon-alert"></uui-icon>
                      <span class="severity-label">${this.localize?.term(`threshold_${alert.severity}`) || alert.severity}</span>
                    </div>
                    <div class="alert-time">
                      ${new Date(alert.triggeredAt).toLocaleString()}
                    </div>
                  </div>
                  <div class="alert-content">
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-details">
                      <span class="alert-detail">
                        <strong>${this.localize?.term('threshold_triggeredValue') || 'Triggered Values'}:</strong>
                        ${alert.triggeredValuesJson}
                      </span>                 
                      <span class="alert-detail">
                        <strong>${this.localize?.term('threshold_ruleName') || 'Rule'}:</strong>
                        ${alert.ruleName}
                      </span>
                    </div>
                  </div>
                  <div class="alert-actions">
                    <uui-button 
                      look="primary" 
                      color="warning"
                      @click="${() => this.#onAcknowledge(alert.id)}"
                    >
                      ${this.localize?.term('threshold_acknowledge') || 'Acknowledge'}
                    </uui-button>                  
                  </div>
                </div>
              `)}
            </div>
          `}
        </div>        
      </div>
    `;
  }

  #onRefresh() {
    this.dispatchEvent(new CustomEvent('refresh-thresholds', { bubbles: true, composed: true }));
  }

  #onAcknowledge(alertId: number) {
    this.dispatchEvent(new CustomEvent('acknowledge-alert', { 
      bubbles: true, 
      composed: true,
      detail: { alertId }
    }));
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default UmbMetricsThresholdsTabElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-thresholds-tab": UmbMetricsThresholdsTabElement;
  }
}
