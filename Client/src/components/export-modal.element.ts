import {
  css,
  unsafeCSS,
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
import stylesString from '../css/export-modal.styles.css?inline';

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
          throw new Error(this.localize?.term('validation.bothDatesRequired') || 'Both start and end dates are required for custom range');
        }
        
        const start = new Date(this._exportOptions.startDate);
        const end = new Date(this._exportOptions.endDate);
        
        if (start > end) {
          throw new Error(this.localize?.term('validation.startDateBeforeEndDate') || 'Start date must be before end date');
        }
      }

      this._exportProgress = 30;
      
      await this.#exportService.exportMetrics(this._exportOptions);
      
      this._exportProgress = 100;
      
      if (this.#notificationContext) {
        this.#notificationContext.peek("positive", {
          data: {
            headline: this.localize?.term('export.exportComplete') || 'Export Complete',
            message: `${this.localize?.term('export.metricsExportedSuccessfully') || 'Metrics exported successfully'} (${this._estimatedSize})`,
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
            headline: this.localize?.term('export.exportFailed') || 'Export Failed',
            message: error instanceof Error 
              ? error.message 
              : this.localize?.term('export.failedToExportMetrics') || 'Failed to export metrics. Please try again.',
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
            headline: this.localize?.term('export.exportComplete') || 'Export Complete',
            message: `${this.localize?.term('export.quickExportCompleted') || 'Quick export to'} ${format.toUpperCase()} ${this.localize?.term('export.completed') || 'completed'}`,
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
            headline: this.localize?.term('export.exportFailed') || 'Export Failed',
            message: error instanceof Error 
              ? error.message 
              : this.localize?.term('export.failedToExportMetrics') || 'Failed to export metrics',
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
    // Get format and scope options from service or use defaults
    const formatOptions = this.#exportService?.getSupportedFormats() || [
      { value: ExportFormat.Json, label: this.localize?.term('formats.json') || 'JSON', description: this.localize?.term('formats.jsonDescription') || 'Structured data format' },
      { value: ExportFormat.Csv, label: this.localize?.term('formats.csv') || 'CSV', description: this.localize?.term('formats.csvDescription') || 'Spreadsheet format' },
      { value: ExportFormat.Xml, label: this.localize?.term('formats.xml') || 'XML', description: this.localize?.term('formats.xmlDescription') || 'Markup format' }
    ];
    
    const scopeOptions = this.#exportService?.getScopeOptions() || [
      { value: ExportScope.Current, label: this.localize?.term('exportOptions.currentSnapshot') || 'Current Snapshot', description: this.localize?.term('exportOptions.exportCurrentMetricsOnly') || 'Export current metrics only' },
      { value: ExportScope.Historical, label: this.localize?.term('exportOptions.historicalData') || 'Historical Data', description: this.localize?.term('exportOptions.exportHistoricalMetrics') || 'Export historical metrics' },
      { value: ExportScope.Custom, label: this.localize?.term('exportOptions.customRange') || 'Custom Range', description: this.localize?.term('exportOptions.exportMetricsFromSpecificDateRange') || 'Export metrics from specific date range' }
    ];

    return html`
      <umb-modal-sidebar>
        <umb-body-layout headline="${this.localize?.term('export.title') || 'Export Metrics'}">
          <div id="main">
            <umbmetrics-quick-export-buttons
              .disabled="${this._isExporting}"
              .onCsvExport="${() => this.#handleQuickExport(ExportFormat.Csv)}"
              .onJsonExport="${() => this.#handleQuickExport(ExportFormat.Json)}"
            ></umbmetrics-quick-export-buttons>
            
            <div class="divider">
              <span>${this.localize?.term('common.or') || 'or'}</span>
            </div>
            
            <umbmetrics-export-options
              .exportOptions="${this._exportOptions}"
              .disabled="${this._isExporting}"
              .estimatedSize="${this._estimatedSize}"
              .formatOptions="${formatOptions}"
              .scopeOptions="${scopeOptions}"
              .onFormatChange="${(format: ExportFormat) => {
                this._exportOptions = { ...this._exportOptions, format };
                this.#updateEstimatedSize();
              }}"
              .onScopeChange="${(scope: ExportScope) => {
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
              ${this.localize?.term('export.cancel') || 'Cancel'}
            </uui-button>
            
            <uui-button 
              look="primary"
              color="positive"
              @click="${this.#handleExport}"
              ?disabled="${this._isExporting || (!this._exportOptions.includePerformanceMetrics && !this._exportOptions.includeUmbracoMetrics)}"
            >
              ${this._isExporting ? html`
                <uui-icon name="icon-time"></uui-icon>
                ${this.localize?.term('export.exporting') || 'Exporting...'}
              ` : html`
                <uui-icon name="icon-download"></uui-icon>
                ${this.localize?.term('export.exportMetrics') || 'Export Metrics'}
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
