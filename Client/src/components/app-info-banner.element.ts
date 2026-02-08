import {
  LitElement,
  css,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { ApplicationInfo } from "../types/performance-metrics.js";

@customElement("umbmetrics-app-info-banner")
export class AppInfoBannerElement extends UmbElementMixin(LitElement) {
  @property({ type: Object })
  applicationInfo?: ApplicationInfo;

  @property({ type: Boolean })
  isConnected: boolean = false;

  #formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  }

  render() {
    if (!this.applicationInfo) {
      return html``;
    }

    return html`
      <div class="app-info-banner">
        <div class="info-item">
          <strong>Process:</strong> ${this.applicationInfo.processName} (PID: ${this.applicationInfo.processId})
        </div>
        <div class="info-item">
          <strong>Runtime:</strong> ${this.applicationInfo.runtimeVersion}
        </div>
        <div class="info-item">
          <strong>Architecture:</strong> ${this.applicationInfo.is64BitProcess ? "64-bit" : "32-bit"}
        </div>
        <div class="info-item">
          <strong>CPU Cores:</strong> ${this.applicationInfo.processorCount}
        </div>
        <div class="info-item">
          <strong>Uptime:</strong> ${this.#formatUptime(this.applicationInfo.uptimeSeconds)}
        </div>
        ${this.isConnected ? html`
          <div class="info-item connected">
            <uui-icon name="icon-check"></uui-icon>
            <strong>SignalR Connected</strong>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .app-info-banner {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;
      background: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
      margin-bottom: 1.5rem;
      border: 1px solid var(--uui-color-border);
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--uui-color-text);
    }

    .info-item strong {
      color: var(--uui-color-text-alt);
    }

    .info-item.connected {
      color: var(--uui-color-positive);
    }

    .info-item.connected strong {
      color: var(--uui-color-positive);
    }

    .info-item.connected uui-icon {
      color: var(--uui-color-positive);
    }
  `;
}

export default AppInfoBannerElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-app-info-banner": AppInfoBannerElement;
  }
}