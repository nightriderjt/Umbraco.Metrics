import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import styles from '../css/quick-export-buttons.styles.css?inline';

@customElement("umbmetrics-quick-export-buttons")
export class QuickExportButtonsElement extends UmbElementMixin(LitElement) {
  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Function })
  onCsvExport?: () => void;

  @property({ type: Function })
  onJsonExport?: () => void;

  render() {
    return html`
      <div class="quick-export-section">
        <h4>${this.localize?.term('export_quickExport') || 'Quick Export'}</h4>
        <p class="description">${this.localize?.term('export_quickExportDescription') || 'Export all metrics with one click'}</p>
        
        <div class="quick-export-buttons">
          <uui-button 
            look="primary" 
            color="positive"
            @click="${this.#handleCsvExport}"
            ?disabled="${this.disabled}"
          >
            <uui-icon name="icon-download"></uui-icon>
            ${this.localize?.term('export_exportAsCsv') || 'Export as CSV'}
          </uui-button>
          
          <uui-button 
            look="outline"
            @click="${this.#handleJsonExport}"
            ?disabled="${this.disabled}"
          >
            <uui-icon name="icon-download"></uui-icon>
            ${this.localize?.term('export_exportAsJson') || 'Export as JSON'}
          </uui-button>
        </div>
      </div>
    `;
  }

  #handleCsvExport = () => {
    if (this.onCsvExport) {
      this.onCsvExport();
    }
  };

  #handleJsonExport = () => {
    if (this.onJsonExport) {
      this.onJsonExport();
    }
  };

  static styles = css`${unsafeCSS(styles)}`;
}

export default QuickExportButtonsElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-quick-export-buttons": QuickExportButtonsElement;
  }
}