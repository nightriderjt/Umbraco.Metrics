import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { ExportFormat, ExportScope, ExportOptions } from "../types/export-options.js";
import styles from '../css/export-options.styles.css?inline';

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
        <h4>${this.localize?.term('export.customExport') || 'Custom Export'}</h4>
        <p class="description">${this.localize?.term('export.customExportDescription') || 'Configure export options'}</p>
        
        <div class="form-grid">
          <!-- Format Selection -->
          <div class="form-group">
            <label for="export-format">${this.localize?.term('exportOptions.format') || 'Format'}</label>
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
            <label for="export-scope">${this.localize?.term('exportOptions.scope') || 'Scope'}</label>
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
              <label>${this.localize?.term('exportOptions.dateRange') || 'Date Range'}</label>
              <div class="date-range">
                <uui-input
                  type="date"
                  label="${this.localize?.term('exportOptions.startDate') || 'Start Date'}"
                  .value="${this.exportOptions.startDate || ''}"
                  @change="${(e: Event) => this.#handleDateChange('startDate', e)}"
                  ?disabled="${this.disabled}"
                ></uui-input>
                
                <span class="date-separator">${this.localize?.term('exportOptions.to') || 'to'}</span>
                
                <uui-input
                  type="date"
                  label="${this.localize?.term('exportOptions.endDate') || 'End Date'}"
                  .value="${this.exportOptions.endDate || ''}"
                  @change="${(e: Event) => this.#handleDateChange('endDate', e)}"
                  ?disabled="${this.disabled}"
                ></uui-input>
              </div>
            </div>
          ` : ''}

          <!-- Timezone -->
          <div class="form-group">
            <label for="export-timezone">${this.localize?.term('exportOptions.timezone') || 'Timezone'}</label>
            <uui-select 
              id="export-timezone"
              .value="${this.exportOptions.timezone}"
              @change="${this.#handleTimezoneChange}"
              ?disabled="${this.disabled}"
            >
              <uui-option value="UTC">${this.localize?.term('timezones.utc') || 'UTC'}</uui-option>
              <uui-option value="Local">${this.localize?.term('timezones.local') || 'Local Time'}</uui-option>
              <uui-option value="Europe/London">${this.localize?.term('timezones.europeLondon') || 'Europe/London'}</uui-option>
              <uui-option value="America/New_York">${this.localize?.term('timezones.americaNewYork') || 'America/New_York'}</uui-option>
              <uui-option value="Asia/Tokyo">${this.localize?.term('timezones.asiaTokyo') || 'Asia/Tokyo'}</uui-option>
            </uui-select>
          </div>
        </div>

        <!-- Metric Selection -->
        <div class="metric-selection">
          <h5>${this.localize?.term('exportOptions.includeMetrics') || 'Include Metrics'}</h5>
          <div class="metric-toggles">
            <uui-toggle 
              label="${this.localize?.term('exportOptions.performanceMetrics') || 'Performance Metrics'}"
              .checked="${this.exportOptions.includePerformanceMetrics}"
              @change="${() => this.#handleMetricToggle('includePerformanceMetrics')}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="${this.localize?.term('exportOptions.umbracoMetrics') || 'Umbraco Metrics'}"
              .checked="${this.exportOptions.includeUmbracoMetrics}"
              @change="${() => this.#handleMetricToggle('includeUmbracoMetrics')}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="${this.localize?.term('exportOptions.activeRequests') || 'Active Requests'}"
              .checked="${this.exportOptions.includeActiveRequests}"
              @change="${() => this.#handleMetricToggle('includeActiveRequests')}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
          </div>
        </div>

        <!-- Estimated Size -->
        <div class="estimated-size">
          <uui-icon name="icon-info"></uui-icon>
          ${this.localize?.term('export.estimatedFileSize') || 'Estimated file size'}: <strong>${this.estimatedSize}</strong>
        </div>
      </div>
    `;
  }

  static styles = css`${unsafeCSS(styles)}`;
}

export default ExportOptionsElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-export-options": ExportOptionsElement;
  }
}