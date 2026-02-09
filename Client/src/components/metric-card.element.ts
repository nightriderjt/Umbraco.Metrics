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

  @property({ type: Number, reflect: true })
  span: number = 1;

  @property({ type: Boolean })
  clickable: boolean = false;

  @property({ type: String })
  actionIcon: string = "icon-expand";

  @property({ type: String })
  actionLabel: string = "View Details";

  #handleClick = (e: Event) => {
    e.stopPropagation();
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('card-action', { bubbles: true, composed: true }));
    }
  };

  render() {
    return html`
      <div class="metric-card">
        <div class="card-header">
          <div class="header-title">
            <uui-icon name="${this.icon}"></uui-icon>
            <h3>${this.title}</h3>
          </div>
          ${this.clickable ? html`
            <uui-button 
              class="action-button"
              look="secondary" 
              compact 
              @click="${this.#handleClick}"
              title="${this.actionLabel}"
            >
              <uui-icon name="${this.actionIcon}"></uui-icon>
            </uui-button>
          ` : ''}
        </div>
        
        <div class="card-body">
          <div class="metric-value ${this.color}">
            ${this.value}
          </div>
          ${this.detail ? html`<div class="metric-detail">${this.detail}</div>` : ''}
          <slot></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    :host([span="2"]) {
      grid-column: span 2;
    }

    :host([span="3"]) {
      grid-column: span 3;
    }

    :host([span="4"]) {
      grid-column: span 4;
    }

    .metric-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--uui-color-surface);
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      overflow: hidden;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--uui-color-surface-alt);
      border-bottom: 1px solid var(--uui-color-border);
      min-height: 48px;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-title uui-icon {
      font-size: 1.25rem;
      color: var(--uui-color-interactive);
    }

    .header-title h3 {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--uui-color-text-alt);
    }

    .action-button {
      --uui-button-height: 28px;
      --uui-button-padding-left-factor: 1;
      --uui-button-padding-right-factor: 1;
    }

    .action-button uui-icon {
      font-size: 1rem;
    }

    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      padding: 1.25rem 1rem;
      text-align: center;
    }

    .metric-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--uui-color-text);
      line-height: 1.2;
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
      font-size: 0.8rem;
      color: var(--uui-color-text-alt);
      margin-top: 0.5rem;
    }
  `;
}

export default MetricCardElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-metric-card": MetricCardElement;
  }
}