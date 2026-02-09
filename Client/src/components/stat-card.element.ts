import {
  LitElement,
  css,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

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

    .stat-card {
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

    .card-body {
      flex: 1;
      padding: 1rem;
    }

    .stats-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--uui-color-border);
    }

    .stat-row:last-child {
      border-bottom: none;
    }

    .stat-label {
      color: var(--uui-color-text-alt);
      font-size: 0.875rem;
    }

    .stat-row strong {
      font-size: 0.95rem;
      font-weight: 600;
    }

    .stat-row strong.positive {
      color: var(--uui-color-positive);
    }

    .stat-row strong.warning {
      color: var(--uui-color-warning);
    }

    .stat-row strong.danger {
      color: var(--uui-color-danger);
    }

    .stat-row strong.default {
      color: var(--uui-color-text);
    }
  `;
}

export default StatCardElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-stat-card": StatCardElement;
  }
}