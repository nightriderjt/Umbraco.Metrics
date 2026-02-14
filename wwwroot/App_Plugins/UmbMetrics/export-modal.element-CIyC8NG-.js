import { LitElement as W, html as x, css as O, property as l, customElement as k, unsafeCSS as N, state as M } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as S } from "@umbraco-cms/backoffice/element-api";
import { UmbModalElement as K } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as V } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as Z } from "@umbraco-cms/backoffice/auth";
import { UUIModalElement as ee } from "@umbraco-cms/backoffice/external/uui";
var c = /* @__PURE__ */ ((t) => (t.Current = "current", t.Historical = "historical", t.Custom = "custom", t))(c || {});
class te {
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
    const o = await fetch(`${this.API_BASE_URL}/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${i}`
      },
      body: JSON.stringify(e)
    });
    if (!o.ok) {
      if (o.status === 400) {
        const r = await o.json();
        throw new Error(r.detail || "Invalid export configuration");
      }
      throw new Error(
        `Failed to export metrics: ${o.status} ${o.statusText}`
      );
    }
    await this.downloadFile(o);
  }
  /**
   * Export performance metrics only
   */
  async exportPerformanceMetrics(e = "json") {
    const i = await this.tokenProvider(), o = await fetch(
      `${this.API_BASE_URL}/export/performance?format=${e}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${i}`
        }
      }
    );
    if (!o.ok)
      throw new Error(`Failed to export performance metrics: ${o.statusText}`);
    await this.downloadFile(o);
  }
  /**
   * Export Umbraco metrics only
   */
  async exportUmbracoMetrics(e = "json") {
    const i = await this.tokenProvider(), o = await fetch(
      `${this.API_BASE_URL}/export/umbraco?format=${e}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${i}`
        }
      }
    );
    if (!o.ok)
      throw new Error(`Failed to export Umbraco metrics: ${o.statusText}`);
    await this.downloadFile(o);
  }
  /**
   * Quick export with default options
   */
  async quickExport(e = !0, i = !0, o = "csv") {
    const r = {
      format: o,
      scope: c.Current,
      includePerformanceMetrics: e,
      includeUmbracoMetrics: i,
      includeActiveRequests: !1,
      timezone: "UTC"
    };
    await this.exportMetrics(r);
  }
  /**
   * Download file from response
   */
  async downloadFile(e) {
    const i = e.headers.get("Content-Disposition");
    let o = "metrics-export";
    if (i) {
      const D = i.match(/filename="?([^"]+)"?/);
      D && D[1] && (o = D[1]);
    }
    const r = await e.blob(), a = window.URL.createObjectURL(r), s = document.createElement("a");
    s.href = a, s.target = "_blank", s.download = o, document.body.appendChild(s), s.click(), window.URL.revokeObjectURL(a), document.body.removeChild(s);
  }
  /**
   * Get file size estimate for export
   */
  estimateFileSize(e) {
    let i = 0;
    if (e.includePerformanceMetrics && (i += 5), e.includeUmbracoMetrics && (i += 3), e.includeActiveRequests && (i += 2), e.scope === c.Historical || e.scope === c.Custom) {
      if (e.includePerformanceMetrics) {
        if (e.scope === c.Historical)
          i += 720 * 60 * 60 / 5 * 1;
        else if (e.scope === c.Custom && e.startDate && e.endDate) {
          const o = new Date(e.startDate), r = new Date(e.endDate), a = Math.max(1, Math.ceil((r.getTime() - o.getTime()) / (1e3 * 60 * 60 * 24)));
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
const ie = '#main{padding:var(--uui-size-space-5)}.quick-export-section,.export-options-section{margin-bottom:var(--uui-size-space-5)}h4{margin:0 0 var(--uui-size-space-2) 0;font-size:1.25rem;font-weight:600;color:var(--uui-color-text)}h5{margin:var(--uui-size-space-4) 0 var(--uui-size-space-2) 0;font-size:1rem;font-weight:600;color:var(--uui-color-text-alt)}.description{margin:0 0 var(--uui-size-space-4) 0;color:var(--uui-color-text-alt);font-size:.875rem}.quick-export-buttons{display:flex;gap:var(--uui-size-space-3);flex-wrap:wrap}.divider{display:flex;align-items:center;margin:var(--uui-size-space-5) 0;text-align:center;color:var(--uui-color-text-alt)}.divider:before,.divider:after{content:"";flex:1;height:1px;background:var(--uui-color-border)}.divider span{padding:0 var(--uui-size-space-3);font-size:.875rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--uui-size-space-4);margin-bottom:var(--uui-size-space-4)}.form-group.span-2{grid-column:span 2}.form-group label{display:block;margin-bottom:var(--uui-size-space-1);font-size:.875rem;font-weight:600;color:var(--uui-color-text-alt)}.date-range{display:flex;align-items:center;gap:var(--uui-size-space-3)}.date-separator{color:var(--uui-color-text-alt);font-size:.875rem}.metric-selection{background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);padding:var(--uui-size-space-4);margin-bottom:var(--uui-size-space-4)}.metric-toggles{display:flex;flex-direction:column;gap:var(--uui-size-space-3)}.estimated-size{display:flex;align-items:center;gap:var(--uui-size-space-2);padding:var(--uui-size-space-3) var(--uui-size-space-4);background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);font-size:.875rem;color:var(--uui-color-text-alt)}.estimated-size uui-icon{color:var(--uui-color-interactive)}.estimated-size strong{color:var(--uui-color-text)}.export-progress{margin-top:var(--uui-size-space-5);padding:var(--uui-size-space-4);background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius)}.progress-bar{height:8px;background:var(--uui-color-border);border-radius:4px;overflow:hidden;margin-bottom:var(--uui-size-space-2)}.progress-fill{height:100%;background:var(--uui-color-positive);border-radius:4px;transition:width .3s ease}.progress-text{text-align:center;font-size:.875rem;color:var(--uui-color-text-alt)}@media(max-width:600px){.form-grid{grid-template-columns:1fr}.form-group.span-2{grid-column:span 1}.date-range{flex-direction:column;align-items:stretch}.date-separator{text-align:center}.quick-export-buttons{flex-direction:column}}';
var oe = Object.defineProperty, re = Object.getOwnPropertyDescriptor, G = (t) => {
  throw TypeError(t);
}, P = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? re(e, i) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (r = (o ? s(e, i, r) : s(r)) || r);
  return o && r && oe(e, i, r), r;
}, se = (t, e, i) => e.has(t) || G("Cannot " + i), j = (t, e, i) => (se(t, e, "read from private field"), i ? i.call(t) : e.get(t)), H = (t, e, i) => e.has(t) ? G("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), U, F;
let f = class extends S(W) {
  constructor() {
    super(...arguments), this.disabled = !1, H(this, U, () => {
      this.onCsvExport && this.onCsvExport();
    }), H(this, F, () => {
      this.onJsonExport && this.onJsonExport();
    });
  }
  render() {
    return x`
      <div class="quick-export-section">
        <h4>${this.localize?.term("export_quickExport") || "Quick Export"}</h4>
        <p class="description">${this.localize?.term("export_quickExportDescription") || "Export all metrics with one click"}</p>
        
        <div class="quick-export-buttons">
          <uui-button 
            look="primary" 
            color="positive"
            @click="${j(this, U)}"
            ?disabled="${this.disabled}"
          >
            <uui-icon name="icon-download"></uui-icon>
            ${this.localize?.term("export_exportAsCsv") || "Export as CSV"}
          </uui-button>
          
          <uui-button 
            look="outline"
            @click="${j(this, F)}"
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
U = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakMap();
f.styles = O`
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
P([
  l({ type: Boolean })
], f.prototype, "disabled", 2);
P([
  l({ type: Function })
], f.prototype, "onCsvExport", 2);
P([
  l({ type: Function })
], f.prototype, "onJsonExport", 2);
f = P([
  k("umbmetrics-quick-export-buttons")
], f);
const ae = ".export-options-section{margin-bottom:var(--uui-size-space-5)}h4{margin:0 0 var(--uui-size-space-2) 0;font-size:1.25rem;font-weight:600;color:var(--uui-color-text)}.description{margin:0 0 var(--uui-size-space-4) 0;color:var(--uui-color-text-alt);font-size:.875rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--uui-size-space-4);margin-bottom:var(--uui-size-space-5)}.form-group{display:flex;flex-direction:column;gap:var(--uui-size-space-2)}.form-group.span-2{grid-column:span 2}label{font-weight:600;color:var(--uui-color-text);font-size:.875rem}.date-range{display:flex;align-items:center;gap:var(--uui-size-space-3)}.date-separator{color:var(--uui-color-text-alt);font-size:.875rem}.metric-selection{margin-bottom:var(--uui-size-space-5)}h5{margin:0 0 var(--uui-size-space-3) 0;font-size:1rem;font-weight:600;color:var(--uui-color-text)}.metric-toggles{display:flex;flex-direction:column;gap:var(--uui-size-space-3)}.estimated-size{display:flex;align-items:center;gap:var(--uui-size-space-2);padding:var(--uui-size-space-3);background-color:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);color:var(--uui-color-text-alt);font-size:.875rem}.estimated-size strong{color:var(--uui-color-text)}@media(max-width:768px){.form-grid{grid-template-columns:1fr}.form-group.span-2{grid-column:span 1}.date-range{flex-direction:column;align-items:stretch}.date-separator{text-align:center}}";
var ne = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, X = (t) => {
  throw TypeError(t);
}, m = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ce(e, i) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (r = (o ? s(e, i, r) : s(r)) || r);
  return o && r && ne(e, i, r), r;
}, le = (t, e, i) => e.has(t) || X("Cannot " + i), h = (t, e, i) => (le(t, e, "read from private field"), i ? i.call(t) : e.get(t)), _ = (t, e, i) => e.has(t) ? X("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), A, q, z, w, R;
let u = class extends S(W) {
  constructor() {
    super(...arguments), this.exportOptions = {
      format: "csv",
      scope: c.Current,
      includePerformanceMetrics: !0,
      includeUmbracoMetrics: !0,
      includeActiveRequests: !1,
      timezone: "UTC"
    }, this.disabled = !1, this.estimatedSize = "", this.formatOptions = [
      { value: "csv", name: this.localize?.term("formats_csv") || "CSV" },
      { value: "json", name: this.localize?.term("formats_json") || "JSON" },
      { value: "xml", name: this.localize?.term("formats_xml") || "XML" }
    ], this.scopeOptions = [
      { value: c.Current, name: this.localize?.term("exportOptions_currentSnapshot") || "Current Snapshot" },
      { value: c.Historical, name: this.localize?.term("exportOptions_historicalData") || "Historical Data" },
      { value: c.Custom, name: this.localize?.term("exportOptions_customRange") || "Custom Range" }
    ], _(this, A, (t) => {
      const e = t.target;
      this.onFormatChange && this.onFormatChange(e.value);
    }), _(this, q, (t) => {
      const e = t.target;
      this.onScopeChange && this.onScopeChange(e.value);
    }), _(this, z, (t) => {
      this.onMetricToggle && this.onMetricToggle(t);
    }), _(this, w, (t, e) => {
      const i = e.target;
      this.onDateChange && this.onDateChange(t, i.value);
    }), _(this, R, (t) => {
      const e = t.target;
      this.onTimezoneChange && this.onTimezoneChange(e.value);
    });
  }
  render() {
    return x`
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
              @change="${h(this, A)}"
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
              @change="${h(this, q)}"
              ?disabled="${this.disabled}"
            >            
            </uui-select>
          </div>

          <!-- Date Range (only for custom scope) -->
          ${this.exportOptions.scope === c.Custom ? x`
            <div class="form-group span-2">
              <label>${this.localize?.term("exportOptions_dateRange") || "Date Range"}</label>
              <div class="date-range">
                <uui-input
                  type="date"
                  label="${this.localize?.term("exportOptions_startDate") || "Start Date"}"
                  .value="${this.exportOptions.startDate || ""}"
                  @change="${(t) => h(this, w).call(this, "startDate", t)}"
                  ?disabled="${this.disabled}"
                ></uui-input>
                
                <span class="date-separator">${this.localize?.term("exportOptions_to") || "to"}</span>
                
                <uui-input
                  type="date"
                  label="${this.localize?.term("exportOptions_endDate") || "End Date"}"
                  .value="${this.exportOptions.endDate || ""}"
                  @change="${(t) => h(this, w).call(this, "endDate", t)}"
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
              @change="${h(this, R)}"
              ?disabled="${this.disabled}"
            >
              <uui-option value="UTC">${this.localize?.term("timezones_utc") || "UTC"}</uui-option>
              <uui-option value="Local">${this.localize?.term("timezones_local") || "Local Time"}</uui-option>
              <uui-option value="Europe/London">${this.localize?.term("timezones_europeLondon") || "Europe/London"}</uui-option>
              <uui-option value="America/New_York">${this.localize?.term("timezones_americaNewYork") || "America/New_York"}</uui-option>
              <uui-option value="Asia/Tokyo">${this.localize?.term("timezones_asiaTokyo") || "Asia/Tokyo"}</uui-option>
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
              @change="${() => h(this, z).call(this, "includePerformanceMetrics")}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="${this.localize?.term("exportOptions_umbracoMetrics") || "Umbraco Metrics"}"
              .checked="${this.exportOptions.includeUmbracoMetrics}"
              @change="${() => h(this, z).call(this, "includeUmbracoMetrics")}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
            
            <uui-toggle 
              label="${this.localize?.term("exportOptions_activeRequests") || "Active Requests"}"
              .checked="${this.exportOptions.includeActiveRequests}"
              @change="${() => h(this, z).call(this, "includeActiveRequests")}"
              ?disabled="${this.disabled}"
            ></uui-toggle>
          </div>
        </div>

        <!-- Estimated Size -->
        <div class="estimated-size">
          <uui-icon name="icon-info"></uui-icon>
          ${this.localize?.term("export_estimatedFileSize") || "Estimated file size"}: <strong>${this.estimatedSize}</strong>
        </div>
      </div>
    `;
  }
};
A = /* @__PURE__ */ new WeakMap();
q = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
R = /* @__PURE__ */ new WeakMap();
u.styles = O`${N(ae)}`;
m([
  l({ type: Object })
], u.prototype, "exportOptions", 2);
m([
  l({ type: Boolean })
], u.prototype, "disabled", 2);
m([
  l({ type: String })
], u.prototype, "estimatedSize", 2);
m([
  l({ type: Function })
], u.prototype, "onFormatChange", 2);
m([
  l({ type: Function })
], u.prototype, "onScopeChange", 2);
m([
  l({ type: Function })
], u.prototype, "onMetricToggle", 2);
m([
  l({ type: Function })
], u.prototype, "onDateChange", 2);
m([
  l({ type: Function })
], u.prototype, "onTimezoneChange", 2);
u = m([
  k("umbmetrics-export-options")
], u);
const pe = '.export-progress{margin-top:var(--uui-size-space-5);padding:var(--uui-size-space-4);background-color:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius)}.progress-bar{height:8px;background-color:var(--uui-color-surface);border-radius:4px;overflow:hidden;margin-bottom:var(--uui-size-space-2)}.progress-fill{height:100%;background-color:var(--uui-color-positive);border-radius:4px;transition:width .3s ease}.progress-text{display:flex;justify-content:space-between;align-items:center;font-size:.875rem;color:var(--uui-color-text-alt)}.progress-text:before{content:"⏳";margin-right:var(--uui-size-space-2)}';
var ue = Object.defineProperty, de = Object.getOwnPropertyDescriptor, I = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? de(e, i) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (r = (o ? s(e, i, r) : s(r)) || r);
  return o && r && ue(e, i, r), r;
};
let $ = class extends S(W) {
  constructor() {
    super(...arguments), this.isExporting = !1, this.progress = 0;
  }
  render() {
    return this.isExporting ? x`
      <div class="export-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${this.progress}%"></div>
        </div>
        <div class="progress-text">
          ${this.localize?.term("export_exporting") || "Exporting..."} ${this.progress}%
        </div>
      </div>
    ` : x``;
  }
};
$.styles = O`${N(pe)}`;
I([
  l({ type: Boolean })
], $.prototype, "isExporting", 2);
I([
  l({ type: Number })
], $.prototype, "progress", 2);
$ = I([
  k("umbmetrics-export-progress")
], $);
var me = Object.defineProperty, he = Object.getOwnPropertyDescriptor, Y = (t) => {
  throw TypeError(t);
}, E = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? he(e, i) : e, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (r = (o ? s(e, i, r) : s(r)) || r);
  return o && r && me(e, i, r), r;
}, J = (t, e, i) => e.has(t) || Y("Cannot " + i), n = (t, e, i) => (J(t, e, "read from private field"), i ? i.call(t) : e.get(t)), v = (t, e, i) => e.has(t) ? Y("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), Q = (t, e, i, o) => (J(t, e, "write to private field"), e.set(t, i), i), T = (t, e, i) => (J(t, e, "access private method"), i), d, p, b, y, B, C, L;
let g = class extends S(K) {
  constructor() {
    super(), v(this, b), this._isExporting = !1, this._exportProgress = 0, this._exportOptions = {
      format: "csv",
      scope: c.Current,
      includePerformanceMetrics: !0,
      includeUmbracoMetrics: !0,
      includeActiveRequests: !1,
      timezone: "UTC"
    }, this._estimatedSize = "", v(this, d), v(this, p), v(this, B, async () => {
      if (!(!n(this, d) || this._isExporting)) {
        this._isExporting = !0, this._exportProgress = 10;
        try {
          if (this._exportOptions.scope === c.Custom) {
            if (!this._exportOptions.startDate || !this._exportOptions.endDate)
              throw new Error(this.localize?.term("validation_bothDatesRequired") || "Both start and end dates are required for custom range");
            const t = new Date(this._exportOptions.startDate), e = new Date(this._exportOptions.endDate);
            if (t > e)
              throw new Error(this.localize?.term("validation_startDateBeforeEndDate") || "Start date must be before end date");
          }
          this._exportProgress = 30, await n(this, d).exportMetrics(this._exportOptions), this._exportProgress = 100, n(this, p) && n(this, p).peek("positive", {
            data: {
              headline: this.localize?.term("export_exportComplete") || "Export Complete",
              message: `${this.localize?.term("export_metricsExportedSuccessfully") || "Metrics exported successfully"} (${this._estimatedSize})`
            }
          }), setTimeout(() => {
            this.modalContext && this.modalContext.submit();
          }, 1e3);
        } catch (t) {
          console.error("Export error:", t), n(this, p) && n(this, p).peek("danger", {
            data: {
              headline: this.localize?.term("export_exportFailed") || "Export Failed",
              message: t instanceof Error ? t.message : this.localize?.term("export_failedToExportMetrics") || "Failed to export metrics. Please try again."
            }
          }), this._isExporting = !1, this._exportProgress = 0;
        }
      }
    }), v(this, C, async (t) => {
      if (!(!n(this, d) || this._isExporting)) {
        this._isExporting = !0;
        try {
          await n(this, d).quickExport(!0, !0, t), n(this, p) && n(this, p).peek("positive", {
            data: {
              headline: this.localize?.term("export_exportComplete") || "Export Complete",
              message: `${this.localize?.term("export_quickExportCompleted") || "Quick export to"} ${t.toUpperCase()} ${this.localize?.term("export_completed") || "completed"}`
            }
          }), this.modalContext && this.modalContext.submit();
        } catch (e) {
          console.error("Quick export error:", e), n(this, p) && n(this, p).peek("danger", {
            data: {
              headline: this.localize?.term("export_exportFailed") || "Export Failed",
              message: e instanceof Error ? e.message : this.localize?.term("export_failedToExportMetrics") || "Failed to export metrics"
            }
          });
        } finally {
          this._isExporting = !1;
        }
      }
    }), v(this, L, () => {
      this.modalContext && this.modalContext.reject();
    }), this.consumeContext(V, (t) => {
      Q(this, p, t);
    }), this.consumeContext(Z, (t) => {
      Q(this, d, new te(async () => {
        const e = await t?.getLatestToken();
        if (!e)
          throw new Error("No authentication token available");
        return e;
      }));
    }), T(this, b, y).call(this);
  }
  render() {
    return x`
      <umb-modal-sidebar>
        <umb-body-layout headline="${this.localize?.term("export_title") || "Export Metrics"}">
          <div id="main">
            <umbmetrics-quick-export-buttons
              ?disabled="${this._isExporting}"
              .onCsvExport="${() => n(this, C).call(this, "csv")}"
              .onJsonExport="${() => n(this, C).call(this, "csv")}"
            ></umbmetrics-quick-export-buttons>
            
            <div class="divider">
              <span>${this.localize?.term("common_or") || "or"}</span>
            </div>
            
            <umbmetrics-export-options
              .exportOptions="${this._exportOptions}"
              ?disabled="${this._isExporting}"
              .estimatedSize="${this._estimatedSize}"     
              .onFormatChange="${(t) => {
      this._exportOptions = { ...this._exportOptions, format: t }, T(this, b, y).call(this);
    }}"
              .onScopeChange="${(t) => {
      this._exportOptions = { ...this._exportOptions, scope: t };
    }}"
              .onMetricToggle="${(t) => {
      this._exportOptions = {
        ...this._exportOptions,
        [t]: !this._exportOptions[t]
      }, T(this, b, y).call(this);
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
              @click="${n(this, L)}"
              ?disabled="${this._isExporting}"
            >
              ${this.localize?.term("export_cancel") || "Cancel"}
            </uui-button>
            
            <uui-button 
              look="primary"
              color="positive"
              @click="${n(this, B)}"
              ?disabled="${this._isExporting || !this._exportOptions.includePerformanceMetrics && !this._exportOptions.includeUmbracoMetrics}"
            >
              ${this._isExporting ? x`
                <uui-icon name="icon-time"></uui-icon>
                ${this.localize?.term("export_exporting") || "Exporting..."}
              ` : x`
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
d = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakSet();
y = function() {
  n(this, d) && (this._estimatedSize = n(this, d).estimateFileSize(this._exportOptions));
};
B = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakMap();
L = /* @__PURE__ */ new WeakMap();
g.styles = [...ee.styles, O`${N(ie)}`];
E([
  M()
], g.prototype, "_isExporting", 2);
E([
  M()
], g.prototype, "_exportProgress", 2);
E([
  M()
], g.prototype, "_exportOptions", 2);
E([
  M()
], g.prototype, "_estimatedSize", 2);
g = E([
  k("umbmetrics-export-modal")
], g);
const be = g;
export {
  g as UmbMetricsExportModalElement,
  be as default
};
//# sourceMappingURL=export-modal.element-CIyC8NG-.js.map
