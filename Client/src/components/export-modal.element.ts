import {
  css,
  unsafeCSS,
  html,
  customElement,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbModalElement } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { MetricsExportService } from "../services/metrics-export.service.js";
import {   ExportOptions } from "../types/export-options.js";
import { UUIModalElement } from "@umbraco-cms/backoffice/external/uui";
import stylesString from '../css/export-modal.styles.css?inline';

// Import child components
import './quick-export-buttons.element.js';
import './export-options.element.js';
import './export-progress.element.js';

@customElement("umbmetrics-export-modal")
export class UmbMetricsExportModalElement extends UmbElementMixin(UmbModalElement) {
  modalContext: any;

  @state()
  private _isExporting: boolean = false;

  @state()
  private _exportProgress: number = 0;

  @state()
  private _exportOptions: ExportOptions = {
    format: "csv",
    scope: 'current',
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

  #handleExport = async () => {
    if (!this.#exportService || this._isExporting) {
      return;
    }

    this._isExporting = true;
    this._exportProgress = 10;

    try {
      // Validate date range if custom scope
      if (this._exportOptions.scope === 'custom') {
        if (!this._exportOptions.startDate || !this._exportOptions.endDate) {
          throw new Error(this.localize?.term('validation_bothDatesRequired') || 'Both start and end dates are required for custom range');
        }
        
        const start = new Date(this._exportOptions.startDate);
        const end = new Date(this._exportOptions.endDate);
        
        if (start > end) {
          throw new Error(this.localize?.term('validation_startDateBeforeEndDate') || 'Start date must be before end date');
        }
      }

      this._exportProgress = 30;
      
      await this.#exportService.exportMetrics(this._exportOptions);
      
      this._exportProgress = 100;
      
      if (this.#notificationContext) {
        this.#notificationContext.peek("positive", {
          data: {
            headline: this.localize?.term('export_exportComplete') || 'Export Complete',
            message: `${this.localize?.term('export_metricsExportedSuccessfully') || 'Metrics exported successfully'} (${this._estimatedSize})`,
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
            headline: this.localize?.term('export_exportFailed') || 'Export Failed',
            message: error instanceof Error 
              ? error.message 
              : this.localize?.term('export_failedToExportMetrics') || 'Failed to export metrics. Please try again.',
          },
        });
      }
      
      this._isExporting = false;
      this._exportProgress = 0;
    }
  };

  #handleQuickExport = async (format: string) => {
    if (!this.#exportService || this._isExporting) {
      return;
    }

    this._isExporting = true;

    try {
      await this.#exportService.quickExport(true, true, format);
      
      if (this.#notificationContext) {
        this.#notificationContext.peek("positive", {
          data: {
            headline: this.localize?.term('export_exportComplete') || 'Export Complete',
            message: `${this.localize?.term('export_quickExportCompleted') || 'Quick export to'} ${format.toUpperCase()} ${this.localize?.term('export_completed') || 'completed'}`,
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
            headline: this.localize?.term('export_exportFailed') || 'Export Failed',
            message: error instanceof Error 
              ? error.message 
              : this.localize?.term('export_failedToExportMetrics') || 'Failed to export metrics',
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

  render() {
    return html`
      <umb-modal-sidebar>
        <umb-body-layout headline="${this.localize?.term('export_title') || 'Export Metrics'}">
          <div id="main">
            <umbmetrics-quick-export-buttons
              ?disabled="${this._isExporting}"
              .onCsvExport="${() => this.#handleQuickExport('csv')}"
              .onJsonExport="${() => this.#handleQuickExport('csv')}"
            ></umbmetrics-quick-export-buttons>
            
            <div class="divider">
              <span>${this.localize?.term('common_or') || 'or'}</span>
            </div>
            
            <umbmetrics-export-options
              .exportOptions="${this._exportOptions}"
              ?disabled="${this._isExporting}"
              .estimatedSize="${this._estimatedSize}"     
              .onFormatChange="${(format: string) => {
                this._exportOptions = { ...this._exportOptions, format };
                this.#updateEstimatedSize();
              }}"
              .onScopeChange="${(scope: string) => {
                this._exportOptions = { ...this._exportOptions, scope };
              }}"
              .onMetricToggle="${(metric: keyof ExportOptions) => {
                this._exportOptions = {
                  ...this._exportOptions,
                  [metric]: !this._exportOptions[metric]
                };
                this.#updateEstimatedSize();
              }}"
              .onDateChange="${(dateField: 'startDate' | 'endDate', value: string) => {
                this._exportOptions = {
                  ...this._exportOptions,
                  [dateField]: value || undefined
                };
              }}"
              .onTimezoneChange="${(timezone: string) => {
                this._exportOptions = { ...this._exportOptions, timezone };
              }}"
            ></umbmetrics-export-options>
            
            <umbmetrics-export-progress
              .isExporting="${this._isExporting}"
              .progress="${this._exportProgress}"
            ></umbmetrics-export-progress>
          </div>
          
          <div slot="actions">
            <uui-button 
              look="secondary"
              @click="${this.#handleCancel}"
              ?disabled="${this._isExporting}"
            >
              ${this.localize?.term('export_cancel') || 'Cancel'}
            </uui-button>
            
            <uui-button 
              look="primary"
              color="positive"
              @click="${this.#handleExport}"
              ?disabled="${this._isExporting || (!this._exportOptions.includePerformanceMetrics && !this._exportOptions.includeUmbracoMetrics)}"
            >
              ${this._isExporting ? html`
                <uui-icon name="icon-time"></uui-icon>
                ${this.localize?.term('export_exporting') || 'Exporting...'}
              ` : html`
                <uui-icon name="icon-download"></uui-icon>
                ${this.localize?.term('export_exportMetrics') || 'Export Metrics'}
              `}
            </uui-button>
          </div>
        </umb-body-layout>
      </umb-modal-sidebar>
    `;
  }

  static styles = [...UUIModalElement.styles, css`${unsafeCSS(stylesString)}`];
}

export default UmbMetricsExportModalElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-export-modal": UmbMetricsExportModalElement;
  }
}
