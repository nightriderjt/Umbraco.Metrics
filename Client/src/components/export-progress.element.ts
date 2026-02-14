import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import styles from '../css/export-progress.styles.css?inline';

@customElement("umbmetrics-export-progress")
export class ExportProgressElement extends UmbElementMixin(LitElement) {
  @property({ type: Boolean })
  isExporting: boolean = false;

  @property({ type: Number })
  progress: number = 0;

  render() {
    if (!this.isExporting) {
      return html``;
    }

    return html`
      <div class="export-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${this.progress}%"></div>
        </div>
        <div class="progress-text">
          ${this.localize?.term('export_exporting') || 'Exporting...'} ${this.progress}%
        </div>
      </div>
    `;
  }

  static styles = css`${unsafeCSS(styles)}`;
}

export default ExportProgressElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-export-progress": ExportProgressElement;
  }
}