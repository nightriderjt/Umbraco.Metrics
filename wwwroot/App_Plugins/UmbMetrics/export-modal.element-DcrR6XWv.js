import { html as p, css as D, state as E, customElement as F } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalElement as R } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as q } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as B } from "@umbraco-cms/backoffice/auth";
import { UUIModalElement as L } from "@umbraco-cms/backoffice/external/uui";
var a = /* @__PURE__ */ ((e) => (e.Json = "json", e.Csv = "csv", e.Xml = "xml", e))(a || {}), h = /* @__PURE__ */ ((e) => (e.Current = "current", e.Historical = "historical", e.Custom = "custom", e))(h || {});
class W {
  constructor(t) {
    this.tokenProvider = t, this.API_BASE_URL = "/umbraco/management/api/v1/metrics";
  }
  /**
   * Export metrics with custom options
   */
  async exportMetrics(t) {
    const i = await this.tokenProvider();
    if (!i)
      throw new Error("No authentication token available");
    const r = await fetch(`${this.API_BASE_URL}/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${i}`
      },
      body: JSON.stringify(t)
    });
    if (!r.ok) {
      if (r.status === 400) {
        const s = await r.json();
        throw new Error(s.detail || "Invalid export configuration");
      }
      throw new Error(
        `Failed to export metrics: ${r.status} ${r.statusText}`
      );
    }
    await this.downloadFile(r);
  }
  /**
   * Export performance metrics only
   */
  async exportPerformanceMetrics(t = a.Json) {
    const i = await this.tokenProvider(), r = await fetch(
      `${this.API_BASE_URL}/export/performance?format=${t}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${i}`
        }
      }
    );
    if (!r.ok)
      throw new Error(`Failed to export performance metrics: ${r.statusText}`);
    await this.downloadFile(r);
  }
  /**
   * Export Umbraco metrics only
   */
  async exportUmbracoMetrics(t = a.Json) {
    const i = await this.tokenProvider(), r = await fetch(
      `${this.API_BASE_URL}/export/umbraco?format=${t}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${i}`
        }
      }
    );
    if (!r.ok)
      throw new Error(`Failed to export Umbraco metrics: ${r.statusText}`);
    await this.downloadFile(r);
  }
  /**
   * Quick export with default options
   */
  async quickExport(t = !0, i = !0, r = a.Csv) {
    const s = {
      format: r,
      scope: h.Current,
      includePerformanceMetrics: t,
      includeUmbracoMetrics: i,
      includeActiveRequests: !1,
      timezone: "UTC"
    };
    await this.exportMetrics(s);
  }
  /**
   * Download file from response
   */
  async downloadFile(t) {
    const i = t.headers.get("Content-Disposition");
    let r = "metrics-export";
    if (i) {
      const k = i.match(/filename="?([^"]+)"?/);
      k && k[1] && (r = k[1]);
    }
    const s = await t.blob(), x = window.URL.createObjectURL(s), u = document.createElement("a");
    u.href = x, u.download = r, document.body.appendChild(u), u.click(), window.URL.revokeObjectURL(x), document.body.removeChild(u);
  }
  /**
   * Get file size estimate for export
   */
  estimateFileSize(t) {
    let i = 0;
    switch (t.includePerformanceMetrics && (i += 5), t.includeUmbracoMetrics && (i += 3), t.includeActiveRequests && (i += 2), t.format) {
      case a.Json:
        i *= 1.2;
        break;
      case a.Csv:
        i *= 0.8;
        break;
      case a.Xml:
        i *= 1.5;
        break;
    }
    return i < 1 ? "< 1 KB" : i < 1024 ? `${Math.round(i)} KB` : `${(i / 1024).toFixed(1)} MB`;
  }
  /**
   * Get supported formats for display
   */
  getSupportedFormats() {
    return [
      {
        value: a.Json,
        label: "JSON",
        description: "Structured data format, good for APIs and programming"
      },
      {
        value: a.Csv,
        label: "CSV",
        description: "Spreadsheet format, good for Excel and data analysis"
      },
      {
        value: a.Xml,
        label: "XML",
        description: "Markup format, good for legacy systems"
      }
    ];
  }
  /**
   * Get export scope options
   */
  getScopeOptions() {
    return [
      {
        value: h.Current,
        label: "Current Snapshot",
        description: "Export current metrics only"
      },
      {
        value: h.Historical,
        label: "Historical Data",
        description: "Export historical metrics (requires storage)"
      },
      {
        value: h.Custom,
        label: "Custom Range",
        description: "Export metrics from specific date range"
      }
    ];
  }
}
var I = Object.defineProperty, N = Object.getOwnPropertyDescriptor, P = (e) => {
  throw TypeError(e);
}, f = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? N(t, i) : t, x = e.length - 1, u; x >= 0; x--)
    (u = e[x]) && (s = (r ? u(t, i, s) : u(s)) || s);
  return r && s && I(t, i, s), s;
}, C = (e, t, i) => t.has(e) || P("Cannot " + i), o = (e, t, i) => (C(e, t, "read from private field"), i ? i.call(e) : t.get(e)), n = (e, t, i) => t.has(e) ? P("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), S = (e, t, i, r) => (C(e, t, "write to private field"), t.set(e, i), i), g = (e, t, i) => (C(e, t, "access private method"), i), l, c, d, _, M, O, v, b, y, $, w, z, U, T, A;
let m = class extends R {
  constructor() {
    super(), n(this, d), this._isExporting = !1, this._exportProgress = 0, this._exportOptions = {
      format: a.Csv,
      scope: h.Current,
      includePerformanceMetrics: !0,
      includeUmbracoMetrics: !0,
      includeActiveRequests: !1,
      timezone: "UTC"
    }, this._estimatedSize = "", n(this, l), n(this, c), n(this, M, (e) => {
      const t = e.target;
      this._exportOptions = {
        ...this._exportOptions,
        format: t.value
      }, g(this, d, _).call(this);
    }), n(this, O, (e) => {
      const t = e.target;
      this._exportOptions = {
        ...this._exportOptions,
        scope: t.value
      };
    }), n(this, v, (e) => {
      this._exportOptions = {
        ...this._exportOptions,
        [e]: !this._exportOptions[e]
      }, g(this, d, _).call(this);
    }), n(this, b, (e, t) => {
      this._exportOptions = {
        ...this._exportOptions,
        [e]: t || void 0
      };
    }), n(this, y, (e) => {
      const t = e.target;
      this._exportOptions = {
        ...this._exportOptions,
        timezone: t.value
      };
    }), n(this, $, async () => {
      if (!(!o(this, l) || this._isExporting)) {
        this._isExporting = !0, this._exportProgress = 10;
        try {
          if (this._exportOptions.scope === h.Custom) {
            if (!this._exportOptions.startDate || !this._exportOptions.endDate)
              throw new Error("Both start and end dates are required for custom range");
            const e = new Date(this._exportOptions.startDate), t = new Date(this._exportOptions.endDate);
            if (e > t)
              throw new Error("Start date must be before end date");
          }
          this._exportProgress = 30, await o(this, l).exportMetrics(this._exportOptions), this._exportProgress = 100, o(this, c) && o(this, c).peek("positive", {
            data: {
              headline: "Export Complete",
              message: `Metrics exported successfully (${this._estimatedSize})`
            }
          }), setTimeout(() => {
            this.modalContext && this.modalContext.submit();
          }, 1e3);
        } catch (e) {
          console.error("Export error:", e), o(this, c) && o(this, c).peek("danger", {
            data: {
              headline: "Export Failed",
              message: e instanceof Error ? e.message : "Failed to export metrics. Please try again."
            }
          }), this._isExporting = !1, this._exportProgress = 0;
        }
      }
    }), n(this, w, async (e) => {
      if (!(!o(this, l) || this._isExporting)) {
        this._isExporting = !0;
        try {
          await o(this, l).quickExport(!0, !0, e), o(this, c) && o(this, c).peek("positive", {
            data: {
              headline: "Export Complete",
              message: `Quick export to ${e.toUpperCase()} completed`
            }
          }), this.modalContext && this.modalContext.submit();
        } catch (t) {
          console.error("Quick export error:", t), o(this, c) && o(this, c).peek("danger", {
            data: {
              headline: "Export Failed",
              message: t instanceof Error ? t.message : "Failed to export metrics"
            }
          });
        } finally {
          this._isExporting = !1;
        }
      }
    }), n(this, z, () => {
      this.modalContext && this.modalContext.reject();
    }), this.consumeContext(q, (e) => {
      S(this, c, e);
    }), this.consumeContext(B, (e) => {
      S(this, l, new W(async () => {
        const t = await e?.getLatestToken();
        if (!t)
          throw new Error("No authentication token available");
        return t;
      }));
    }), g(this, d, _).call(this);
  }
  _rejectModal() {
    this.modalContext?.reject();
  }
  _submitModal() {
    this.modalContext?.submit();
  }
  render() {
    return p`
      <umb-body-layout headline="Export Metrics">
        <div id="main">
          ${g(this, d, U).call(this)}
          
          <div class="divider">
            <span>or</span>
          </div>
          
          ${g(this, d, T).call(this)}
          
          ${g(this, d, A).call(this)}
        </div>
        
        <div slot="actions">
          <uui-button 
            look="secondary"
            @click="${o(this, z)}"
            ?disabled="${this._isExporting}"
          >
            Cancel
          </uui-button>
          
          <uui-button 
            look="primary"
            color="positive"
            @click="${o(this, $)}"
            ?disabled="${this._isExporting || !this._exportOptions.includePerformanceMetrics && !this._exportOptions.includeUmbracoMetrics}"
          >
            ${this._isExporting ? p`
              <uui-icon name="icon-time"></uui-icon>
              Exporting...
            ` : p`
              <uui-icon name="icon-download"></uui-icon>
              Export Metrics
            `}
          </uui-button>
        </div>
      </umb-body-layout>
    `;
  }
};
l = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
_ = function() {
  o(this, l) && (this._estimatedSize = o(this, l).estimateFileSize(this._exportOptions));
};
M = /* @__PURE__ */ new WeakMap();
O = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
$ = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
U = function() {
  return p`
      <div class="quick-export-section">
        <h4>Quick Export</h4>
        <p class="description">Export all metrics with one click</p>
        
        <div class="quick-export-buttons">
          <uui-button 
            look="primary" 
            color="positive"
            @click="${() => o(this, w).call(this, a.Csv)}"
            ?disabled="${this._isExporting}"
          >
            <uui-icon name="icon-download"></uui-icon>
            Export as CSV
          </uui-button>
          
          <uui-button 
            look="outline"
            @click="${() => o(this, w).call(this, a.Json)}"
            ?disabled="${this._isExporting}"
          >
            <uui-icon name="icon-download"></uui-icon>
            Export as JSON
          </uui-button>
        </div>
      </div>
  `;
};
T = function() {
  const e = o(this, l)?.getSupportedFormats() || [], t = o(this, l)?.getScopeOptions() || [];
  return p`
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
              @change="${o(this, M)}"
              ?disabled="${this._isExporting}"
            >
              ${e.map((i) => p`
                <uui-option value="${i.value}">
                  ${i.label} - ${i.description}
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
              @change="${o(this, O)}"
              ?disabled="${this._isExporting}"
            >
              ${t.map((i) => p`
                <uui-option value="${i.value}">
                  ${i.label}
                </uui-option>
              `)}
            </uui-select>
          </div>

          <!-- Date Range (only for custom scope) -->
          ${this._exportOptions.scope === h.Custom ? p`
            <div class="form-group span-2">
              <label>Date Range</label>
              <div class="date-range">
                <uui-input
                  type="date"
                  label="Start Date"
                  .value="${this._exportOptions.startDate || ""}"
                  @change="${(i) => o(this, b).call(this, "startDate", i.target.value)}"
                  ?disabled="${this._isExporting}"
                ></uui-input>
                
                <span class="date-separator">to</span>
                
                <uui-input
                  type="date"
                  label="End Date"
                  .value="${this._exportOptions.endDate || ""}"
                  @change="${(i) => o(this, b).call(this, "endDate", i.target.value)}"
                  ?disabled="${this._isExporting}"
                ></uui-input>
              </div>
            </div>
          ` : ""}

          <!-- Timezone -->
          <div class="form-group">
            <label for="export-timezone">Timezone</label>
            <uui-select 
              id="export-timezone"
              .value="${this._exportOptions.timezone}"
              @change="${o(this, y)}"
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
              @change="${() => o(this, v).call(this, "includePerformanceMetrics")}"
              ?disabled="${this._isExporting}"
            ></uui-toggle>
            
            <uui-toggle 
              label="Umbraco Metrics"
              .checked="${this._exportOptions.includeUmbracoMetrics}"
              @change="${() => o(this, v).call(this, "includeUmbracoMetrics")}"
              ?disabled="${this._isExporting}"
            ></uui-toggle>
            
            <uui-toggle 
              label="Active Requests"
              .checked="${this._exportOptions.includeActiveRequests}"
              @change="${() => o(this, v).call(this, "includeActiveRequests")}"
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
};
A = function() {
  return this._isExporting ? p`
      <div class="export-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${this._exportProgress}%"></div>
        </div>
        <div class="progress-text">
          Exporting... ${this._exportProgress}%
        </div>
      </div>
    ` : "";
};
m.styles = [...L.styles, D`
    :host {
      display: block;
      min-width: 500px;
      max-width: 700px;
    }

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
f([
  E()
], m.prototype, "_isExporting", 2);
f([
  E()
], m.prototype, "_exportProgress", 2);
f([
  E()
], m.prototype, "_exportOptions", 2);
f([
  E()
], m.prototype, "_estimatedSize", 2);
m = f([
  F("umbmetrics-export-modal")
], m);
const K = m;
export {
  m as UmbMetricsExportModalElement,
  K as default
};
//# sourceMappingURL=export-modal.element-DcrR6XWv.js.map
