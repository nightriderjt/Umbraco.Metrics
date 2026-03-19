import {
  html,
  customElement,
  state,
  css
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbModalElement } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { MetricsExportService } from "../services/metrics-export.service.js";

import './export-progress.element.js';


@customElement("umbmetrics-cleanup-dialog")
export class UmbMetricsECleanupDialogElement extends UmbElementMixin(UmbModalElement) {
  static styles = css`
    .retention-options {
      margin-bottom: var(--uui-size-space-4);
    }
    
    .retention-option {
      margin-bottom: var(--uui-size-space-2);
    }
    
    .custom-retention-input {
      margin-top: var(--uui-size-space-2);
    }
    
    uui-button[slot="actions"] {
      margin-left: var(--uui-size-space-2);
    }
  `;

  modalContext: any;
  @state()
  private _isCleaning: boolean = false;
  @state()
  private _cleanProgress: number = 0;
  @state()
  private _retentionOption: 'default' | 'custom' = 'default';
  @state()
  private _customRetentionDays: number = 30;
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
      
      // Determine retention days based on selection
      const retentionDays = this._retentionOption === 'custom' 
        ? this._customRetentionDays 
        : undefined;
      
      // Call cleanup API with optional retention days
      await this.#exportService.cleanupHistoricalData(retentionDays);
      
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
      <umb-modal-sidebar>
        <umb-body-layout headline="${this.localize?.term('cleanup_title') || 'Cleanup Metrics'}">
          <div id="main">
            ${!this._isCleaning ? html`
              <div class="retention-options">
                <div class="retention-option">
                  <uui-radio
                    name="retentionOption"
                    value="default"
                    .checked="${this._retentionOption === 'default'}"
                    @change="${() => this._retentionOption = 'default'}"
                  >
                    <strong>${this.localize?.term('cleanup_useDefaultRetention') || 'Use default retention period'}</strong>
                    <div>${this.localize?.term('cleanup_defaultRetentionDescription') || 'Clean up data older than the configured default retention period (usually 30 days)'}</div>
                  </uui-radio>
                </div>
                
                <div class="retention-option">
                  <uui-radio
                    name="retentionOption"
                    value="custom"
                    .checked="${this._retentionOption === 'custom'}"
                    @change="${() => this._retentionOption = 'custom'}"
                  >
                    <div style="display: flex; align-items: center; gap: var(--uui-size-space-1);">
                      <strong>${this.localize?.term('cleanup_customRetention') || 'Custom retention period'}</strong>
                      <uui-icon
                        name="icon-info"                      
                        title="${this.localize?.term('cleanup_customRetentionHelp') || 'Enter number of days to keep historical metrics data (1-365)'}"
                      ></uui-icon>
                    </div>
                    <div>${this.localize?.term('cleanup_customRetentionDescription') || 'Specify a custom number of days to keep data'}</div>
                  </uui-radio>
                  
                  ${this._retentionOption === 'custom' ? html`
                    <div class="custom-retention-input">
                      <uui-input
                        type="number"
                        min="1"
                        max="365"
                        .value="${this._customRetentionDays.toString()}"
                        @change="${(e: Event) => {
                          const input = e.target as HTMLInputElement;
                          const value = parseInt(input.value);
                          if (!isNaN(value) && value >= 1 && value <= 365) {
                            this._customRetentionDays = value;
                          }
                        }}"
                        placeholder="${this.localize?.term('cleanup_retentionDaysPlaceholder') || 'Number of days'}"
                       
                      >                      
                      </uui-input>
                    </div>
                  ` : ''}
                </div>
              </div>
            ` : ''}
            
            ${this._isCleaning ? html`     
              <umbmetrics-progress
                .isProgress="${this._isCleaning}"
                .progress="${this._cleanProgress}"
                .text="${this.localize?.term('cleanup_cleaning') || 'Cleaning...'}"
              ></umbmetrics-progress>
            ` : html``}  
          </div>

          <umb-footer-layout  slot="footer"> 

<uui-button 
              look="secondary"
              @click="${this.#handleCancel}"
              ?disabled="${this._isCleaning}"
              slot="actions"
            >
              ${this.localize?.term('cleanup_cancel') || 'Cancel'}
            </uui-button>            
            <uui-button 
            slot="actions"
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
          </umb-footer-layout>
        </umb-body-layout>
      </umb-modal-sidebar>
    `;
  }

 
}

export default UmbMetricsECleanupDialogElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-cleanup-dialog": UmbMetricsECleanupDialogElement;
  }
}
