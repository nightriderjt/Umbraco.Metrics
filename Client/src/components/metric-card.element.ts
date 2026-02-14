import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import stylesString from '../css/metric-card.styles.css?inline';

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
  actionIcon: string = "icon-activity";

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

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default MetricCardElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-metric-card": MetricCardElement;
  }
}