import {
  LitElement,
  css,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { ExportFormat, ExportScope, ExportOptions } from "../types/export-options.js";

@customElement("umbmetrics-export-options")
export class ExportOptionsElement extends UmbElementMixin(LitElement) {
  @property({ type: Object })
  exportOptions: ExportOptions = {
    format: ExportFormat.Csv,
    scope: ExportScope.Current,
    includePerformanceMetrics: true,
    includeUmbracoMetrics: true,
    includeActiveRequests: false,
    timezone: 'UTC'
  };

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  estimatedSize: string = '';

  @property({ type: Array })
  formatOptions: Array<{ value: ExportFormat; label: string; description: string }> = [];

  @property({ type: Array })
  scopeOptions: Array<{ value: ExportScope; label: string; description: string }> = [];

  @property({ type: Function })
  onFormatChange?: (format: ExportFormat) => void;

  @property({ type: Function })
  onScopeChange?: (scope: ExportScope) => void;

  @property({ type: Function })
  onMetricToggle?: (metric: keyof ExportOptions) => void;

  @property({ type: Function })
  onDateChange?: (dateField: 'startDate' | 'endDate', value: string) => void;

  @property({ type: Function })
  onTimezoneChange?: (timezone: string) => void;

  #handleFormatChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    if (this.onFormatChange) {
      this.onFormatChange(select.value as ExportFormat);
    }
  };

  #handleScopeChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    if (this.onScopeChange) {
      this.onScopeChange(select.value as ExportScope);
    }
  };

  #handleMetricToggle = (metric: keyof ExportOptions) => {
    if (this.onMetricToggle) {
      this.onMetricToggle(metric);
    }
  };

  #handleDateChange = (dateField: 'startDate' | 'endDate', e: Event) => {
    const input = e.target as HTMLInputElement;
    if (this.onDateChange) {
      this.onDateChange(dateField, input.value);
    }
  };

  #handleTimezoneChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    if (this.onTimezoneChange) {
      this.onTimezoneChange(select.value);
    }
  };

  render() {
    return html`
      <div class="export-options-section">
        <h4>Custom Export</h4>
        <p class="description">Configure export options</p>
        
        <div class="form-grid">
          <!-- Format Selection -->
          <div class="form-group">
            <label for="export-format">Format</label>
            <uui-select 
              id="export-format"
              .value="${this.exportOptions.format}"
              @change="${this.#handleFormatChange}"
              ?disabled="${this.disabled}"
            >
              ${this.formatOptions.map(option => html`
                <uui-option value="${option.value}">
                  ${option.label} - ${option.description}
                </uui-option>
              `)}
            </uui-select>
          </div>

          <!-- Scope Selection -->
          <div class="form-group">
            <label for="export-scope">Scope</label>
            <uui-select 
              id="export-scope"
              .value="${this.exportOptions.scope}"
              @change="${this.#handleScopeChange}"
              ?disabled="${this.disabled}"
            >
              ${this.scopeOptions.map(option => html`
                <uui-option value="${option.value}">
                  ${option.label}
                </uui-option>
              `)}
            </uui-select>
          </div>

          <!-- Date Range (only for custom scope) -->
          ${this.exportOptions.scope === ExportScope.Custom ? html`
            <div class="form-group span-2">
              <label>Date Range</label>
              <div class="date-range">
                <uui-input
                  type="date"
                  label="Start Date"
                  .value="${this.exportOptions.startDate || ''}"
                  @change="${(e: Event) => this.#handleDateChange('startDate', e)}"
                  ?disabled="${this.disabled}"
                ></uui-input>
                
                <span class="date-separator">to</span>
                
                <uui-input
                  type="date"
                  label="End Date"
                  .value="${this.exportOptions.endDate || ''}"
                  @change="${(e: Event) => this.#handleDateChange('endDate', e)}"
                  ?disabled="${this.disabled}"
                ></uui-input>
              </div>
            </div>
          ` : ''}

          <!-- Timezone -->
          <div class="form-group">
            <label for="export-timezone">Timezone</label>
            <uui-select 
              id="export-timezone"
              .value="${this.exportOptions.timezone}"
              @change="${this.#handleTimezoneChange}"
              ?disabled="${this.disabled}"
            >
              <uui-option value="UTC">UTC</uui-option>
              <uui-option value="Local">Local Time</uui-option>
              <uui-option value="Europe/London">Europe/London</uui-option>
              <uui-option value="America/New_York">America/New_York</uui-option>
              <uui-option value="Asia/Tokyo">Asia/Tokyo</uui-option>
            </uui-select>
          </div>
        </div>

        <!-- Metric Selection -->
        <div class="metric-selection">
          <h5>Include Metrics</h5>
          <div class="metric-toggles">
            <uui-toggle 
              label="Performance Metrics"
              .checked="${this.exportOptions.includePerformanceMetrics}"
              @change="${() => this.#handleMetricToggle('includePerformanceMetrics')}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="Umbraco Metrics"
              .checked="${this.exportOptions.includeUmbracoMetrics}"
              @change="${() => this.#handleMetricToggle('includeUmbracoMetrics')}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="Active Requests"
              .checked="${this.exportOptions.includeActiveRequests}"
              @change="${() => this.#handleMetricToggle('includeActiveRequests')}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
          </div>
        </div>

        <!-- Estimated Size -->
        <div class="estimated-size">
          <uui-icon name="icon-info"></uui-icon>
          Estimated file size: <strong>${this.estimatedSize}</strong>
        </div>
      </div>
    `;
  }

  static styles = css`
    .export-options-section {
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

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--uui-size-space-4);
      margin-bottom: var(--uui-size-space-5);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--uui-size-space-2);
    }

    .form-group.span-2 {
      grid-column: span 2;
    }

    label {
      font-weight: 600;
      color: var(--uui-color-text);
      font-size: 0.875rem;
    }

    .date-range {
      display: flex;
      align-items: center;
      gap: var(--uui-size-space-3);
    }

    .date-separator {
      color: var(--uui-color-text-alt);
      font-size: 0.875rem;
    }

    .metric-selection {
      margin-bottom: var(--uui-size-space-5);
    }

    h5 {
      margin: 0 0 var(--uui-size-space-3) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--uui-color-text);
    }

    .metric-toggles {
      display: flex;
      flex-direction: column;
      gap: var(--uui-size-space-3);
    }

    .estimated-size {
      display: flex;
      align-items: center;
      gap: var(--uui-size-space-2);
      padding: var(--uui-size-space-3);
      background-color: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
      color: var(--uui-color-text-alt);
      font-size: 0.875rem;
    }

    .estimated-size strong {
      color: var(--uui-color-text);
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }

      .form-group.span-2 {
        grid-column: span 1;
      }

      .date-range {
        flex-direction: column;
        align-items: stretch;
      }

      .date-separator {
        text-align: center;
      }
    }
  `;
}

export default ExportOptionsElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-export-options": ExportOptionsElement;
  }
}