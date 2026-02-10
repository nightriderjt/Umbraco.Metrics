import { 
   
  css, 
  html, 
  customElement, 
    state, 
    unsafeCSS
} from '@umbraco-cms/backoffice/external/lit';
import {  UmbModalElement } from '@umbraco-cms/backoffice/modal';
import { ActiveRequestInfo } from '../types/active-request';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { UMB_AUTH_CONTEXT, UmbAuthContext } from '@umbraco-cms/backoffice/auth';
import { MetricsPerformanceService } from '../services/metrics-performance.service';
import { UUITagLook } from '../types/uui-tag-look';
import { UUIModalElement } from '@umbraco-cms/backoffice/external/uui';
import styles from './active-requests-sidebar.styles.css?inline';





@customElement('umbmetrics-active-requests-sidebar')
export class ActiveRequestsSidebarElement extends UmbModalElement {
  modalContext: any;


  constructor() {
    super();
   this.consumeContext(UMB_NOTIFICATION_CONTEXT, (notificationContext) => {
      this.#notificationContext = notificationContext;
    });

       this.consumeContext(UMB_AUTH_CONTEXT, (authContext) => {
          this.#authContext = authContext;          
          this.#metricsService = new MetricsPerformanceService(async () => {
            const token = await this.#authContext?.getLatestToken();
            if (!token) {
              throw new Error('No authentication token available');
            }
            return token;
          });
        });
  }
  @state()
  private _requests: ActiveRequestInfo[] = [];

  @state()
  private _loading: boolean = false;
  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;
  #authContext?: UmbAuthContext;
  #metricsService?: MetricsPerformanceService;
  @state()
  private _autoRefresh: boolean = false;

  private _refreshInterval?: number;

  connectedCallback(): void {
    super.connectedCallback();
    this._setupKeyboardNavigation();
    this.#loadActiveRequests();
  }
  #loadActiveRequests = async () => {
    if (!this.#metricsService) {
      console.error('Metrics service not initialized');
      return;
    }

    this._loading = true;
    try {
      this._requests = await this.#metricsService.getActiveRequests();
    } catch (error) {
      console.error("Error loading active requests:", error);
      if (this.#notificationContext) {
        this.#notificationContext.peek("danger", {
          data: {
            headline: "Error",
            message: error instanceof Error 
              ? error.message 
              : "Failed to load active requests",
          },
        });
      }
    } finally {
      this._loading = false;
    }
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopAutoRefresh();
    this._cleanupKeyboardNavigation();
  }

  private _setupKeyboardNavigation(): void {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this._rejectModal();
      }
    };

    document.addEventListener('keydown', keydownHandler);
    this._cleanupKeyboardNavigation = () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }

  private _cleanupKeyboardNavigation(): void {
    // Cleanup handled by the setup function
  }

   _rejectModal(): void {
    this.modalContext?.reject();
  }

   _submitModal(): void {
    this.modalContext?.submit();
  }

  

  private _toggleAutoRefresh(): void {
    this._autoRefresh = !this._autoRefresh;
    
    if (this._autoRefresh) {
      this._startAutoRefresh();
    } else {
      this._stopAutoRefresh();
    }
  }

  private _startAutoRefresh(): void {
    this._stopAutoRefresh(); // Clear any existing interval
    this._refreshInterval = window.setInterval(() => {
      this.#loadActiveRequests();
    }, 5000);
  }

  private _stopAutoRefresh(): void {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
      this._refreshInterval = undefined;
    }
  }

  private _formatDuration(ms: number): string {
    if (ms < 1000) return `${ms.toFixed(0)} ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)} s`;
    return `${(ms / 60000).toFixed(1)} min`;
  }

  
  private _getMethodLook(method: string): UUITagLook {
    switch (method.toUpperCase()) {
      case 'GET': return 'primary';
      case 'POST': return 'secondary';
      case 'PUT': return 'secondary';
      case 'DELETE': return 'outline';
      default: return 'default';
    }
  }
  private _truncateUserAgent(ua: string): string {
    if (ua.length > 50) {
      return ua.substring(0, 47) + '...';
    }
    return ua;
  }

  private _formatTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return dateString;
    }
  }

  render() {
    return html`
      <!-- Modal Layout Structure -->
      <umb-modal-container>
<umb-modal-sidebar>

<umb-body-layout headline="Active Requests">    

        <!-- Modal content -->
        <div class="modal-content">
          ${this._loading ? html`
            <div class="loading-state">
              <uui-loader></uui-loader>
              <p>Loading active requests...</p>
            </div>
          ` : this._requests.length === 0 ? html`
            <div class="empty-state">
              <uui-icon name="icon-check"></uui-icon>
              <h3>No active requests</h3>
              <p>All requests have completed</p>
            </div>
          ` : html`
            <!-- Requests summary -->
            <div class="requests-summary">
              <span class="summary-text">
                ${this._requests.length} active request${this._requests.length !== 1 ? 's' : ''}
              </span>
            </div>

            <!-- Requests list -->
            <div class="requests-container">
              ${this._requests.map((req) => html`
                <div class="request-item">
                  <!-- Request header with method, path, and duration -->
                  <div class="request-header">
                    <uui-tag look="${this._getMethodLook(req.method)}" class="method-tag">
                      ${req.method}
                    </uui-tag>
                    
                    <div class="request-main-info">
                      <span class="request-path" title="${req.path}${req.queryString}">
                        ${req.path}
                      </span>
                      <span class="request-duration">
                        ${this._formatDuration(req.durationMs)}
                      </span>
                    </div>
                  </div>

                  <!-- Request details -->
                  <div class="request-details">
                    <div class="detail-item">
                      <uui-icon name="icon-time"></uui-icon>
                      <span>${this._formatTime(req.startTime)}</span>
                    </div>
                    
                    ${req.queryString ? html`
                      <div class="detail-item">
                        <uui-icon name="icon-search"></uui-icon>
                        <span class="query-string">${req.queryString}</span>
                      </div>
                    ` : ''}
                    
                    <div class="detail-item">
                      <uui-icon name="icon-globe"></uui-icon>
                      <span>${req.remoteIp}</span>
                    </div>
                    
                    ${req.userAgent ? html`
                      <div class="detail-item">
                        <uui-icon name="icon-browser-window"></uui-icon>
                        <span title="${req.userAgent}">
                          ${this._truncateUserAgent(req.userAgent)}
                        </span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `)}
            </div>
          `}
        </div>
        <umb-footer-layout  slot="footer">  <uui-toggle class="align-center-self" slot="actions"
              label="Auto-refresh"
            .checked="${this._autoRefresh}"
            @change="${this._toggleAutoRefresh}"
          ></uui-toggle>    <uui-button slot="actions" color="positive" look="primary" @click="${this.#loadActiveRequests}">
            <uui-icon name="icon-refresh"></uui-icon>Refresh
          </uui-button>
         
<uui-button slot="actions" look="primary" color="danger" type="button" @click=${this._rejectModal}>Close</uui-button> 
        
           
        </umb-footer-layout>
      </umb-body-layout>
</umb-modal-sidebar>
 
      </umb-modal-container>
     
    `;
  }
 static customstyles = css`${unsafeCSS(styles)}`;
 
    static styles = [...UUIModalElement.styles,ActiveRequestsSidebarElement.customstyles, css``];
}

export default ActiveRequestsSidebarElement;

declare global {
  interface HTMLElementTagNameMap {
    'umbmetrics-active-requests-sidebar': ActiveRequestsSidebarElement;
  }
}