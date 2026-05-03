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
import type { DeliveryPulseMetrics } from "../../types/delivery-pulse-metrics.js";
import { getDurationColor } from "../../utils/format-utils.js";
import "../../components/metric-card.element.js";
import "../../components/metrics-grid.element.js";
import stylesString from '../../css/dashboard.element.css?inline';

@customElement("umbmetrics-delivery-pulse-tab")
export class UmbMetricsDeliveryPulseTabElement extends UmbElementMixin(LitElement) {
  @property({ type: Object, attribute: false })
  deliveryPulseMetrics?: DeliveryPulseMetrics;

  render() {
    if (!this.deliveryPulseMetrics) {
      return html`<p>${this.localize?.term('dashboard_clickToLoadDeliveryPulse') || 'Click "Refresh Metrics" to load Delivery API performance data'}</p>`;
    }

    const m = this.deliveryPulseMetrics;

    return html`
      <div class="database-tab">
        <div class="database-header">
          <h3>${this.localize?.term('dashboard_deliveryPulse') || 'Delivery Pulse'}</h3>
          <div class="database-controls">
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

        <div class="database-stats">
          <umbmetrics-metrics-grid columns="4">
            <umbmetrics-metric-card
              icon="icon-nodes"
              title="${this.localize?.term('deliveryPulse_totalRequests') || 'Total Requests'}"
              value="${m.totalRequests}"
              detail="${this.localize?.term('deliveryPulse_sinceStartup') || 'Since startup'}"
            ></umbmetrics-metric-card>

            <umbmetrics-metric-card
              icon="icon-alert"
              title="${this.localize?.term('deliveryPulse_errors') || 'Errors'}"
              value="${m.totalErrors}"
              detail="${this.localize?.term('deliveryPulse_5xxResponses') || '5xx responses'}"
              color="${m.totalErrors > 0 ? 'danger' : 'positive'}"
            ></umbmetrics-metric-card>

            <umbmetrics-metric-card
              icon="icon-wrong"
              title="${this.localize?.term('deliveryPulse_404s') || '404 Not Found'}"
              value="${m.total404s}"
              detail="${this.localize?.term('deliveryPulse_notFoundCount') || 'Not found responses'}"
              color="${m.total404s > 0 ? 'warning' : 'positive'}"
            ></umbmetrics-metric-card>

            <umbmetrics-metric-card
              icon="icon-timer"
              title="${this.localize?.term('deliveryPulse_avgLatency') || 'Avg Latency'}"
              value="${m.averageLatencyMs.toFixed(1)} ms"
              detail="${this.localize?.term('deliveryPulse_maxLatency') || 'Max'}: ${m.maxLatencyMs.toFixed(1)} ms"
              color="${getDurationColor(m.averageLatencyMs)}"
            ></umbmetrics-metric-card>
          </umbmetrics-metrics-grid>
        </div>

        <div class="delivery-pulse-endpoints">
          <h4>${this.localize?.term('deliveryPulse_topEndpoints') || 'Top Endpoints'}</h4>
          
          ${m.topEndpoints.length === 0 ? html`
            <p class="no-endpoints">${this.localize?.term('deliveryPulse_noEndpoints') || 'No Delivery API requests recorded yet'}</p>
          ` : html`
            <div class="endpoints-table-container">
              <div class="endpoints-table-wrapper">
                <table class="endpoints-table">
                  <thead>
                    <tr>
                      <th>${this.localize?.term('deliveryPulse_path') || 'Path'}</th>
                      <th>${this.localize?.term('deliveryPulse_method') || 'Method'}</th>
                      <th>${this.localize?.term('deliveryPulse_requests') || 'Requests'}</th>
                      <th>${this.localize?.term('deliveryPulse_avgLatency') || 'Avg Latency'}</th>
                      <th>${this.localize?.term('deliveryPulse_maxLatency') || 'Max Latency'}</th>
                      <th>${this.localize?.term('deliveryPulse_errors') || 'Errors'}</th>
                      <th>${this.localize?.term('deliveryPulse_404s') || '404s'}</th>
                      <th>${this.localize?.term('deliveryPulse_lastAccessed') || 'Last Accessed'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${repeat(m.topEndpoints, (ep) => ep.path + ep.method, (ep) => html`
                      <tr>
                        <td>
                          <div class="endpoint-path" title="${ep.path}">
                            <span class="endpoint-path-text">${ep.path}</span>
                          </div>
                        </td>
                        <td>
                          <span class="endpoint-method method-${ep.method.toLowerCase()}">${ep.method}</span>
                        </td>
                        <td>
                          <span class="endpoint-stat">${ep.requestCount}</span>
                        </td>
                        <td>
                          <span class="endpoint-duration ${getDurationColor(ep.averageLatencyMs)}">
                            ${ep.averageLatencyMs.toFixed(1)} ms
                          </span>
                        </td>
                        <td>
                          <span class="endpoint-duration ${getDurationColor(ep.maxLatencyMs)}">
                            ${ep.maxLatencyMs.toFixed(1)} ms
                          </span>
                        </td>
                        <td>
                          <span class="endpoint-stat ${ep.errorCount > 0 ? 'stat-error' : 'stat-ok'}">
                            ${ep.errorCount}
                          </span>
                        </td>
                        <td>
                          <span class="endpoint-stat ${ep.notFoundCount > 0 ? 'stat-warning' : 'stat-ok'}">
                            ${ep.notFoundCount}
                          </span>
                        </td>
                        <td>
                          <span class="endpoint-time">${new Date(ep.lastAccessed).toLocaleString()}</span>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  #onRefresh() {
    this.dispatchEvent(new CustomEvent('refresh-delivery-pulse', { bubbles: true, composed: true }));
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default UmbMetricsDeliveryPulseTabElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-delivery-pulse-tab": UmbMetricsDeliveryPulseTabElement;
  }
}
