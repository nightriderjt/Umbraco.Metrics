import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import stylesString from '../css/stat-card.styles.css?inline';

export interface StatRow {
  label: string;
  value: string | number;
  color?: 'default' | 'positive' | 'warning' | 'danger';
}

@customElement("umbmetrics-stat-card")
export class StatCardElement extends UmbElementMixin(LitElement) {
  @property({ type: String })
  icon: string = "icon-info";

  @property({ type: String })
  title: string = "";

  @property({ type: Array })
  stats: StatRow[] = [];

  @property({ type: Number, reflect: true })
  span: number = 1;

  render() {
    return html`
      <div class="stat-card">
        <div class="card-header">
          <div class="header-title">
            <uui-icon name="${this.icon}"></uui-icon>
            <h3>${this.title}</h3>
          </div>
        </div>
        
        <div class="card-body">
          <div class="stats-list">
            ${this.stats.map(stat => html`
              <div class="stat-row">
                <span class="stat-label">${stat.label}</span>
                <strong class="${stat.color || 'default'}">${stat.value}</strong>
              </div>
            `)}
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default StatCardElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-stat-card": StatCardElement;
  }
}