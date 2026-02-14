import { LitElement as A, html as d, css as w, property as l, customElement as E, unsafeCSS as q, state as R } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as y } from "@umbraco-cms/backoffice/element-api";
import { UmbModalElement as G } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as X } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as Y } from "@umbraco-cms/backoffice/auth";
import { UUIModalElement as H } from "@umbraco-cms/backoffice/external/uui";
class K {
  constructor(e) {
    this.tokenProvider = e, this.API_BASE_URL = "/umbraco/management/api/v1/metrics";
  }
  /**
   * Export metrics with custom options
   */
  async exportMetrics(e) {
    const i = await this.tokenProvider();
    if (!i)
      throw new Error("No authentication token available");
    const r = await fetch(`${this.API_BASE_URL}/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${i}`
      },
      body: JSON.stringify(e)
    });
    if (!r.ok) {
      if (r.status === 400) {
        const o = await r.json();
        throw new Error(o.detail || "Invalid export configuration");
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
  async exportPerformanceMetrics(e = "json") {
    const i = await this.tokenProvider(), r = await fetch(
      `${this.API_BASE_URL}/export/performance?format=${e}`,
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
  async exportUmbracoMetrics(e = "json") {
    const i = await this.tokenProvider(), r = await fetch(
      `${this.API_BASE_URL}/export/umbraco?format=${e}`,
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
  async quickExport(e = !0, i = !0, r = "csv") {
    const o = {
      format: r,
      scope: "current",
      includePerformanceMetrics: e,
      includeUmbracoMetrics: i,
      includeActiveRequests: !1,
      timezone: "UTC"
    };
    await this.exportMetrics(o);
  }
  /**
   * Download file from response
   */
  async downloadFile(e) {
    const i = e.headers.get("Content-Disposition");
    let r = "metrics-export";
    if (i) {
      const k = i.match(/filename="?([^"]+)"?/);
      k && k[1] && (r = k[1]);
    }
    const o = await e.blob(), a = window.URL.createObjectURL(o), s = document.createElement("a");
    s.href = a, s.target = "_blank", s.download = r, document.body.appendChild(s), s.click(), window.URL.revokeObjectURL(a), document.body.removeChild(s);
  }
  /**
   * Get file size estimate for export
   */
  estimateFileSize(e) {
    let i = 0;
    if (e.includePerformanceMetrics && (i += 5), e.includeUmbracoMetrics && (i += 3), e.includeActiveRequests && (i += 2), e.scope === "historical" || e.scope === "custom") {
      if (e.includePerformanceMetrics) {
        if (e.scope === "historical")
          i += 720 * 60 * 60 / 5 * 1;
        else if (e.scope === "custom" && e.startDate && e.endDate) {
          const r = new Date(e.startDate), o = new Date(e.endDate), a = Math.max(1, Math.ceil((o.getTime() - r.getTime()) / (1e3 * 60 * 60 * 24)));
          i += a * 24 * 60 * 60 / 5 * 1;
        }
      }
      e.includeUmbracoMetrics && (i += 0);
    }
    switch (e.format) {
      case "json":
        i *= 1.2;
        break;
      case "csv":
        i *= 0.8;
        break;
      case "xml":
        i *= 1.5;
        break;
    }
    return i < 1 ? "< 1 KB" : i < 1024 ? `${Math.round(i)} KB` : i < 1024 * 1024 ? `${(i / 1024).toFixed(1)} MB` : `${(i / (1024 * 1024)).toFixed(1)} GB`;
  }
}
const V = '#main{padding:var(--uui-size-space-5)}.quick-export-section,.export-options-section{margin-bottom:var(--uui-size-space-5)}h4{margin:0 0 var(--uui-size-space-2) 0;font-size:1.25rem;font-weight:600;color:var(--uui-color-text)}h5{margin:var(--uui-size-space-4) 0 var(--uui-size-space-2) 0;font-size:1rem;font-weight:600;color:var(--uui-color-text-alt)}.description{margin:0 0 var(--uui-size-space-4) 0;color:var(--uui-color-text-alt);font-size:.875rem}.quick-export-buttons{display:flex;gap:var(--uui-size-space-3);flex-wrap:wrap}.divider{display:flex;align-items:center;margin:var(--uui-size-space-5) 0;text-align:center;color:var(--uui-color-text-alt)}.divider:before,.divider:after{content:"";flex:1;height:1px;background:var(--uui-color-border)}.divider span{padding:0 var(--uui-size-space-3);font-size:.875rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--uui-size-space-4);margin-bottom:var(--uui-size-space-4)}.form-group.span-2{grid-column:span 2}.form-group label{display:block;margin-bottom:var(--uui-size-space-1);font-size:.875rem;font-weight:600;color:var(--uui-color-text-alt)}.date-range{display:flex;align-items:center;gap:var(--uui-size-space-3)}.date-separator{color:var(--uui-color-text-alt);font-size:.875rem}.metric-selection{background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);padding:var(--uui-size-space-4);margin-bottom:var(--uui-size-space-4)}.metric-toggles{display:flex;flex-direction:column;gap:var(--uui-size-space-3)}.estimated-size{display:flex;align-items:center;gap:var(--uui-size-space-2);padding:var(--uui-size-space-3) var(--uui-size-space-4);background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);font-size:.875rem;color:var(--uui-color-text-alt)}.estimated-size uui-icon{color:var(--uui-color-interactive)}.estimated-size strong{color:var(--uui-color-text)}.export-progress{margin-top:var(--uui-size-space-5);padding:var(--uui-size-space-4);background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius)}.progress-bar{height:8px;background:var(--uui-color-border);border-radius:4px;overflow:hidden;margin-bottom:var(--uui-size-space-2)}.progress-fill{height:100%;background:var(--uui-color-positive);border-radius:4px;transition:width .3s ease}.progress-text{text-align:center;font-size:.875rem;color:var(--uui-color-text-alt)}@media(max-width:600px){.form-grid{grid-template-columns:1fr}.form-group.span-2{grid-column:span 1}.date-range{flex-direction:column;align-items:stretch}.date-separator{text-align:center}.quick-export-buttons{flex-direction:column}}';
var Z = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, I = (t) => {
  throw TypeError(t);
}, O = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ee(e, i) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && Z(e, i, o), o;
}, te = (t, e, i) => e.has(t) || I("Cannot " + i), L = (t, e, i) => (te(t, e, "read from private field"), i ? i.call(t) : e.get(t)), W = (t, e, i) => e.has(t) ? I("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), M, P;
let g = class extends y(A) {
  constructor() {
    super(...arguments), this.disabled = !1, W(this, M, () => {
      this.onCsvExport && this.onCsvExport();
    }), W(this, P, () => {
      this.onJsonExport && this.onJsonExport();
    });
  }
  render() {
    return d`
      <div class="quick-export-section">
        <h4>${this.localize?.term("export_quickExport") || "Quick Export"}</h4>
        <p class="description">${this.localize?.term("export_quickExportDescription") || "Export all metrics with one click"}</p>
        
        <div class="quick-export-buttons">
          <uui-button 
            look="primary" 
            color="positive"
            @click="${L(this, M)}"
            ?disabled="${this.disabled}"
          >
            <uui-icon name="icon-download"></uui-icon>
            ${this.localize?.term("export_exportAsCsv") || "Export as CSV"}
          </uui-button>
          
          <uui-button 
            look="outline"
            @click="${L(this, P)}"
            ?disabled="${this.disabled}"
          >
            <uui-icon name="icon-download"></uui-icon>
            ${this.localize?.term("export_exportAsJson") || "Export as JSON"}
          </uui-button>
        </div>
      </div>
    `;
  }
};
M = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
g.styles = w`
    .quick-export-section {
      margin-bottom: var(--uui-size-space-5);
    }

    h4 {
      margin: 0 0 var(--uui-size-space-2) 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--uui-color-text);
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

    @media (max-width: 600px) {
      .quick-export-buttons {
        flex-direction: column;
      }
    }
  `;
O([
  l({ type: Boolean })
], g.prototype, "disabled", 2);
O([
  l({ type: Function })
], g.prototype, "onCsvExport", 2);
O([
  l({ type: Function })
], g.prototype, "onJsonExport", 2);
g = O([
  E("umbmetrics-quick-export-buttons")
], g);
const ie = ".export-options-section{margin-bottom:var(--uui-size-space-5)}h4{margin:0 0 var(--uui-size-space-2) 0;font-size:1.25rem;font-weight:600;color:var(--uui-color-text)}.description{margin:0 0 var(--uui-size-space-4) 0;color:var(--uui-color-text-alt);font-size:.875rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--uui-size-space-4);margin-bottom:var(--uui-size-space-5)}.form-group{display:flex;flex-direction:column;gap:var(--uui-size-space-2)}.form-group.span-2{grid-column:span 2}label{font-weight:600;color:var(--uui-color-text);font-size:.875rem}.date-range{display:flex;align-items:center;gap:var(--uui-size-space-3)}.date-separator{color:var(--uui-color-text-alt);font-size:.875rem}.metric-selection{margin-bottom:var(--uui-size-space-5)}h5{margin:0 0 var(--uui-size-space-3) 0;font-size:1rem;font-weight:600;color:var(--uui-color-text)}.metric-toggles{display:flex;flex-direction:column;gap:var(--uui-size-space-3)}.estimated-size{display:flex;align-items:center;gap:var(--uui-size-space-2);padding:var(--uui-size-space-3);background-color:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);color:var(--uui-color-text-alt);font-size:.875rem}.estimated-size strong{color:var(--uui-color-text)}@media(max-width:768px){.form-grid{grid-template-columns:1fr}.form-group.span-2{grid-column:span 1}.date-range{flex-direction:column;align-items:stretch}.date-separator{text-align:center}}";
var re = Object.defineProperty, oe = Object.getOwnPropertyDescriptor, J = (t) => {
  throw TypeError(t);
}, x = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? oe(e, i) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && re(e, i, o), o;
}, se = (t, e, i) => e.has(t) || J("Cannot " + i), u = (t, e, i) => (se(t, e, "read from private field"), i ? i.call(t) : e.get(t)), v = (t, e, i) => e.has(t) ? J("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), D, T, _, z, S;
let p = class extends y(A) {
  constructor() {
    super(...arguments), this.exportOptions = {
      format: "csv",
      scope: "current",
      includePerformanceMetrics: !0,
      includeUmbracoMetrics: !0,
      includeActiveRequests: !1,
      timezone: "UTC"
    }, this.disabled = !1, this.formatOptions = [
      { value: "csv", name: this.localize?.term("formats_csv") || "CSV" },
      { value: "json", name: this.localize?.term("formats_json") || "JSON" },
      { value: "xml", name: this.localize?.term("formats_xml") || "XML" }
    ], this.timeZones = [
      { value: "UTC", name: this.localize?.term("timezones_utc") || "UTC" },
      { value: "Local", name: this.localize?.term("timezones_local") || "Local Time" },
      { value: "Europe/London", name: this.localize?.term("timezones_europeLondon") || "Europe/London" },
      { value: "America/New_York", name: this.localize?.term("timezones_americaNewYork") || "America/New_York" },
      { value: "Asia/Tokyo", name: this.localize?.term("timezones_asiaTokyo") || "Asia/Tokyo" }
    ], this.scopeOptions = [
      { value: "current", name: this.localize?.term("exportOptions_currentSnapshot") || "Current Snapshot" },
      { value: "historical", name: this.localize?.term("exportOptions_historicalData") || "Historical Data" },
      { value: "custom", name: this.localize?.term("exportOptions_customRange") || "Custom Range" }
    ], v(this, D, (t) => {
      const e = t.target;
      this.onFormatChange && this.onFormatChange(e.value);
    }), v(this, T, (t) => {
      const e = t.target;
      this.onScopeChange && this.onScopeChange(e.value);
    }), v(this, _, (t) => {
      this.onMetricToggle && this.onMetricToggle(t);
    }), v(this, z, (t, e) => {
      const i = e.target;
      this.onDateChange && this.onDateChange(t, i.value);
    }), v(this, S, (t) => {
      const e = t.target;
      this.onTimezoneChange && this.onTimezoneChange(e.value);
    });
  }
  render() {
    return d`
      <div class="export-options-section">
        <h4>${this.localize?.term("export_customExport") || "Custom Export"}</h4>
        <p class="description">${this.localize?.term("export_customExportDescription") || "Configure export options"}</p>
        
        <div class="form-grid">
          <!-- Format Selection -->
          <div class="form-group">
            <label for="export-format">${this.localize?.term("exportOptions_format") || "Format"}</label>
            <uui-select 
              id="export-format"
              .value="${this.exportOptions.format}"
              @change="${u(this, D)}"
              ?disabled="${this.disabled}"
              .options="${this.formatOptions}"
            >           
            </uui-select>
          </div>

          <!-- Scope Selection -->
          <div class="form-group">
            <label for="export-scope">${this.localize?.term("exportOptions_scope") || "Scope"}</label>
            <uui-select 
              id="export-scope"
              .value="${this.exportOptions.scope}"
              @change="${u(this, T)}"
              ?disabled="${this.disabled}"
              .options="${this.scopeOptions}"
            >            
            </uui-select>
          </div>

          <!-- Date Range (only for custom scope) -->
          ${this.exportOptions.scope === "custom" ? d`
            <div class="form-group span-2">
              <label>${this.localize?.term("exportOptions_dateRange") || "Date Range"}</label>
              <div class="date-range">
                <uui-input
                  type="date"
                  label="${this.localize?.term("exportOptions_startDate") || "Start Date"}"
                  .value="${this.exportOptions.startDate || ""}"
                  @change="${(t) => u(this, z).call(this, "startDate", t)}"
                  ?disabled="${this.disabled}"
                ></uui-input>
                
                <span class="date-separator">${this.localize?.term("exportOptions_to") || "to"}</span>
                
                <uui-input
                  type="date"
                  label="${this.localize?.term("exportOptions_endDate") || "End Date"}"
                  .value="${this.exportOptions.endDate || ""}"
                  @change="${(t) => u(this, z).call(this, "endDate", t)}"
                  ?disabled="${this.disabled}"
                ></uui-input>
              </div>
            </div>
          ` : ""}

          <!-- Timezone -->
          <div class="form-group">
            <label for="export-timezone">${this.localize?.term("exportOptions_timezone") || "Timezone"}</label>
            <uui-select 
              id="export-timezone"
              .value="${this.exportOptions.timezone}"
              @change="${u(this, S)}"
              ?disabled="${this.disabled}"
              .options="${this.timeZones}"
            >
             
            </uui-select>
          </div>
        </div>

        <!-- Metric Selection -->
        <div class="metric-selection">
          <h5>${this.localize?.term("exportOptions_includeMetrics") || "Include Metrics"}</h5>
          <div class="metric-toggles">
            <uui-toggle 
              label="${this.localize?.term("exportOptions_performanceMetrics") || "Performance Metrics"}"
              .checked="${this.exportOptions.includePerformanceMetrics}"
              @change="${() => u(this, _).call(this, "includePerformanceMetrics")}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="${this.localize?.term("exportOptions_umbracoMetrics") || "Umbraco Metrics"}"
              .checked="${this.exportOptions.includeUmbracoMetrics}"
              @change="${() => u(this, _).call(this, "includeUmbracoMetrics")}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="${this.localize?.term("exportOptions_activeRequests") || "Active Requests"}"
              .checked="${this.exportOptions.includeActiveRequests}"
              @change="${() => u(this, _).call(this, "includeActiveRequests")}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
          </div>
        </div>
      </div>
    `;
  }
};
D = /* @__PURE__ */ new WeakMap();
T = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
S = /* @__PURE__ */ new WeakMap();
p.styles = w`${q(ie)}`;
x([
  l({ type: Boolean })
], p.prototype, "disabled", 2);
x([
  l({ type: Function })
], p.prototype, "onFormatChange", 2);
x([
  l({ type: Function })
], p.prototype, "onScopeChange", 2);
x([
  l({ type: Function })
], p.prototype, "onMetricToggle", 2);
x([
  l({ type: Function })
], p.prototype, "onDateChange", 2);
x([
  l({ type: Function })
], p.prototype, "onTimezoneChange", 2);
p = x([
  E("umbmetrics-export-options")
], p);
const ae = '.export-progress{margin-top:var(--uui-size-space-5);padding:var(--uui-size-space-4);background-color:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius)}.progress-bar{height:8px;background-color:var(--uui-color-surface);border-radius:4px;overflow:hidden;margin-bottom:var(--uui-size-space-2)}.progress-fill{height:100%;background-color:var(--uui-color-positive);border-radius:4px;transition:width .3s ease}.progress-text{display:flex;justify-content:space-between;align-items:center;font-size:.875rem;color:var(--uui-color-text-alt)}.progress-text:before{content:"⏳";margin-right:var(--uui-size-space-2)}';
var ne = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, B = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ce(e, i) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && ne(e, i, o), o;
};
let b = class extends y(A) {
  constructor() {
    super(...arguments), this.isExporting = !1, this.progress = 0;
  }
  render() {
    return this.isExporting ? d`
      <div class="export-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${this.progress}%"></div>
        </div>
        <div class="progress-text">
          ${this.localize?.term("export_exporting") || "Exporting..."} ${this.progress}%
        </div>
      </div>
    ` : d``;
  }
};
b.styles = w`${q(ae)}`;
B([
  l({ type: Boolean })
], b.prototype, "isExporting", 2);
B([
  l({ type: Number })
], b.prototype, "progress", 2);
b = B([
  E("umbmetrics-export-progress")
], b);
var le = Object.defineProperty, pe = Object.getOwnPropertyDescriptor, j = (t) => {
  throw TypeError(t);
}, C = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? pe(e, i) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && le(e, i, o), o;
}, Q = (t, e, i) => e.has(t) || j("Cannot " + i), n = (t, e, i) => (Q(t, e, "read from private field"), i ? i.call(t) : e.get(t)), f = (t, e, i) => e.has(t) ? j("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), N = (t, e, i, r) => (Q(t, e, "write to private field"), e.set(t, i), i), m, c, U, $, F;
let h = class extends y(G) {
  constructor() {
    super(), this._isExporting = !1, this._exportProgress = 0, this._exportOptions = {
      format: "csv",
      scope: "current",
      includePerformanceMetrics: !0,
      includeUmbracoMetrics: !0,
      includeActiveRequests: !1,
      timezone: "UTC"
    }, f(this, m), f(this, c), f(this, U, async () => {
      if (!(!n(this, m) || this._isExporting)) {
        this._isExporting = !0, this._exportProgress = 10;
        try {
          if (this._exportOptions.scope === "custom") {
            if (!this._exportOptions.startDate || !this._exportOptions.endDate)
              throw new Error(this.localize?.term("validation_bothDatesRequired") || "Both start and end dates are required for custom range");
            const t = new Date(this._exportOptions.startDate), e = new Date(this._exportOptions.endDate);
            if (t > e)
              throw new Error(this.localize?.term("validation_startDateBeforeEndDate") || "Start date must be before end date");
          }
          this._exportProgress = 30, await n(this, m).exportMetrics(this._exportOptions), this._exportProgress = 100, n(this, c) && n(this, c).peek("positive", {
            data: {
              headline: this.localize?.term("export_exportComplete") || "Export Complete",
              message: `${this.localize?.term("export_metricsExportedSuccessfully") || "Metrics exported successfully"} `
            }
          }), setTimeout(() => {
            this.modalContext && this.modalContext.submit();
          }, 1e3);
        } catch (t) {
          console.error("Export error:", t), n(this, c) && n(this, c).peek("danger", {
            data: {
              headline: this.localize?.term("export_exportFailed") || "Export Failed",
              message: t instanceof Error ? t.message : this.localize?.term("export_failedToExportMetrics") || "Failed to export metrics. Please try again."
            }
          }), this._isExporting = !1, this._exportProgress = 0;
        }
      }
    }), f(this, $, async (t) => {
      if (!(!n(this, m) || this._isExporting)) {
        this._isExporting = !0;
        try {
          await n(this, m).quickExport(!0, !0, t), n(this, c) && n(this, c).peek("positive", {
            data: {
              headline: this.localize?.term("export_exportComplete") || "Export Complete",
              message: `${this.localize?.term("export_quickExportCompleted") || "Quick export to"} ${t.toUpperCase()} ${this.localize?.term("export_completed") || "completed"}`
            }
          }), this.modalContext && this.modalContext.submit();
        } catch (e) {
          console.error("Quick export error:", e), n(this, c) && n(this, c).peek("danger", {
            data: {
              headline: this.localize?.term("export_exportFailed") || "Export Failed",
              message: e instanceof Error ? e.message : this.localize?.term("export_failedToExportMetrics") || "Failed to export metrics"
            }
          });
        } finally {
          this._isExporting = !1;
        }
      }
    }), f(this, F, () => {
      this.modalContext && this.modalContext.reject();
    }), this.consumeContext(X, (t) => {
      N(this, c, t);
    }), this.consumeContext(Y, (t) => {
      N(this, m, new K(async () => {
        const e = await t?.getLatestToken();
        if (!e)
          throw new Error("No authentication token available");
        return e;
      }));
    });
  }
  render() {
    return d`
      <umb-modal-sidebar>
        <umb-body-layout headline="${this.localize?.term("export_title") || "Export Metrics"}">
          <div id="main">
            <umbmetrics-quick-export-buttons
              ?disabled="${this._isExporting}"
              .onCsvExport="${() => n(this, $).call(this, "csv")}"
              .onJsonExport="${() => n(this, $).call(this, "csv")}"
            ></umbmetrics-quick-export-buttons>
            
            <div class="divider">
              <span>${this.localize?.term("common_or") || "or"}</span>
            </div>
            
            <umbmetrics-export-options
              .exportOptions="${this._exportOptions}"
              ?disabled="${this._isExporting}"               
              .onFormatChange="${(t) => {
      this._exportOptions = { ...this._exportOptions, format: t };
    }}"
              .onScopeChange="${(t) => {
      this._exportOptions = { ...this._exportOptions, scope: t };
    }}"
              .onMetricToggle="${(t) => {
      this._exportOptions = {
        ...this._exportOptions,
        [t]: !this._exportOptions[t]
      };
    }}"
              .onDateChange="${(t, e) => {
      this._exportOptions = {
        ...this._exportOptions,
        [t]: e || void 0
      };
    }}"
              .onTimezoneChange="${(t) => {
      this._exportOptions = { ...this._exportOptions, timezone: t };
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
              @click="${n(this, F)}"
              ?disabled="${this._isExporting}"
            >
              ${this.localize?.term("export_cancel") || "Cancel"}
            </uui-button>
            
            <uui-button 
              look="primary"
              color="positive"
              @click="${n(this, U)}"
              ?disabled="${this._isExporting || !this._exportOptions.includePerformanceMetrics && !this._exportOptions.includeUmbracoMetrics}"
            >
              ${this._isExporting ? d`
                <uui-icon name="icon-time"></uui-icon>
                ${this.localize?.term("export_exporting") || "Exporting..."}
              ` : d`
                <uui-icon name="icon-download"></uui-icon>
                ${this.localize?.term("export_exportMetrics") || "Export Metrics"}
              `}
            </uui-button>
          </div>
        </umb-body-layout>
      </umb-modal-sidebar>
    `;
  }
};
m = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
U = /* @__PURE__ */ new WeakMap();
$ = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakMap();
h.styles = [...H.styles, w`${q(V)}`];
C([
  R()
], h.prototype, "_isExporting", 2);
C([
  R()
], h.prototype, "_exportProgress", 2);
C([
  R()
], h.prototype, "_exportOptions", 2);
h = C([
  E("umbmetrics-export-modal")
], h);
const ve = h;
export {
  h as UmbMetricsExportModalElement,
  ve as default
};
//# sourceMappingURL=export-modal.element-DyvmmFy3.js.map
