import { html as _, unsafeCSS as O, css as M, state as v, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalElement as $ } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as P } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as U } from "@umbraco-cms/backoffice/auth";
import { UUIModalElement as T } from "@umbraco-cms/backoffice/external/uui";
var s = /* @__PURE__ */ ((r) => (r.Json = "json", r.Csv = "csv", r.Xml = "xml", r))(s || {}), n = /* @__PURE__ */ ((r) => (r.Current = "current", r.Historical = "historical", r.Custom = "custom", r))(n || {});
class D {
  constructor(e) {
    this.tokenProvider = e, this.API_BASE_URL = "/umbraco/management/api/v1/metrics";
  }
  /**
   * Export metrics with custom options
   */
  async exportMetrics(e) {
    const t = await this.tokenProvider();
    if (!t)
      throw new Error("No authentication token available");
    const i = await fetch(`${this.API_BASE_URL}/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify(e)
    });
    if (!i.ok) {
      if (i.status === 400) {
        const a = await i.json();
        throw new Error(a.detail || "Invalid export configuration");
      }
      throw new Error(
        `Failed to export metrics: ${i.status} ${i.statusText}`
      );
    }
    await this.downloadFile(i);
  }
  /**
   * Export performance metrics only
   */
  async exportPerformanceMetrics(e = s.Json) {
    const t = await this.tokenProvider(), i = await fetch(
      `${this.API_BASE_URL}/export/performance?format=${e}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${t}`
        }
      }
    );
    if (!i.ok)
      throw new Error(`Failed to export performance metrics: ${i.statusText}`);
    await this.downloadFile(i);
  }
  /**
   * Export Umbraco metrics only
   */
  async exportUmbracoMetrics(e = s.Json) {
    const t = await this.tokenProvider(), i = await fetch(
      `${this.API_BASE_URL}/export/umbraco?format=${e}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${t}`
        }
      }
    );
    if (!i.ok)
      throw new Error(`Failed to export Umbraco metrics: ${i.statusText}`);
    await this.downloadFile(i);
  }
  /**
   * Quick export with default options
   */
  async quickExport(e = !0, t = !0, i = s.Csv) {
    const a = {
      format: i,
      scope: n.Current,
      includePerformanceMetrics: e,
      includeUmbracoMetrics: t,
      includeActiveRequests: !1,
      timezone: "UTC"
    };
    await this.exportMetrics(a);
  }
  /**
   * Download file from response
   */
  async downloadFile(e) {
    const t = e.headers.get("Content-Disposition");
    let i = "metrics-export";
    if (t) {
      const b = t.match(/filename="?([^"]+)"?/);
      b && b[1] && (i = b[1]);
    }
    const a = await e.blob(), u = window.URL.createObjectURL(a), l = document.createElement("a");
    l.href = u, l.target = "_blank", l.download = i, document.body.appendChild(l), l.click(), window.URL.revokeObjectURL(u), document.body.removeChild(l);
  }
  /**
   * Get file size estimate for export
   */
  estimateFileSize(e) {
    let t = 0;
    if (e.includePerformanceMetrics && (t += 5), e.includeUmbracoMetrics && (t += 3), e.includeActiveRequests && (t += 2), e.scope === n.Historical || e.scope === n.Custom) {
      if (e.includePerformanceMetrics) {
        if (e.scope === n.Historical)
          t += 720 * 60 * 60 / 5 * 1;
        else if (e.scope === n.Custom && e.startDate && e.endDate) {
          const i = new Date(e.startDate), a = new Date(e.endDate), u = Math.max(1, Math.ceil((a.getTime() - i.getTime()) / (1e3 * 60 * 60 * 24)));
          t += u * 24 * 60 * 60 / 5 * 1;
        }
      }
      e.includeUmbracoMetrics && (t += 0);
    }
    switch (e.format) {
      case s.Json:
        t *= 1.2;
        break;
      case s.Csv:
        t *= 0.8;
        break;
      case s.Xml:
        t *= 1.5;
        break;
    }
    return t < 1 ? "< 1 KB" : t < 1024 ? `${Math.round(t)} KB` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1)} MB` : `${(t / (1024 * 1024)).toFixed(1)} GB`;
  }
  /**
   * Get supported formats for display
   */
  getSupportedFormats() {
    return [
      {
        value: s.Json,
        label: "JSON",
        description: "Structured data format, good for APIs and programming"
      },
      {
        value: s.Csv,
        label: "CSV",
        description: "Spreadsheet format, good for Excel and data analysis"
      },
      {
        value: s.Xml,
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
        value: n.Current,
        label: "Current Snapshot",
        description: "Export current metrics only"
      },
      {
        value: n.Historical,
        label: "Historical Data",
        description: "Export historical metrics (requires storage)"
      },
      {
        value: n.Custom,
        label: "Custom Range",
        description: "Export metrics from specific date range"
      }
    ];
  }
}
const A = '#main{padding:var(--uui-size-space-5)}.quick-export-section,.export-options-section{margin-bottom:var(--uui-size-space-5)}h4{margin:0 0 var(--uui-size-space-2) 0;font-size:1.25rem;font-weight:600;color:var(--uui-color-text)}h5{margin:var(--uui-size-space-4) 0 var(--uui-size-space-2) 0;font-size:1rem;font-weight:600;color:var(--uui-color-text-alt)}.description{margin:0 0 var(--uui-size-space-4) 0;color:var(--uui-color-text-alt);font-size:.875rem}.quick-export-buttons{display:flex;gap:var(--uui-size-space-3);flex-wrap:wrap}.divider{display:flex;align-items:center;margin:var(--uui-size-space-5) 0;text-align:center;color:var(--uui-color-text-alt)}.divider:before,.divider:after{content:"";flex:1;height:1px;background:var(--uui-color-border)}.divider span{padding:0 var(--uui-size-space-3);font-size:.875rem}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--uui-size-space-4);margin-bottom:var(--uui-size-space-4)}.form-group.span-2{grid-column:span 2}.form-group label{display:block;margin-bottom:var(--uui-size-space-1);font-size:.875rem;font-weight:600;color:var(--uui-color-text-alt)}.date-range{display:flex;align-items:center;gap:var(--uui-size-space-3)}.date-separator{color:var(--uui-color-text-alt);font-size:.875rem}.metric-selection{background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);padding:var(--uui-size-space-4);margin-bottom:var(--uui-size-space-4)}.metric-toggles{display:flex;flex-direction:column;gap:var(--uui-size-space-3)}.estimated-size{display:flex;align-items:center;gap:var(--uui-size-space-2);padding:var(--uui-size-space-3) var(--uui-size-space-4);background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);font-size:.875rem;color:var(--uui-color-text-alt)}.estimated-size uui-icon{color:var(--uui-color-interactive)}.estimated-size strong{color:var(--uui-color-text)}.export-progress{margin-top:var(--uui-size-space-5);padding:var(--uui-size-space-4);background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius)}.progress-bar{height:8px;background:var(--uui-color-border);border-radius:4px;overflow:hidden;margin-bottom:var(--uui-size-space-2)}.progress-fill{height:100%;background:var(--uui-color-positive);border-radius:4px;transition:width .3s ease}.progress-text{text-align:center;font-size:.875rem;color:var(--uui-color-text-alt)}@media(max-width:600px){.form-grid{grid-template-columns:1fr}.form-group.span-2{grid-column:span 1}.date-range{flex-direction:column;align-items:stretch}.date-separator{text-align:center}.quick-export-buttons{flex-direction:column}}';
var F = Object.defineProperty, B = Object.getOwnPropertyDescriptor, y = (r) => {
  throw TypeError(r);
}, x = (r, e, t, i) => {
  for (var a = i > 1 ? void 0 : i ? B(e, t) : e, u = r.length - 1, l; u >= 0; u--)
    (l = r[u]) && (a = (i ? l(e, t, a) : l(a)) || a);
  return i && a && F(e, t, a), a;
}, k = (r, e, t) => e.has(r) || y("Cannot " + t), o = (r, e, t) => (k(r, e, "read from private field"), e.get(r)), m = (r, e, t) => e.has(r) ? y("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), z = (r, e, t, i) => (k(r, e, "write to private field"), e.set(r, t), t), w = (r, e, t) => (k(r, e, "access private method"), t), p, c, h, f, E, g, C;
let d = class extends $ {
  constructor() {
    super(), m(this, h), this._isExporting = !1, this._exportProgress = 0, this._exportOptions = {
      format: s.Csv,
      scope: n.Current,
      includePerformanceMetrics: !0,
      includeUmbracoMetrics: !0,
      includeActiveRequests: !1,
      timezone: "UTC"
    }, this._estimatedSize = "", m(this, p), m(this, c), m(this, E, async () => {
      if (!(!o(this, p) || this._isExporting)) {
        this._isExporting = !0, this._exportProgress = 10;
        try {
          if (this._exportOptions.scope === n.Custom) {
            if (!this._exportOptions.startDate || !this._exportOptions.endDate)
              throw new Error("Both start and end dates are required for custom range");
            const r = new Date(this._exportOptions.startDate), e = new Date(this._exportOptions.endDate);
            if (r > e)
              throw new Error("Start date must be before end date");
          }
          this._exportProgress = 30, await o(this, p).exportMetrics(this._exportOptions), this._exportProgress = 100, o(this, c) && o(this, c).peek("positive", {
            data: {
              headline: "Export Complete",
              message: `Metrics exported successfully (${this._estimatedSize})`
            }
          }), setTimeout(() => {
            this.modalContext && this.modalContext.submit();
          }, 1e3);
        } catch (r) {
          console.error("Export error:", r), o(this, c) && o(this, c).peek("danger", {
            data: {
              headline: "Export Failed",
              message: r instanceof Error ? r.message : "Failed to export metrics. Please try again."
            }
          }), this._isExporting = !1, this._exportProgress = 0;
        }
      }
    }), m(this, g, async (r) => {
      if (!(!o(this, p) || this._isExporting)) {
        this._isExporting = !0;
        try {
          await o(this, p).quickExport(!0, !0, r), o(this, c) && o(this, c).peek("positive", {
            data: {
              headline: "Export Complete",
              message: `Quick export to ${r.toUpperCase()} completed`
            }
          }), this.modalContext && this.modalContext.submit();
        } catch (e) {
          console.error("Quick export error:", e), o(this, c) && o(this, c).peek("danger", {
            data: {
              headline: "Export Failed",
              message: e instanceof Error ? e.message : "Failed to export metrics"
            }
          });
        } finally {
          this._isExporting = !1;
        }
      }
    }), m(this, C, () => {
      this.modalContext && this.modalContext.reject();
    }), this.consumeContext(P, (r) => {
      z(this, c, r);
    }), this.consumeContext(U, (r) => {
      z(this, p, new D(async () => {
        const e = await r?.getLatestToken();
        if (!e)
          throw new Error("No authentication token available");
        return e;
      }));
    }), w(this, h, f).call(this);
  }
  render() {
    const r = o(this, p)?.getSupportedFormats() || [
      { value: s.Json, label: "JSON", description: "Structured data format" },
      { value: s.Csv, label: "CSV", description: "Spreadsheet format" },
      { value: s.Xml, label: "XML", description: "Markup format" }
    ], e = o(this, p)?.getScopeOptions() || [
      { value: n.Current, label: "Current Snapshot", description: "Export current metrics only" },
      { value: n.Historical, label: "Historical Data", description: "Export historical metrics" },
      { value: n.Custom, label: "Custom Range", description: "Export metrics from specific date range" }
    ];
    return _`
      <umb-modal-sidebar>
        <umb-body-layout headline="Export Metrics">
          <div id="main">
            <umbmetrics-quick-export-buttons
              .disabled="${this._isExporting}"
              .onCsvExport="${() => o(this, g).call(this, s.Csv)}"
              .onJsonExport="${() => o(this, g).call(this, s.Json)}"
            ></umbmetrics-quick-export-buttons>
            
            <div class="divider">
              <span>or</span>
            </div>
            
            <umbmetrics-export-options
              .exportOptions="${this._exportOptions}"
              .disabled="${this._isExporting}"
              .estimatedSize="${this._estimatedSize}"
              .formatOptions="${r}"
              .scopeOptions="${e}"
              .onFormatChange="${(t) => {
      this._exportOptions = { ...this._exportOptions, format: t }, w(this, h, f).call(this);
    }}"
              .onScopeChange="${(t) => {
      this._exportOptions = { ...this._exportOptions, scope: t };
    }}"
              .onMetricToggle="${(t) => {
      this._exportOptions = {
        ...this._exportOptions,
        [t]: !this._exportOptions[t]
      }, w(this, h, f).call(this);
    }}"
              .onDateChange="${(t, i) => {
      this._exportOptions = {
        ...this._exportOptions,
        [t]: i || void 0
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
              @click="${o(this, C)}"
              ?disabled="${this._isExporting}"
            >
              Cancel
            </uui-button>
            
            <uui-button 
              look="primary"
              color="positive"
              @click="${o(this, E)}"
              ?disabled="${this._isExporting || !this._exportOptions.includePerformanceMetrics && !this._exportOptions.includeUmbracoMetrics}"
            >
              ${this._isExporting ? _`
                <uui-icon name="icon-time"></uui-icon>
                Exporting...
              ` : _`
                <uui-icon name="icon-download"></uui-icon>
                Export Metrics
              `}
            </uui-button>
          </div>
        </umb-body-layout>
      </umb-modal-sidebar>
    `;
  }
};
p = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
f = function() {
  o(this, p) && (this._estimatedSize = o(this, p).estimateFileSize(this._exportOptions));
};
E = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakMap();
d.styles = [...T.styles, M`${O(A)}`];
x([
  v()
], d.prototype, "_isExporting", 2);
x([
  v()
], d.prototype, "_exportProgress", 2);
x([
  v()
], d.prototype, "_exportOptions", 2);
x([
  v()
], d.prototype, "_estimatedSize", 2);
d = x([
  S("umbmetrics-export-modal")
], d);
const N = d;
export {
  d as UmbMetricsExportModalElement,
  N as default
};
//# sourceMappingURL=export-modal.element-BQYYZef6.js.map
