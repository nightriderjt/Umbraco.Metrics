import {
  LitElement,
  css,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

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
        <h4>${this.localize?.term('export.quickExport') || 'Quick Export'}</h4>
        <p class="description">${this.localize?.term('export.quickExportDescription') || 'Export all metrics with one click'}</p>
        
        <div class="quick-export-buttons">
          <uui-button 
            look="primary" 
            color="positive"
            @click="${this.#handleCsvExport}"
            ?disabled="${this.disabled}"
          >
            <uui-icon name="icon-download"></uui-icon>
            ${this.localize?.term('export.exportAsCsv') || 'Export as CSV'}
          </uui-button>
          
          <uui-button 
            look="outline"
            @click="${this.#handleJsonExport}"
            ?disabled="${this.disabled}"
          >
            <uui-icon name="icon-download"></uui-icon>
            ${this.localize?.term('export.exportAsJson') || 'Export as JSON'}
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

  static styles = css`
    .quick-export-section {
      margin-bottom: var(--uui-size-space-5);
    }

    h4 {
      margin: 0 0 var(--uui-size-space-2) 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--uui-color-text);
    }

    .description {
      margin: 0 0 var(--uui-size-space-4) 0;
      color: var(--uui-color-text-alt);
      font-size: 0.875rem;
    }

    .quick-export-buttons {
      display: flex;
      gap: var(--uui-size-space-3);
      flex-wrap: wrap;
    }

    @media (max-width: 600px) {
      .quick-export-buttons {
        flex-direction: column;
      }
    }
  `;
}

export default QuickExportButtonsElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-quick-export-buttons": QuickExportButtonsElement;
  }
}