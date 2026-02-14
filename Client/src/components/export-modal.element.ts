import {
  css,
  html,
  customElement,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbModalElement } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { MetricsExportService } from "../services/metrics-export.service.js";
import { ExportFormat, ExportScope, ExportOptions } from "../types/export-options.js";
import { UUIModalElement } from "@umbraco-cms/backoffice/external/uui";

@customElement("umbmetrics-export-modal")
export class UmbMetricsExportModalElement extends UmbModalElement {
  modalContext: any;

  @state()
  private _isExporting: boolean = false;

  @state()
  private _exportProgress: number = 0;

  @state()
  private _exportOptions: ExportOptions = {
    format: ExportFormat.Csv,
    scope: ExportScope.Current,
    includePerformanceMetrics: true,
    includeUmbracoMetrics: true,
    includeActiveRequests: false,
    timezone: 'UTC'
  };

  @state()
  private _estimatedSize: string = '';

  #exportService?: MetricsExportService;
  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

  constructor() {
    super();

    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (notificationContext) => {
      this.#notificationContext = notificationContext;
    });

    this.consumeContext(UMB_AUTH_CONTEXT, (authContext) => {
      this.#exportService = new MetricsExportService(async () => {
        const token = await authContext?.getLatestToken();
        if (!token) {
          throw new Error('No authentication token available');
        }
        return token;
      });
    });

    // Calculate initial estimated size
    this.#updateEstimatedSize();
  }

  #updateEstimatedSize() {
    if (this.#exportService) {
      this._estimatedSize = this.#exportService.estimateFileSize(this._exportOptions);
    }
  }

  #handleFormatChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    this._exportOptions = {
      ...this._exportOptions,
      format: select.value as ExportFormat
    };
    this.#updateEstimatedSize();
  };

  #handleScopeChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    this._exportOptions = {
      ...this._exportOptions,
      scope: select.value as ExportScope
    };
  };

  #handleMetricToggle = (metric: keyof ExportOptions) => {
    this._exportOptions = {
      ...this._exportOptions,
      [metric]: !this._exportOptions[metric]
    };
    this.#updateEstimatedSize();
  };

  #handleDateChange = (dateField: 'startDate' | 'endDate', value: string) => {
    this._exportOptions = {
      ...this._exportOptions,
      [dateField]: value || undefined
    };
  };

  #handleTimezoneChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    this._exportOptions = {
      ...this._exportOptions,
      timezone: select.value
    };
  };

  #handleExport = async () => {
    if (!this.#exportService || this._isExporting) {
      return;
    }

    this._isExporting = true;
    this._exportProgress = 10;

    try {
      // Validate date range if custom scope
      if (this._exportOptions.scope === ExportScope.Custom) {
        if (!this._exportOptions.startDate || !this._exportOptions.endDate) {
          throw new Error('Both start and end dates are required for custom range');
        }
        
        const start = new Date(this._exportOptions.startDate);
        const end = new Date(this._exportOptions.endDate);
        
        if (start > end) {
          throw new Error('Start date must be before end date');
        }
      }

      this._exportProgress = 30;
      
      await this.#exportService.exportMetrics(this._exportOptions);
      
      this._exportProgress = 100;
      
      if (this.#notificationContext) {
        this.#notificationContext.peek("positive", {
          data: {
            headline: "Export Complete",
            message: `Metrics exported successfully (${this._estimatedSize})`,
          },
        });
      }

      // Close modal after short delay
      setTimeout(() => {
        if (this.modalContext) {
          this.modalContext.submit();
        }
      }, 1000);

    } catch (error) {
      console.error('Export error:', error);
      
      if (this.#notificationContext) {
        this.#notificationContext.peek("danger", {
          data: {
            headline: "Export Failed",
            message: error instanceof Error 
              ? error.message 
              : "Failed to export metrics. Please try again.",
          },
        });
      }
      
      this._isExporting = false;
      this._exportProgress = 0;
    }
  };

  #handleQuickExport = async (format: ExportFormat) => {
    if (!this.#exportService || this._isExporting) {
      return;
    }

    this._isExporting = true;

    try {
      await this.#exportService.quickExport(true, true, format);
      
      if (this.#notificationContext) {
        this.#notificationContext.peek("positive", {
          data: {
            headline: "Export Complete",
            message: `Quick export to ${format.toUpperCase()} completed`,
          },
        });
      }

      // Close modal
      if (this.modalContext) {
        this.modalContext.submit();
      }

    } catch (error) {
      console.error('Quick export error:', error);
      
      if (this.#notificationContext) {
        this.#notificationContext.peek("danger", {
          data: {
            headline: "Export Failed",
            message: error instanceof Error 
              ? error.message 
              : "Failed to export metrics",
          },
        });
      }
    } finally {
      this._isExporting = false;
    }
  };

  #handleCancel = () => {
    if (this.modalContext) {
      this.modalContext.reject();
    }
  };

  #renderQuickExportButtons() {
    return html`
      <div class="quick-export-section">
        <h4>Quick Export</h4>
        <p class="description">Export all metrics with one click</p>
        
        <div class="quick-export-buttons">
          <uui-button 
            look="primary" 
            color="positive"
            @click="${() => this.#handleQuickExport(ExportFormat.Csv)}"
            ?disabled="${this._isExporting}"
          >
            <uui-icon name="icon-download"></uui-icon>
            Export as CSV
          </uui-button>
          
          <uui-button 
            look="outline"
            @click="${() => this.#handleQuickExport(ExportFormat.Json)}"
            ?disabled="${this._isExporting}"
          >
            <uui-icon name="icon-download"></uui-icon>
            Export as JSON
          </uui-button>
        </div>
      </div>
  `;
  }

  #renderExportOptions() {
    const formatOptions = this.#exportService?.getSupportedFormats() || [];
    const scopeOptions = this.#exportService?.getScopeOptions() || [];

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
              .value="${this._exportOptions.format}"
              @change="${this.#handleFormatChange}"
              ?disabled="${this._isExporting}"
            >
              ${formatOptions.map(option => html`
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
              .value="${this._exportOptions.scope}"
              @change="${this.#handleScopeChange}"
              ?disabled="${this._isExporting}"
            >
              ${scopeOptions.map(option => html`
                <uui-option value="${option.value}">
                  ${option.label}
                </uui-option>
              `)}
            </uui-select>
          </div>

          <!-- Date Range (only for custom scope) -->
          ${this._exportOptions.scope === ExportScope.Custom ? html`
            <div class="form-group span-2">
              <label>Date Range</label>
              <div class="date-range">
                <uui-input
                  type="date"
                  label="Start Date"
                  .value="${this._exportOptions.startDate || ''}"
                  @change="${(e: Event) => this.#handleDateChange('startDate', (e.target as HTMLInputElement).value)}"
                  ?disabled="${this._isExporting}"
                ></uui-input>
                
                <span class="date-separator">to</span>
                
                <uui-input
                  type="date"
                  label="End Date"
                  .value="${this._exportOptions.endDate || ''}"
                  @change="${(e: Event) => this.#handleDateChange('endDate', (e.target as HTMLInputElement).value)}"
                  ?disabled="${this._isExporting}"
                ></uui-input>
              </div>
            </div>
          ` : ''}

          <!-- Timezone -->
          <div class="form-group">
            <label for="export-timezone">Timezone</label>
            <uui-select 
              id="export-timezone"
              .value="${this._exportOptions.timezone}"
              @change="${this.#handleTimezoneChange}"
              ?disabled="${this._isExporting}"
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
              .checked="${this._exportOptions.includePerformanceMetrics}"
              @change="${() => this.#handleMetricToggle('includePerformanceMetrics')}"
              ?disabled="${this._isExporting}"
            ></uui-toggle>
            
            <uui-toggle 
              label="Umbraco Metrics"
              .checked="${this._exportOptions.includeUmbracoMetrics}"
              @change="${() => this.#handleMetricToggle('includeUmbracoMetrics')}"
              ?disabled="${this._isExporting}"
            ></uui-toggle>
            
            <uui-toggle 
              label="Active Requests"
              .checked="${this._exportOptions.includeActiveRequests}"
              @change="${() => this.#handleMetricToggle('includeActiveRequests')}"
              ?disabled="${this._isExporting}"
            ></uui-toggle>
          </div>
        </div>

        <!-- Estimated Size -->
        <div class="estimated-size">
          <uui-icon name="icon-info"></uui-icon>
          Estimated file size: <strong>${this._estimatedSize}</strong>
        </div>
      </div>
    `;
  }

  #renderProgressBar() {
    if (!this._isExporting) return '';

    return html`
      <div class="export-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${this._exportProgress}%"></div>
        </div>
        <div class="progress-text">
          Exporting... ${this._exportProgress}%
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <umb-modal-sidebar>
        <umb-body-layout headline="Export Metrics">
          <div id="main">
            ${this.#renderQuickExportButtons()}
            
            <div class="divider">
              <span>or</span>
            </div>
            
            ${this.#renderExportOptions()}
            
            ${this.#renderProgressBar()}
          </div>
          
          <div slot="actions">
            <uui-button 
              look="secondary"
              @click="${this.#handleCancel}"
              ?disabled="${this._isExporting}"
            >
              Cancel
            </uui-button>
            
            <uui-button 
              look="primary"
              color="positive"
              @click="${this.#handleExport}"
              ?disabled="${this._isExporting || (!this._exportOptions.includePerformanceMetrics && !this._exportOptions.includeUmbracoMetrics)}"
            >
              ${this._isExporting ? html`
                <uui-icon name="icon-time"></uui-icon>
                Exporting...
              ` : html`
                <uui-icon name="icon-download"></uui-icon>
                Export Metrics
              `}
            </uui-button>
          </div>
        </umb-body-layout>
      </umb-modal-sidebar>
    `;
  }

  static styles = [...UUIModalElement.styles, css`
   

    #main {
      padding: var(--uui-size-space-5);
    }

    .quick-export-section,
    .export-options-section {
      margin-bottom: var(--uui-size-space-5);
    }

    h4 {
      margin: 0 0 var(--uui-size-space-2) 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--uui-color-text);
    }

    h5 {
      margin: var(--uui-size-space-4) 0 var(--uui-size-space-2) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--uui-color-text-alt);
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

    .divider {
      display: flex;
      align-items: center;
      margin: var(--uui-size-space-5) 0;
      text-align: center;
      color: var(--uui-color-text-alt);
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--uui-color-border);
    }

    .divider span {
      padding: 0 var(--uui-size-space-3);
      font-size: 0.875rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--uui-size-space-4);
      margin-bottom: var(--uui-size-space-4);
    }

    .form-group.span-2 {
      grid-column: span 2;
    }

    .form-group label {
      display: block;
      margin-bottom: var(--uui-size-space-1);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--uui-color-text-alt);
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
      background: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
      padding: var(--uui-size-space-4);
      margin-bottom: var(--uui-size-space-4);
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
      padding: var(--uui-size-space-3) var(--uui-size-space-4);
      background: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
      font-size: 0.875rem;
      color: var(--uui-color-text-alt);
    }

    .estimated-size uui-icon {
      color: var(--uui-color-interactive);
    }

    .estimated-size strong {
      color: var(--uui-color-text);
    }

    .export-progress {
      margin-top: var(--uui-size-space-5);
      padding: var(--uui-size-space-4);
      background: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
    }

    .progress-bar {
      height: 8px;
      background: var(--uui-color-border);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: var(--uui-size-space-2);
    }

    .progress-fill {
      height: 100%;
      background: var(--uui-color-positive);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-text {
      text-align: center;
      font-size: 0.875rem;
      color: var(--uui-color-text-alt);
    }

    @media (max-width: 600px) {
      :host {
        min-width: auto;
        max-width: 100%;
      }

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

      .quick-export-buttons {
        flex-direction: column;
      }
    }
  `];
}

export default UmbMetricsExportModalElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-export-modal": UmbMetricsExportModalElement;
  }
}
