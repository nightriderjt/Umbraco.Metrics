import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
  state,
  repeat,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { PerformanceMetrics } from "../../types/performance-metrics.js";
import { getDurationColor } from "../../utils/format-utils.js";
import "../../components/metric-card.element.js";
import "../../components/metrics-grid.element.js";
import stylesString from '../../css/dashboard.element.css?inline';

@customElement("umbmetrics-database-tab")
export class UmbMetricsDatabaseTabElement extends UmbElementMixin(LitElement) {
  @property({ type: Object, attribute: false })
  performanceMetrics?: PerformanceMetrics;

  @state()
  private _currentPage: number = 1;

  @state()
  private _itemsPerPage: number = 10;

  @state()
  private _queryFilter: string = 'all';

  @state()
  private _expandedGroups: Set<string> = new Set();

  render() {
    if (!this.performanceMetrics) {
      return html`<p>${this.localize?.term('dashboard_clickToLoadDatabase') || 'Click "Refresh Metrics" to load database operations'}</p>`;
    }

    const sqlOperations = this.performanceMetrics.sqlOperations || [];
    
    // Create operations with duration in milliseconds for sorting
    const operationsWithDuration = sqlOperations.map(op => ({
      ...op,
      durationMs: op.duration
    }));
    
    // Apply filter
    let filteredOperations = [...operationsWithDuration];
    if (this._queryFilter === 'success') {
      filteredOperations = filteredOperations.filter(op => op.success);
    } else if (this._queryFilter === 'failed') {
      filteredOperations = filteredOperations.filter(op => !op.success);
    }
    
    // Group operations by queryHash
    const groups = new Map<string, typeof filteredOperations>();
    for (const op of filteredOperations) {
      const key = op.queryHash || '__no_hash__';
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(op);
    }
    
    // Sort groups by max duration descending
    const sortedGroups = Array.from(groups.entries())
      .map(([hash, ops]) => ({
        hash,
        queryText: ops[0]?.operationValue || '(empty)',
        operations: ops,
        count: ops.length,
        maxDuration: Math.max(...ops.map(o => o.durationMs)),
        avgDuration: ops.reduce((sum, o) => sum + o.durationMs, 0) / ops.length,
        totalDuration: ops.reduce((sum, o) => sum + o.durationMs, 0),
        successCount: ops.filter(o => o.success).length,
        failedCount: ops.filter(o => !o.success).length,
      }))
      .sort((a, b) => b.maxDuration - a.maxDuration);
    
    // Calculate statistics
    const totalOperations = filteredOperations.length;
    const successfulOperations = filteredOperations.filter(op => op.success).length;
    const failedOperations = totalOperations - successfulOperations;
    const totalDuration = filteredOperations.reduce((sum, op) => sum + op.durationMs, 0);
    const avgDuration = totalOperations > 0 ? totalDuration / totalOperations : 0;
    const maxDuration = totalOperations > 0 ? Math.max(...filteredOperations.map(op => op.durationMs)) : 0;

    // Calculate paging for groups
    const totalGroups = sortedGroups.length;
    const totalPages = Math.ceil(totalGroups / this._itemsPerPage);
    const startIndex = (this._currentPage - 1) * this._itemsPerPage;
    const endIndex = Math.min(startIndex + this._itemsPerPage, totalGroups);
    const pagedGroups = sortedGroups.slice(startIndex, endIndex);

    return html`
      <div class="database-tab">
        <div class="database-header">
          <h3>${this.localize?.term('dashboard_database') || 'Database Operations'}</h3>
          <div class="database-controls">
            <uui-button 
              look="primary" 
              color="positive"
              @click="${this.#onRefresh}"
            >
              <uui-icon name="icon-refresh"></uui-icon>
              ${this.localize?.term('common_refresh') || 'Refresh'}
            </uui-button>
          </div>
        </div>

        <div class="database-stats">
          <umbmetrics-metrics-grid columns="4">
            <umbmetrics-metric-card
              icon="icon-database"
              title="Total Operations"
              value="${totalOperations}"
              detail="${this.localize?.term('dashboard_groups') || 'Groups'}: ${totalGroups}"
            ></umbmetrics-metric-card>

            <umbmetrics-metric-card
              icon="icon-check"
              title="Successful"
              value="${successfulOperations}"
              detail="${totalOperations > 0 ? ((successfulOperations / totalOperations) * 100).toFixed(1) + '%' : '0%'}"
              color="${successfulOperations === totalOperations ? 'positive' : 'default'}"
            ></umbmetrics-metric-card>

            <umbmetrics-metric-card
              icon="icon-alert"
              title="Failed"
              value="${failedOperations}"
              detail="${totalOperations > 0 ? ((failedOperations / totalOperations) * 100).toFixed(1) + '%' : '0%'}"
              color="${failedOperations > 0 ? 'danger' : 'positive'}"
            ></umbmetrics-metric-card>

            <umbmetrics-metric-card
              icon="icon-timer"
              title="Avg Duration"
              value="${(avgDuration.toFixed(2))} ms"
              detail="Max: ${(maxDuration.toFixed(2))} ms"
              color="${getDurationColor(avgDuration)}"
            ></umbmetrics-metric-card>
          </umbmetrics-metrics-grid>
        </div>

        <div class="database-operations">
          <div class="operations-header">
            <h4>${this.localize?.term('dashboard_sqlOperationsGrouped') || 'SQL Operations (Grouped by Query)'}</h4>           
              <div class="paging-controls">
                <div class="query-filter">
                  <label>${this.localize?.term('dashboard_filterByStatus') || 'Filter by status'}:</label>
                  <select 
                    .value="${this._queryFilter}"
                    @change="${(e: Event) => this.#changeQueryFilter((e.target as HTMLSelectElement).value)}"
                  >
                    <option value="all">${this.localize?.term('dashboard_allQueries') || 'All Queries'}</option>
                    <option value="success">${this.localize?.term('dashboard_successfulQueries') || 'Successful Only'}</option>
                    <option value="failed">${this.localize?.term('dashboard_failedQueries') || 'Failed Only'}</option>
                  </select>
                </div>
                <div class="items-per-page">
                  <label>${this.localize?.term('common_itemsPerPage') || 'Items per page'}:</label>
                  <select 
                    .value="${this._itemsPerPage.toString()}"
                    @change="${(e: Event) => this.#changeItemsPerPage(parseInt((e.target as HTMLSelectElement).value))}"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div class="paging-info">
                  ${this.localize?.term('common_showing') || 'Showing'} ${endIndex==0?0: startIndex + 1} ${this.localize?.term('common_to') || 'to'} ${endIndex} ${this.localize?.term('common_ofTotal') || 'of total'} ${totalGroups} ${this.localize?.term('dashboard_groups') || 'groups'}
                </div>
              </div>           
          </div>
          
          ${sortedGroups.length === 0 ? html`
            <p class="no-operations">${this.localize?.term('dashboard_noData') || 'No database operations recorded'}</p>
          ` : html`
            <div class="operations-table-container">
              <div class="operations-table-wrapper">
                <table class="operations-table">
                  <thead>
                    <tr>
                      <th class="col-expand"></th>
                      <th>${this.localize?.term('dashboard_query') || 'Query'}</th>
                      <th>${this.localize?.term('dashboard_executions') || 'Executions'}</th>
                      <th>${this.localize?.term('dashboard_avgDuration') || 'Avg Duration'}</th>
                      <th>${this.localize?.term('dashboard_maxDuration') || 'Max Duration'}</th>
                      <th>${this.localize?.term('dashboard_successRate') || 'Success Rate'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${repeat(pagedGroups, (g) => g.hash, (group) => {
                      const groupKey = group.hash;
                      const isExpanded = this._expandedGroups.has(groupKey);
                      const successRate = group.count > 0 ? ((group.successCount / group.count) * 100).toFixed(1) : '0.0';
                      
                      return html`
                        <tr class="group-header ${isExpanded ? 'expanded' : ''}" @click="${() => this.#toggleGroup(groupKey)}">
                          <td class="col-expand">
                            <uui-icon name="${isExpanded ? 'icon-arrow-down' : 'icon-arrow-right'}"></uui-icon>
                          </td>
                          <td>
                            <div class="group-query" title="${group.queryText}">
                              <span class="group-query-text">${group.queryText}</span>
                            </div>
                          </td>
                          <td>
                            <span class="group-stat">${group.count}</span>
                          </td>
                          <td>
                            <span class="operation-duration ${getDurationColor(group.avgDuration)}">
                              ${(group.avgDuration.toFixed(2))} ms
                            </span>
                          </td>
                          <td>
                            <span class="operation-duration ${getDurationColor(group.maxDuration)}">
                              ${(group.maxDuration.toFixed(2))} ms
                            </span>
                          </td>
                          <td>
                            <span class="group-stat ${group.failedCount > 0 ? 'operation-failure' : 'operation-success'}">
                              ${successRate}%
                            </span>
                          </td>
                        </tr>
                        ${isExpanded ? group.operations.map(op => html`
                          <tr class="group-child">
                            <td class="col-expand"></td>
                            <td>
                              <div class="operation-query" title="${op.operationValue || 'N/A'}">
                                ${op.operationValue || 'N/A'}
                              </div>
                            </td>
                            <td>
                              ${op.success ? html`
                                <span class="operation-success">${this.localize?.term('common_success') || 'Success'}</span>
                              ` : html`
                                <span class="operation-failure">${this.localize?.term('common_failed') || 'Failed'}</span>
                              `}
                            </td>
                            <td>
                              ${new Date(op.startCommand).toLocaleTimeString()}
                            </td>
                            <td>
                              <span class="operation-duration ${getDurationColor(op.duration)}">
                                ${(op.duration.toFixed(2))} ms
                              </span>
                            </td>
                            <td>
                              ${op.hasStackTrace ? html`
                                <uui-button
                                  look="default"
                                  compact
                                  title="${this.localize?.term('sqlStacktrace_viewStackTrace') || 'View Stack Trace'}"
                                  @click="${(e: Event) => { e.stopPropagation(); this.#onOpenSqlStacktrace(op); }}"
                                >
                                  <uui-icon name="icon-bug"></uui-icon>
                                </uui-button>
                              ` : html`
                                <span class="no-trace">&mdash;</span>
                              `}
                            </td>
                          </tr>
                        `) : ''}
                      `;
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            ${totalPages > 1 ? html`
              <div class="pagination">
                <uui-button
                  look="default"
                  ?disabled="${this._currentPage === 1}"
                  @click="${() => this.#goToPage(this._currentPage - 1)}"
                >
                  <uui-icon name="icon-chevron-left"></uui-icon>
                  ${this.localize?.term('common_previous') || 'Previous'}
                </uui-button>
                
                <div class="page-numbers">
                  ${Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (this._currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (this._currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = this._currentPage - 2 + i;
                    }
                    
                    return html`
                      <uui-button
                        look="${pageNum === this._currentPage ? 'primary' : 'default'}"
                        color="${pageNum === this._currentPage ? 'positive' : 'default'}"
                        @click="${() => this.#goToPage(pageNum)}"
                      >
                        ${pageNum}
                      </uui-button>
                    `;
                  })}
                  
                  ${totalPages > 5 && this._currentPage < totalPages - 2 ? html`
                    <span class="ellipsis">...</span>
                    <uui-button
                      look="default"
                      @click="${() => this.#goToPage(totalPages)}"
                    >
                      ${totalPages}
                    </uui-button>
                  ` : ''}
                </div>
                
                <uui-button
                  look="default"
                  ?disabled="${this._currentPage === totalPages}"
                  @click="${() => this.#goToPage(this._currentPage + 1)}"
                >
                  ${this.localize?.term('common_next') || 'Next'}
                  <uui-icon name="icon-chevron-right"></uui-icon>
                </uui-button>
                
                <div class="page-jump">
                  <label>${this.localize?.term('common_goToPage') || 'Go to page'}:</label>
                  <input
                    type="number"
                    min="1"
                    max="${totalPages}"
                    .value="${this._currentPage.toString()}"
                    @change="${(e: Event) => {
                      const page = parseInt((e.target as HTMLInputElement).value);
                      if (page >= 1 && page <= totalPages) {
                        this.#goToPage(page);
                      }
                    }}"
                  />
                  <span>${this.localize?.term('common_of') || 'of'} ${totalPages}</span>
                </div>
              </div>
            ` : ''}
          `}
        </div>
      </div>
    `;
  }

  #onRefresh() {
    this.dispatchEvent(new CustomEvent('refresh-metrics', { bubbles: true, composed: true }));
  }

  #onOpenSqlStacktrace(op: any) {
    this.dispatchEvent(new CustomEvent('open-sql-stacktrace', { 
      bubbles: true, 
      composed: true,
      detail: { operationKey: op.operationKey, operationValue: op.operationValue }
    }));
  }

  #toggleGroup(groupKey: string) {
    const newSet = new Set(this._expandedGroups);
    if (newSet.has(groupKey)) {
      newSet.delete(groupKey);
    } else {
      newSet.add(groupKey);
    }
    this._expandedGroups = newSet;
  }

  #goToPage(page: number) {
    if (page >= 1 && page <= Math.ceil((this.performanceMetrics?.sqlOperations?.length || 0) / this._itemsPerPage)) {
      this._currentPage = page;
    }
  }

  #changeItemsPerPage(items: number) {
    this._itemsPerPage = items;
    this._currentPage = 1;
  }

  #changeQueryFilter(filter: string) {
    this._queryFilter = filter;
    this._currentPage = 1;
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default UmbMetricsDatabaseTabElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-database-tab": UmbMetricsDatabaseTabElement;
  }
}
