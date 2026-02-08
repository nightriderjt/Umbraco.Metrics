import {
  LitElement,
  css,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

@customElement("umbmetrics-metrics-grid")
export class MetricsGridElement extends UmbElementMixin(LitElement) {
  @property({ type: Number })
  columns: number = 4;

  render() {
    return html`
      <div class="metrics-grid" style="--grid-columns: ${this.columns}">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(var(--grid-columns, 4), 1fr);
      gap: 1rem;
    }

    @media (max-width: 1200px) {
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Support for span classes on slotted elements */
    ::slotted([span="2"]) {
      grid-column: span 2;
    }

    ::slotted([span="3"]) {
      grid-column: span 3;
    }

    ::slotted([span="4"]) {
      grid-column: span 4;
    }
  `;
}

export default MetricsGridElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-metrics-grid": MetricsGridElement;
  }
}