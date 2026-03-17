import {
 
  html,
  customElement,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbModalElement } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { MetricsExportService } from "../services/metrics-export.service.js";
import { UUIModalElement } from "@umbraco-cms/backoffice/external/uui";
import './export-progress.element.js';

@customElement("umbmetrics-cleanup-dialog")
export class UmbMetricsECleanupDialogElement extends UmbElementMixin(UmbModalElement) {
  modalContext: any;

  @state()
  private _isCleaning: boolean = false;

  @state()
  private _cleanProgress: number = 0;

 



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

    
  }



  #handleCleanup = async () => {
    if (!this.#exportService || this._isCleaning) {
      return;
    }

    this._isCleaning = true;
    this._cleanProgress = 0;

    try {
      // Start progress timer that increments every 100ms up to 90%
      const progressInterval = setInterval(() => {
        if (this._cleanProgress < 90) {
          this._cleanProgress += 1;
        }
      }, 100);

      this._cleanProgress = 1;
      
      // Call cleanup API
      await this.#exportService.cleanupHistoricalData();
      
      // Clear progress timer and set to 100%
      clearInterval(progressInterval);
      this._cleanProgress = 100;
      
      if (this.#notificationContext) {
        this.#notificationContext.peek("positive", {
          data: {
            headline: this.localize?.term('cleanup_cleanupComplete') || 'Cleanup Complete',
            message: `${this.localize?.term('cleanup_cleanupCompleteSuccessfully') || 'Cleanup Complete successfully'} `,
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
      console.error('Cleanup error:', error);
      
      if (this.#notificationContext) {
        this.#notificationContext.peek("danger", {
          data: {
            headline: this.localize?.term('cleanup_cleanupFailed') || 'Cleanup Failed',
            message: error instanceof Error 
              ? error.message 
              : this.localize?.term('cleanup_failedToCleanup') || 'Failed to cleanup metrics. Please try again.',
          },
        });
      }
      
      this._isCleaning = false;
      this._cleanProgress = 0;
    }
  };
  #handleCancel = () => {
    if (this.modalContext) {
      this.modalContext.reject();
    }
  };

  render() {
    return html`
      <umb-modal-dialog>
        <umb-body-layout headline="${this.localize?.term('cleanup_title') || 'Cleanup Metrics'}">
          <div id="main">        
            <umbmetrics-progress
              .isExporting="${this._isCleaning}"
              .progress="${this._cleanProgress}"
                .text="${this.localize?.term('cleanup_cleaning') || 'Cleaning...'}"
            ></umbmetrics-progress>
          </div>          
          <div slot="actions">
            <uui-button 
              look="secondary"
              @click="${this.#handleCancel}"
              ?disabled="${this._isCleaning}"
            >
              ${this.localize?.term('cleanup_cancel') || 'Cancel'}
            </uui-button>            
            <uui-button 
              look="primary"
              color="positive"
              @click="${this.#handleCleanup}"
              ?disabled="${this._isCleaning  }"
            >
              ${this._isCleaning ? html`
                <uui-icon name="icon-time"></uui-icon>
                ${this.localize?.term('cleanup_cleaning') || 'Cleaning Up...'}
              ` : html`
                <uui-icon name="icon-trash"></uui-icon>
                ${this.localize?.term('cleanup_cleanupMetrics') || 'Cleanup Metrics'}
              `}
            </uui-button>
          </div>
        </umb-body-layout>
      </umb-modal-dialog>
    `;
  }

  static styles = [...UUIModalElement.styles];
}

export default UmbMetricsECleanupDialogElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-cleanup-dialog": UmbMetricsECleanupDialogElement;
  }
}
