import {
  LitElement,
  html,
  css,
  customElement,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

@customElement("umbmetrics-package-view")
export class UmbMetricsPackageViewElement extends UmbElementMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
      padding: var(--uui-size-layout-1);
    }

    .package-header {
      display: flex;
      align-items: center;
      gap: var(--uui-size-space-5);
      margin-bottom: var(--uui-size-space-6);
    }

    .package-logo {
      width: 64px;
      height: 64px;
    }

    h1 {
      margin: 0;
      font-size: var(--uui-type-h2-size);
    }

    .version {
      color: var(--uui-color-text-alt);
      font-size: var(--uui-type-small-size);
    }

    .description {
      color: var(--uui-color-text);
      line-height: 1.6;
      max-width: 600px;
      margin-bottom: var(--uui-size-space-6);
    }

    .actions {
      display: flex;
      gap: var(--uui-size-space-4);
    }
  `;

  render() {
    return html`
      <div class="package-header">
        <umb-icon name="umbmetrics-logo" class="package-logo"></umb-icon>
        <div>
          <h1>UmbMetrics</h1>
          <span class="version">v17.1.0.6</span>
        </div>
      </div>

      <p class="description">
        Real-time performance monitoring dashboard for Umbraco. 
        Monitor CPU usage, memory consumption, active requests, response times, 
        and more directly from your Umbraco backoffice.
      </p>

      <div class="actions">
        <uui-button
          look="primary"
          label="Open Dashboard"
          href="/umbraco/section/settings/dashboard/umb-metrics">
          Open Dashboard
        </uui-button>
        <uui-button
          look="secondary"
          label="View on GitHub"
          href="https://github.com/nightriderjt/Umbraco.Metrics"
          target="_blank">
          <uui-icon name="icon-link"></uui-icon>
          GitHub
        </uui-button>
      </div>
    `;
  }
}

export default UmbMetricsPackageViewElement;