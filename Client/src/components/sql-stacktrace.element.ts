import {
  css,
  html,
  customElement,
  unsafeCSS,
  state,
} from '@umbraco-cms/backoffice/external/lit';
import { UmbModalElement } from '@umbraco-cms/backoffice/modal';
import { UUIModalElement } from '@umbraco-cms/backoffice/external/uui';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import type { UmbAuthContext } from '@umbraco-cms/backoffice/auth';
import type { SqlStackTrace } from '../types/performance-metrics.js';
import { MetricsPerformanceService } from '../services/metrics-performance.service.js';
import styles from '../css/sql-stacktrace.styles.css?inline';

@customElement('umbmetrics-sql-stacktrace')
export class SqlStacktraceElement extends UmbModalElement {
  modalContext: any;

  @state()
  private _stackTrace?: SqlStackTrace;

  @state()
  private _operationValue?: string;

  @state()
  private _loading: boolean = false;

  @state()
  private _error?: string;

  /** Set of node identifiers that are expanded */
  @state()
  private _expandedNodes: Set<string> = new Set();

  #authContext?: UmbAuthContext;
  #metricsService?: MetricsPerformanceService;

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._setupKeyboardNavigation();

    // Get modal data
    if (this.modalContext) {
      const data = this.modalContext.data;
      if (data) {
        this._operationValue = data.operationValue;
        const operationKey = data.operationKey;
        if (operationKey) {
          this._fetchStackTrace(operationKey);
        }
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cleanupKeyboardNavigation();
  }

  private async _fetchStackTrace(operationKey: string): Promise<void> {
    this._loading = true;
    this._error = undefined;

    try {
      // Initialize auth context if not already done
      if (!this.#authContext) {
        this.consumeContext(UMB_AUTH_CONTEXT, (authContext) => {
          this.#authContext = authContext;
        });
        // Wait a tick for context to be available
        await new Promise(resolve => setTimeout(resolve, 0));
      }

      if (!this.#metricsService && this.#authContext) {
        this.#metricsService = new MetricsPerformanceService(async () => {
          const token = await this.#authContext?.getLatestToken();
          if (!token) {
            throw new Error('No authentication token available');
          }
          return token;
        });
      }

      if (this.#metricsService) {
        this._stackTrace = await this.#metricsService.getSqlStackTrace(operationKey);
        // Auto-expand the root node
        if (this._stackTrace) {
          this._expandedNodes.add(this._getNodeId(this._stackTrace, 0));
        }
      }
    } catch (error) {
      console.error('Error fetching SQL stack trace:', error);
      this._error = error instanceof Error ? error.message : 'Failed to load stack trace';
    } finally {
      this._loading = false;
    }
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

  /**
   * Generates a unique identifier for a stack trace node based on its position
   */
  private _getNodeId(node: SqlStackTrace, depth: number): string {
    return `${depth}-${node.caller || ''}-${node.method || ''}-${node.lineNumber}`;
  }

  /**
   * Toggles the expanded state of a node
   */
  private _toggleNode(nodeId: string): void {
    const newExpanded = new Set(this._expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    this._expandedNodes = newExpanded;
  }

  /**
   * Recursively renders the stack trace as a tree with expand/collapse
   */
  private _renderTreeNode(node: SqlStackTrace, depth: number): ReturnType<typeof html> {
    const nodeId = this._getNodeId(node, depth);
    const isExpanded = this._expandedNodes.has(nodeId);
    const hasChild = node.child !== undefined && node.child !== null;
    const hasDetails = !!(node.fileName || node.lineNumber > 0);

    return html`
      <div class="tree-node" style="--tree-depth: ${depth}">
        <div class="tree-node-header" @click="${() => this._toggleNode(nodeId)}">
          <div class="tree-toggle">
            ${hasChild ? html`
              <uui-icon name="${isExpanded ? 'icon-arrow-down' : 'icon-arrow-right'}"></uui-icon>
            ` : html`
              <span class="tree-toggle-spacer"></span>
            `}
          </div>
          <div class="tree-node-summary">
            <span class="tree-caller${hasDetails ? ' has-details' : ''}">${node.caller || 'N/A'}</span>
            <span class="tree-method-separator">.</span>
            <span class="tree-method">${node.method || 'N/A'}</span>
          </div>
          ${node.lineNumber > 0 ? html`
            <span class="tree-line">:${node.lineNumber}</span>
          ` : ''}
        </div>

        ${isExpanded ? html`
          <div class="tree-node-details">
            ${node.fileName ? html`
              <div class="tree-detail-row">
                <span class="tree-detail-label">${this.localize?.term('sqlStacktrace_file') || 'File'}:</span>
                <span class="tree-detail-value file-path">${node.fileName}</span>
              </div>
            ` : ''}
            ${node.lineNumber > 0 ? html`
              <div class="tree-detail-row">
                <span class="tree-detail-label">${this.localize?.term('sqlStacktrace_line') || 'Line'}:</span>
                <span class="tree-detail-value">${node.lineNumber}</span>
              </div>
            ` : ''}
          </div>
        ` : ''}

        ${hasChild && isExpanded ? html`
          <div class="tree-children">
            ${this._renderTreeNode(node.child!, depth + 1)}
          </div>
        ` : ''}
      </div>
    `;
  }

  render() {
    return html`
      <umb-modal-container>
        <umb-modal-sidebar>
          <umb-body-layout headline="${this.localize?.term('sqlStacktrace_title') || 'SQL Stack Trace'}">
            <div class="stacktrace-container">
              ${this._operationValue ? html`
                <div class="stacktrace-header">
                  <h3>${this.localize?.term('sqlStacktrace_operation') || 'Operation'}</h3>
                  <div class="operation-label">${this._operationValue}</div>
                </div>
              ` : ''}

              ${this._loading ? html`
                <div class="stacktrace-loading">
                  <uui-icon name="icon-loading"></uui-icon>
                  <p>${this.localize?.term('common_loading') || 'Loading...'}</p>
                </div>
              ` : this._error ? html`
                <div class="stacktrace-error">
                  <uui-icon name="icon-warning"></uui-icon>
                  <p>${this._error}</p>
                </div>
              ` : this._stackTrace ? html`
                <div class="stacktrace-header">
                  <h3>${this.localize?.term('sqlStacktrace_callChain') || 'Call Chain'}</h3>
                </div>
                <div class="stacktrace-tree">
                  ${this._renderTreeNode(this._stackTrace, 0)}
                </div>
              ` : html`
                <div class="stacktrace-empty">
                  <uui-icon name="icon-wrong"></uui-icon>
                  <p>${this.localize?.term('sqlStacktrace_noStackTrace') || 'No stack trace available'}</p>
                </div>
              `}
            </div>

            <umb-footer-layout slot="footer">
              <uui-button
                slot="actions"
                look="primary"
                color="danger"
                type="button"
                @click=${this._rejectModal}
              >
                ${this.localize?.term('common_close') || 'Close'}
              </uui-button>
            </umb-footer-layout>
          </umb-body-layout>
        </umb-modal-sidebar>
      </umb-modal-container>
    `;
  }

  static customstyles = css`${unsafeCSS(styles)}`;

  static styles = [...UUIModalElement.styles, SqlStacktraceElement.customstyles, css``];
}

export default SqlStacktraceElement;

declare global {
  interface HTMLElementTagNameMap {
    'umbmetrics-sql-stacktrace': SqlStacktraceElement;
  }
}
