import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import stylesString from '../css/metrics-grid.styles.css?inline';

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

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default MetricsGridElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-metrics-grid": MetricsGridElement;
  }
}