import {
  LitElement,
  css,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

export type MetricCardColor = 'default' | 'positive' | 'warning' | 'danger';

@customElement("umbmetrics-metric-card")
export class MetricCardElement extends UmbElementMixin(LitElement) {
  @property({ type: String })
  icon: string = "icon-info";

  @property({ type: String })
  title: string = "";

  @property({ type: String })
  value: string = "";

  @property({ type: String })
  detail: string = "";

  @property({ type: String })
  color: MetricCardColor = "default";

  @property({ type: Number })
  span: number = 1;

  render() {
    return html`
      <uui-box class="span-${this.span}">
        <div class="metric-card">
          <uui-icon name="${this.icon}"></uui-icon>
          <h3>${this.title}</h3>
          <div class="metric-value ${this.color}">
            ${this.value}
          </div>
          ${this.detail ? html`<div class="metric-detail">${this.detail}</div>` : ''}
          <slot></slot>
        </div>
      </uui-box>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    :host([span="2"]) uui-box {
      grid-column: span 2;
    }

    :host([span="3"]) uui-box {
      grid-column: span 3;
    }

    :host([span="4"]) uui-box {
      grid-column: span 4;
    }

    .metric-card {
      text-align: center;
      padding: 1rem;
    }

    .metric-card uui-icon {
      font-size: 2rem;
      color: var(--uui-color-interactive);
      margin-bottom: 0.5rem;
    }

    .metric-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--uui-color-text-alt);
    }

    .metric-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--uui-color-text);
    }

    .metric-value.positive {
      color: var(--uui-color-positive);
    }

    .metric-value.warning {
      color: var(--uui-color-warning);
    }

    .metric-value.danger {
      color: var(--uui-color-danger);
    }

    .metric-detail {
      font-size: 0.75rem;
      color: var(--uui-color-text-alt);
      margin-top: 0.25rem;
    }
  `;
}

export default MetricCardElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-metric-card": MetricCardElement;
  }
}