import {
  LitElement,
  css,
  html,
  customElement,
  property,
  unsafeCSS,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { ApplicationInfo } from "../types/performance-metrics.js";
import { formatUptime } from "../utils/format-utils.js";
import styles from "../css/app-info-banner.styles.css?inline";

@customElement("umbmetrics-app-info-banner")
export class AppInfoBannerElement extends UmbElementMixin(LitElement) {
  @property({ type: Object })
  applicationInfo?: ApplicationInfo;

  @property({ type: Boolean })
  isConnected: boolean = false;

  render() {
    if (!this.applicationInfo) {
      return html``;
    }

    return html`
      <div class="app-info-banner">
        <div class="info-item">
          <strong>${this.localize?.term('appInfo_process') || 'Process'}:</strong> ${this.applicationInfo.processName} (PID: ${this.applicationInfo.processId})
        </div>
        <div class="info-item">
          <strong>${this.localize?.term('appInfo_runtime') || 'Runtime'}:</strong> ${this.applicationInfo.runtimeVersion}
        </div>
        <div class="info-item">
          <strong>${this.localize?.term('appInfo_architecture') || 'Architecture'}:</strong> ${this.applicationInfo.is64BitProcess ? this.localize?.term('appInfo_64bit') || '64-bit' : this.localize?.term('appInfo_32bit') || '32-bit'}
        </div>
        <div class="info-item">
          <strong>${this.localize?.term('appInfo_cpuCores') || 'CPU Cores'}:</strong> ${this.applicationInfo.processorCount}
        </div>
        <div class="info-item">
          <strong>${this.localize?.term('appInfo_uptime') || 'Uptime'}:</strong> ${formatUptime(this.applicationInfo.uptimeSeconds)}
        </div>
        <div class="info-item">
          <strong>Version :</strong> ${import.meta.env.VITE_APP_VERSION}
        </div>
        ${this.isConnected ? html`
          <div class="info-item connected">
            <uui-icon name="icon-check"></uui-icon>
            <strong>${this.localize?.term('appInfo_signalRConnected') || 'SignalR Connected'}</strong>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`${unsafeCSS(styles)}`;
}

export default AppInfoBannerElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-app-info-banner": AppInfoBannerElement;
  }
}