import {
  LitElement,
  css,
  html,
  customElement,
  property,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { ActiveRequestInfo } from "../types/active-request.js";

@customElement("umbmetrics-active-requests-sidebar")
export class ActiveRequestsSidebarElement extends UmbElementMixin(LitElement) {
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  @property({ type: Array })
  requests: ActiveRequestInfo[] = [];

  @property({ type: Boolean })
  loading: boolean = false;

  @state()
  private _autoRefresh: boolean = false;

  #refreshInterval?: number;

  #close = () => {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  };

  #refresh = () => {
    this.dispatchEvent(new CustomEvent('refresh', { bubbles: true, composed: true }));
  };

  #toggleAutoRefresh = () => {
    this._autoRefresh = !this._autoRefresh;
    
    if (this._autoRefresh) {
      this.#startAutoRefresh();
    } else {
      this.#stopAutoRefresh();
    }
  };

  #startAutoRefresh = () => {
    this.#refreshInterval = window.setInterval(() => {
      this.#refresh();
    }, 1000);
  };

  #stopAutoRefresh = () => {
    if (this.#refreshInterval) {
      clearInterval(this.#refreshInterval);
      this.#refreshInterval = undefined;
    }
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#stopAutoRefresh();
  }

  #formatDuration(ms: number): string {
    if (ms < 1000) return `${ms.toFixed(0)} ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)} s`;
    return `${(ms / 60000).toFixed(1)} min`;
  }

  #getMethodColor(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET': return 'positive';
      case 'POST': return 'warning';
      case 'PUT': return 'warning';
      case 'DELETE': return 'danger';
      default: return 'default';
    }
  }

  render() {
    return html`
      <div class="sidebar-overlay ${this.open ? 'open' : ''}" @click="${this.#close}"></div>
      <aside class="sidebar ${this.open ? 'open' : ''}">
        <header class="sidebar-header">
          <h2>
            <uui-icon name="icon-link"></uui-icon>
            Active Requests
          </h2>
          <div class="header-actions">
            <uui-button 
              look="secondary" 
              compact
              @click="${this.#refresh}"
              ?disabled="${this.loading}"
            >
              <uui-icon name="icon-refresh"></uui-icon>
            </uui-button>
            <uui-toggle
              label="Auto-refresh"
              .checked="${this._autoRefresh}"
              @change="${this.#toggleAutoRefresh}"
            ></uui-toggle>
            <uui-button look="secondary" compact @click="${this.#close}">
              <uui-icon name="icon-wrong"></uui-icon>
            </uui-button>
          </div>
        </header>

        <div class="sidebar-content">
          ${this.loading ? html`
            <div class="loading">
              <uui-loader></uui-loader>
              <span>Loading active requests...</span>
            </div>
          ` : this.requests.length === 0 ? html`
            <div class="empty-state">
              <uui-icon name="icon-check"></uui-icon>
              <p>No active requests</p>
              <small>All requests have completed</small>
            </div>
          ` : html`
            <div class="request-count">
              <strong>${this.requests.length}</strong> active request${this.requests.length !== 1 ? 's' : ''}
            </div>
            <ul class="request-list">
              ${this.requests.map(req => html`
                <li class="request-item">
                  <div class="request-header">
                    <span class="method ${this.#getMethodColor(req.method)}">${req.method}</span>
                    <span class="path" title="${req.path}${req.queryString}">${req.path}</span>
                    <span class="duration">${this.#formatDuration(req.durationMs)}</span>
                  </div>
                  <div class="request-details">
                    <div class="detail-row">
                      <uui-icon name="icon-time"></uui-icon>
                      <span>Started: ${new Date(req.startTime).toLocaleTimeString()}</span>
                    </div>
                    ${req.queryString ? html`
                      <div class="detail-row">
                        <uui-icon name="icon-search"></uui-icon>
                        <span class="query-string">${req.queryString}</span>
                      </div>
                    ` : ''}
                    <div class="detail-row">
                      <uui-icon name="icon-globe"></uui-icon>
                      <span>${req.remoteIp}</span>
                    </div>
                    ${req.userAgent ? html`
                      <div class="detail-row user-agent">
                        <uui-icon name="icon-browser-window"></uui-icon>
                        <span title="${req.userAgent}">${this.#truncateUserAgent(req.userAgent)}</span>
                      </div>
                    ` : ''}
                  </div>
                </li>
              `)}
            </ul>
          `}
        </div>
      </aside>
    `;
  }

  #truncateUserAgent(ua: string): string {
    if (ua.length > 50) {
      return ua.substring(0, 47) + '...';
    }
    return ua;
  }

  static styles = css`
    :host {
      display: contents;
    }

    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
      z-index: 1000;
    }

    .sidebar-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 450px;
      max-width: 90vw;
      height: 100vh;
      background: var(--uui-color-surface);
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      z-index: 1001;
      display: flex;
      flex-direction: column;
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--uui-color-border);
      background: var(--uui-color-surface-alt);
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 3rem;
      color: var(--uui-color-text-alt);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
      color: var(--uui-color-text-alt);
    }

    .empty-state uui-icon {
      font-size: 3rem;
      color: var(--uui-color-positive);
      margin-bottom: 1rem;
    }

    .empty-state p {
      margin: 0;
      font-size: 1.1rem;
    }

    .empty-state small {
      opacity: 0.7;
    }

    .request-count {
      padding: 0.75rem 1rem;
      background: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .request-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .request-item {
      background: var(--uui-color-surface-alt);
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      overflow: hidden;
    }

    .request-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: var(--uui-color-surface);
      border-bottom: 1px solid var(--uui-color-border);
    }

    .method {
      font-weight: 700;
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: var(--uui-border-radius);
      text-transform: uppercase;
    }

    .method.positive {
      background: var(--uui-color-positive-emphasis);
      color: var(--uui-color-positive);
    }

    .method.warning {
      background: var(--uui-color-warning-emphasis);
      color: var(--uui-color-warning);
    }

    .method.danger {
      background: var(--uui-color-danger-emphasis);
      color: var(--uui-color-danger);
    }

    .path {
      flex: 1;
      font-family: monospace;
      font-size: 0.85rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .duration {
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--uui-color-interactive);
    }

    .request-details {
      padding: 0.75rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: var(--uui-color-text-alt);
    }

    .detail-row uui-icon {
      font-size: 0.9rem;
      opacity: 0.7;
    }

    .query-string {
      font-family: monospace;
      font-size: 0.75rem;
      word-break: break-all;
    }

    .user-agent span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
}

export default ActiveRequestsSidebarElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-active-requests-sidebar": ActiveRequestsSidebarElement;
  }
}