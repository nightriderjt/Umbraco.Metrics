import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import {   ExportOptions } from "../types/export-options.js";
import styles from '../css/export-options.styles.css?inline';

@customElement("umbmetrics-export-options")
export class ExportOptionsElement extends UmbElementMixin(LitElement) {
  @property({ type: Object })
  exportOptions: ExportOptions = {
    format: 'csv',
    scope: 'current',
    includePerformanceMetrics: true,
    includeUmbracoMetrics: true,
    includeActiveRequests: false,
    timezone: 'UTC'
  };

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  estimatedSize: string = '';


  formatOptions: Array<Option> = [
 { value: 'csv', name: this.localize?.term('formats_csv') || 'CSV' },
 { value: 'json', name: this.localize?.term('formats_json') || 'JSON' },
{ value: 'xml', name: this.localize?.term('formats_xml') || 'XML' }
  ];


  scopeOptions: Array<Option> = [{ value: 'current', name: this.localize?.term('exportOptions_currentSnapshot') || 'Current Snapshot' },
    { value: 'historical', name: this.localize?.term('exportOptions_historicalData') || 'Historical Data' },
    { value: 'custom', name: this.localize?.term('exportOptions_customRange') || 'Custom Range'}];

  @property({ type: Function })
  onFormatChange?: (format: string) => void;

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
      this.onFormatChange(select.value as string);
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
        <h4>${this.localize?.term('export_customExport') || 'Custom Export'}</h4>
        <p class="description">${this.localize?.term('export_customExportDescription') || 'Configure export options'}</p>
        
        <div class="form-grid">
          <!-- Format Selection -->
          <div class="form-group">
            <label for="export-format">${this.localize?.term('exportOptions_format') || 'Format'}</label>
            <uui-select 
              id="export-format"
              .value="${this.exportOptions.format}"
              @change="${this.#handleFormatChange}"
              ?disabled="${this.disabled}"
              .options="${this.formatOptions}"
            >           
            </uui-select>
          </div>

          <!-- Scope Selection -->
          <div class="form-group">
            <label for="export-scope">${this.localize?.term('exportOptions_scope') || 'Scope'}</label>
            <uui-select 
              id="export-scope"
              .value="${this.exportOptions.scope}"
              @change="${this.#handleScopeChange}"
              ?disabled="${this.disabled}"
            >            
            </uui-select>
          </div>

          <!-- Date Range (only for custom scope) -->
          ${this.exportOptions.scope === ExportScope.Custom ? html`
            <div class="form-group span-2">
              <label>${this.localize?.term('exportOptions_dateRange') || 'Date Range'}</label>
              <div class="date-range">
                <uui-input
                  type="date"
                  label="${this.localize?.term('exportOptions_startDate') || 'Start Date'}"
                  .value="${this.exportOptions.startDate || ''}"
                  @change="${(e: Event) => this.#handleDateChange('startDate', e)}"
                  ?disabled="${this.disabled}"
                ></uui-input>
                
                <span class="date-separator">${this.localize?.term('exportOptions_to') || 'to'}</span>
                
                <uui-input
                  type="date"
                  label="${this.localize?.term('exportOptions_endDate') || 'End Date'}"
                  .value="${this.exportOptions.endDate || ''}"
                  @change="${(e: Event) => this.#handleDateChange('endDate', e)}"
                  ?disabled="${this.disabled}"
                ></uui-input>
              </div>
            </div>
          ` : ''}

          <!-- Timezone -->
          <div class="form-group">
            <label for="export-timezone">${this.localize?.term('exportOptions_timezone') || 'Timezone'}</label>
            <uui-select 
              id="export-timezone"
              .value="${this.exportOptions.timezone}"
              @change="${this.#handleTimezoneChange}"
              ?disabled="${this.disabled}"
            >
              <uui-option value="UTC">${this.localize?.term('timezones_utc') || 'UTC'}</uui-option>
              <uui-option value="Local">${this.localize?.term('timezones_local') || 'Local Time'}</uui-option>
              <uui-option value="Europe/London">${this.localize?.term('timezones_europeLondon') || 'Europe/London'}</uui-option>
              <uui-option value="America/New_York">${this.localize?.term('timezones_americaNewYork') || 'America/New_York'}</uui-option>
              <uui-option value="Asia/Tokyo">${this.localize?.term('timezones_asiaTokyo') || 'Asia/Tokyo'}</uui-option>
            </uui-select>
          </div>
        </div>

        <!-- Metric Selection -->
        <div class="metric-selection">
          <h5>${this.localize?.term('exportOptions_includeMetrics') || 'Include Metrics'}</h5>
          <div class="metric-toggles">
            <uui-toggle 
              label="${this.localize?.term('exportOptions_performanceMetrics') || 'Performance Metrics'}"
              .checked="${this.exportOptions.includePerformanceMetrics}"
              @change="${() => this.#handleMetricToggle('includePerformanceMetrics')}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="${this.localize?.term('exportOptions_umbracoMetrics') || 'Umbraco Metrics'}"
              .checked="${this.exportOptions.includeUmbracoMetrics}"
              @change="${() => this.#handleMetricToggle('includeUmbracoMetrics')}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="${this.localize?.term('exportOptions_activeRequests') || 'Active Requests'}"
              .checked="${this.exportOptions.includeActiveRequests}"
              @change="${() => this.#handleMetricToggle('includeActiveRequests')}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
          </div>
        </div>

        <!-- Estimated Size -->
        <div class="estimated-size">
          <uui-icon name="icon-info"></uui-icon>
          ${this.localize?.term('export_estimatedFileSize') || 'Estimated file size'}: <strong>${this.estimatedSize}</strong>
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