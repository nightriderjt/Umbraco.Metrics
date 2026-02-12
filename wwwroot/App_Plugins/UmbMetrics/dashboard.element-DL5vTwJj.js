import { LitElement as S, html as l, css as T, property as d, customElement as U, unsafeCSS as K, state as $ } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as k } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as Y } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT as Z } from "@umbraco-cms/backoffice/current-user";
import { UMB_AUTH_CONTEXT as ee } from "@umbraco-cms/backoffice/auth";
import { M as te } from "./active-requests-sidebar.element-DxrkQQUB.js";
import { UMB_MODAL_MANAGER_CONTEXT as ie } from "@umbraco-cms/backoffice/modal";
import { A as re } from "./bundle.manifests-BV8RrVWw.js";
function L(e, t) {
  return e > t ? "danger" : e > t * 0.7 ? "warning" : "positive";
}
function n(e) {
  return e.toLocaleString();
}
function ae(e) {
  const t = Math.floor(e / 86400), i = Math.floor(e % 86400 / 3600), s = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
  return `${t}d ${i}h ${s}m ${r}s`;
}
var se = Object.defineProperty, oe = Object.getOwnPropertyDescriptor, q = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? oe(t, i) : t, o = e.length - 1, c; o >= 0; o--)
    (c = e[o]) && (r = (s ? c(t, i, r) : c(r)) || r);
  return s && r && se(t, i, r), r;
};
let x = class extends k(S) {
  constructor() {
    super(...arguments), this.isConnected = !1;
  }
  render() {
    return this.applicationInfo ? l`
      <div class="app-info-banner">
        <div class="info-item">
          <strong>Process:</strong> ${this.applicationInfo.processName} (PID: ${this.applicationInfo.processId})
        </div>
        <div class="info-item">
          <strong>Runtime:</strong> ${this.applicationInfo.runtimeVersion}
        </div>
        <div class="info-item">
          <strong>Architecture:</strong> ${this.applicationInfo.is64BitProcess ? "64-bit" : "32-bit"}
        </div>
        <div class="info-item">
          <strong>CPU Cores:</strong> ${this.applicationInfo.processorCount}
        </div>
        <div class="info-item">
          <strong>Uptime:</strong> ${ae(this.applicationInfo.uptimeSeconds)}
        </div>
        ${this.isConnected ? l`
          <div class="info-item connected">
            <uui-icon name="icon-check"></uui-icon>
            <strong>SignalR Connected</strong>
          </div>
        ` : ""}
      </div>
    ` : l``;
  }
};
x.styles = T`
    :host {
      display: block;
    }

    .app-info-banner {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;
      background: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
      margin-bottom: 1.5rem;
      border: 1px solid var(--uui-color-border);
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--uui-color-text);
    }

    .info-item strong {
      color: var(--uui-color-text-alt);
    }

    .info-item.connected {
      color: var(--uui-color-positive);
    }

    .info-item.connected strong {
      color: var(--uui-color-positive);
    }

    .info-item.connected uui-icon {
      color: var(--uui-color-positive);
    }
  `;
q([
  d({ type: Object })
], x.prototype, "applicationInfo", 2);
q([
  d({ type: Boolean })
], x.prototype, "isConnected", 2);
x = q([
  U("umbmetrics-app-info-banner")
], x);
var ce = Object.defineProperty, ne = Object.getOwnPropertyDescriptor, H = (e) => {
  throw TypeError(e);
}, f = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ne(t, i) : t, o = e.length - 1, c; o >= 0; o--)
    (c = e[o]) && (r = (s ? c(t, i, r) : c(r)) || r);
  return s && r && ce(t, i, r), r;
}, le = (e, t, i) => t.has(e) || H("Cannot " + i), ue = (e, t, i) => (le(e, t, "read from private field"), i ? i.call(e) : t.get(e)), de = (e, t, i) => t.has(e) ? H("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), O;
let h = class extends k(S) {
  constructor() {
    super(...arguments), this.icon = "icon-info", this.title = "", this.value = "", this.detail = "", this.color = "default", this.span = 1, this.clickable = !1, this.actionIcon = "icon-activity", this.actionLabel = "View Details", de(this, O, (e) => {
      e.stopPropagation(), this.clickable && this.dispatchEvent(new CustomEvent("card-action", { bubbles: !0, composed: !0 }));
    });
  }
  render() {
    return l`
      <div class="metric-card">
        <div class="card-header">
          <div class="header-title">
            <uui-icon name="${this.icon}"></uui-icon>
            <h3>${this.title}</h3>
          </div>
          ${this.clickable ? l`
            <uui-button 
              class="action-button"
              look="secondary" 
              compact 
              @click="${ue(this, O)}"
              title="${this.actionLabel}"
            >
              <uui-icon name="${this.actionIcon}"></uui-icon>
            </uui-button>
          ` : ""}
        </div>
        
        <div class="card-body">
          <div class="metric-value ${this.color}">
            ${this.value}
          </div>
          ${this.detail ? l`<div class="metric-detail">${this.detail}</div>` : ""}
          <slot></slot>
        </div>
      </div>
    `;
  }
};
O = /* @__PURE__ */ new WeakMap();
h.styles = T`
    :host {
      display: block;
      height: 100%;
    }

    :host([span="2"]) {
      grid-column: span 2;
    }

    :host([span="3"]) {
      grid-column: span 3;
    }

    :host([span="4"]) {
      grid-column: span 4;
    }

    .metric-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--uui-color-surface);
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      overflow: hidden;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--uui-color-surface-alt);
      border-bottom: 1px solid var(--uui-color-border);
      min-height: 48px;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-title uui-icon {
      font-size: 1.25rem;
      color: var(--uui-color-interactive);
    }

    .header-title h3 {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--uui-color-text-alt);
    }

    .action-button {
      --uui-button-height: 28px;
      --uui-button-padding-left-factor: 1;
      --uui-button-padding-right-factor: 1;
    }

    .action-button uui-icon {
      font-size: 1rem;
    }

    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      padding: 1.25rem 1rem;
      text-align: center;
    }

    .metric-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--uui-color-text);
      line-height: 1.2;
    }

    .metric-value.positive {
      color: var(--uui-color-positive);
    }

    .metric-value.warning {
      color: var(--uui-color-warning);
    }

    .metric-value.danger {
      color: var(--uui-color-danger);
    }

    .metric-detail {
      font-size: 0.8rem;
      color: var(--uui-color-text-alt);
      margin-top: 0.5rem;
    }
  `;
f([
  d({ type: String })
], h.prototype, "icon", 2);
f([
  d({ type: String })
], h.prototype, "title", 2);
f([
  d({ type: String })
], h.prototype, "value", 2);
f([
  d({ type: String })
], h.prototype, "detail", 2);
f([
  d({ type: String })
], h.prototype, "color", 2);
f([
  d({ type: Number, reflect: !0 })
], h.prototype, "span", 2);
f([
  d({ type: Boolean })
], h.prototype, "clickable", 2);
f([
  d({ type: String })
], h.prototype, "actionIcon", 2);
f([
  d({ type: String })
], h.prototype, "actionLabel", 2);
h = f([
  U("umbmetrics-metric-card")
], h);
var me = Object.defineProperty, pe = Object.getOwnPropertyDescriptor, j = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? pe(t, i) : t, o = e.length - 1, c; o >= 0; o--)
    (c = e[o]) && (r = (s ? c(t, i, r) : c(r)) || r);
  return s && r && me(t, i, r), r;
};
let I = class extends k(S) {
  constructor() {
    super(...arguments), this.columns = 4;
  }
  render() {
    return l`
      <div class="metrics-grid" style="--grid-columns: ${this.columns}">
        <slot></slot>
      </div>
    `;
  }
};
I.styles = T`
    :host {
      display: block;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(var(--grid-columns, 4), 1fr);
      grid-auto-rows: 1fr;
      gap: 1rem;
    }

    @media (max-width: 1200px) {
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Handle span classes for slotted elements */
    ::slotted([span="2"]) {
      grid-column: span 2;
    }

    ::slotted([span="3"]) {
      grid-column: span 3;
    }

    ::slotted([span="4"]) {
      grid-column: span 4;
    }
  `;
j([
  d({ type: Number })
], I.prototype, "columns", 2);
I = j([
  U("umbmetrics-metrics-grid")
], I);
var he = Object.defineProperty, ve = Object.getOwnPropertyDescriptor, R = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ve(t, i) : t, o = e.length - 1, c; o >= 0; o--)
    (c = e[o]) && (r = (s ? c(t, i, r) : c(r)) || r);
  return s && r && he(t, i, r), r;
};
let y = class extends k(S) {
  constructor() {
    super(...arguments), this.icon = "icon-info", this.title = "", this.stats = [], this.span = 1;
  }
  render() {
    return l`
      <div class="stat-card">
        <div class="card-header">
          <div class="header-title">
            <uui-icon name="${this.icon}"></uui-icon>
            <h3>${this.title}</h3>
          </div>
        </div>
        
        <div class="card-body">
          <div class="stats-list">
            ${this.stats.map((e) => l`
              <div class="stat-row">
                <span class="stat-label">${e.label}</span>
                <strong class="${e.color || "default"}">${e.value}</strong>
              </div>
            `)}
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }
};
y.styles = T`
    :host {
      display: block;
      height: 100%;
    }

    :host([span="2"]) {
      grid-column: span 2;
    }

    :host([span="3"]) {
      grid-column: span 3;
    }

    :host([span="4"]) {
      grid-column: span 4;
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--uui-color-surface);
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      overflow: hidden;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--uui-color-surface-alt);
      border-bottom: 1px solid var(--uui-color-border);
      min-height: 48px;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-title uui-icon {
      font-size: 1.25rem;
      color: var(--uui-color-interactive);
    }

    .header-title h3 {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--uui-color-text-alt);
    }

    .card-body {
      flex: 1;
      padding: 1rem;
    }

    .stats-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--uui-color-border);
    }

    .stat-row:last-child {
      border-bottom: none;
    }

    .stat-label {
      color: var(--uui-color-text-alt);
      font-size: 0.875rem;
    }

    .stat-row strong {
      font-size: 0.95rem;
      font-weight: 600;
    }

    .stat-row strong.positive {
      color: var(--uui-color-positive);
    }

    .stat-row strong.warning {
      color: var(--uui-color-warning);
    }

    .stat-row strong.danger {
      color: var(--uui-color-danger);
    }

    .stat-row strong.default {
      color: var(--uui-color-text);
    }
  `;
R([
  d({ type: String })
], y.prototype, "icon", 2);
R([
  d({ type: String })
], y.prototype, "title", 2);
R([
  d({ type: Array })
], y.prototype, "stats", 2);
R([
  d({ type: Number, reflect: !0 })
], y.prototype, "span", 2);
y = R([
  U("umbmetrics-stat-card")
], y);
const fe = ":host{display:block;padding:1rem}uui-box.wide{width:100%}.metrics-controls{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}.connection-status{display:flex;align-items:center;gap:.25rem;font-size:.875rem;padding:.25rem .75rem;border-radius:var(--uui-border-radius)}.connection-status.connected{color:var(--uui-color-positive);background:var(--uui-color-positive-emphasis)}.connection-status.connecting{color:var(--uui-color-warning);background:var(--uui-color-warning-emphasis)}.tab-navigation{display:flex;gap:.5rem;margin-bottom:1.5rem;border-bottom:1px solid var(--uui-color-border);padding-bottom:1rem}.tab-content{min-height:400px}";
var be = Object.defineProperty, ge = Object.getOwnPropertyDescriptor, V = (e) => {
  throw TypeError(e);
}, C = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ge(t, i) : t, o = e.length - 1, c; o >= 0; o--)
    (c = e[o]) && (r = (s ? c(t, i, r) : c(r)) || r);
  return s && r && be(t, i, r), r;
}, W = (e, t, i) => t.has(e) || V("Cannot " + i), a = (e, t, i) => (W(e, t, "read from private field"), i ? i.call(e) : t.get(e)), p = (e, t, i) => t.has(e) ? V("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), M = (e, t, i, s) => (W(e, t, "write to private field"), t.set(e, i), i), _ = (e, t, i) => (W(e, t, "access private method"), i), m, E, u, b, B, z, g, A, G, D, F, P, w, N, X, Q, J;
let v = class extends k(S) {
  constructor() {
    super(), p(this, g), this._autoRefresh = !1, this._activeTab = "overview", this._isConnected = !1, p(this, m), p(this, E), p(this, u), p(this, b), p(this, B, async (e) => {
      if (!a(this, u)) {
        console.error("Metrics service not initialized");
        return;
      }
      const t = e.target;
      t.state = "waiting";
      try {
        this._autoRefresh && a(this, u).isConnected ? (await a(this, u).requestMetrics(), _(this, g, A).call(this)) : await Promise.all([
          a(this, z).call(this),
          _(this, g, A).call(this)
        ]), t.state = "success";
      } catch (i) {
        console.error("Error refreshing metrics:", i), t.state = "failed";
      }
    }), p(this, z, async () => {
      if (!a(this, u)) {
        console.error("Metrics service not initialized");
        return;
      }
      try {
        this._performanceMetrics = await a(this, u).getPerformanceMetrics();
      } catch (e) {
        console.error("Error loading performance metrics:", e), a(this, m) && a(this, m).peek("danger", {
          data: {
            headline: "Error",
            message: e instanceof Error ? e.message : "Failed to load performance metrics"
          }
        });
      }
    }), p(this, G, async () => {
      (await this.getContext(ie))?.open(
        this,
        re
      );
    }), p(this, D, async () => {
      this._autoRefresh = !this._autoRefresh, this._autoRefresh ? await a(this, F).call(this) : await a(this, P).call(this);
    }), p(this, F, async () => {
      if (!a(this, u)) {
        console.error("Metrics service not initialized"), this._autoRefresh = !1;
        return;
      }
      try {
        a(this, m) && a(this, m).peek("default", {
          data: {
            headline: "Connecting...",
            message: "Establishing connection to metrics hub"
          }
        }), M(this, b, a(this, u).onMetricsUpdate((e) => {
          this._performanceMetrics = e, this._isConnected = !0;
        })), await a(this, u).connectToHub(), this._isConnected = a(this, u).isConnected, this._isConnected && a(this, m) && a(this, m).peek("positive", {
          data: {
            headline: "Connected",
            message: "Real-time metrics updates enabled"
          }
        });
      } catch (e) {
        console.error("Error starting auto-refresh:", e), this._autoRefresh = !1, this._isConnected = !1, a(this, m) && a(this, m).peek("danger", {
          data: {
            headline: "Connection Failed",
            message: e instanceof Error ? e.message : "Failed to connect to metrics hub. Try again."
          }
        }), a(this, b) && (a(this, b).call(this), M(this, b, void 0));
      }
    }), p(this, P, async () => {
      if (a(this, u))
        try {
          a(this, b) && (a(this, b).call(this), M(this, b, void 0)), await a(this, u).disconnectFromHub(), this._isConnected = !1, a(this, m) && a(this, m).peek("default", {
            data: {
              headline: "Disconnected",
              message: "Real-time updates disabled"
            }
          });
        } catch (e) {
          console.error("Error stopping auto-refresh:", e);
        }
    }), p(this, w, (e) => {
      this._activeTab = e;
    }), this.consumeContext(Y, (e) => {
      M(this, m, e);
    }), this.consumeContext(Z, (e) => {
      this.observe(
        e?.currentUser,
        (t) => {
          this._contextCurrentUser = t;
        },
        "_contextCurrentUser"
      );
    }), this.consumeContext(ee, (e) => {
      M(this, E, e), M(this, u, new te(async () => {
        const t = await a(this, E)?.getLatestToken();
        if (!t)
          throw new Error("No authentication token available");
        return t;
      }));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), a(this, P).call(this);
  }
  render() {
    return l`
      <uui-box headline="Application Performance Metrics" class="wide">
        <div slot="header">[.NET 10 Application - Real-time Metrics${this._contextCurrentUser?.name ? ` - ${this._contextCurrentUser.name}` : ""}]</div>

        <div class="metrics-controls">
          <uui-button color="default" look="primary" @click="${a(this, B)}">
            <uui-icon name="icon-refresh"></uui-icon> Refresh Metrics
          </uui-button>

          <uui-toggle
            label="Real-time Updates (SignalR)"
            .checked="${this._autoRefresh}"
            @change="${a(this, D)}"
          ></uui-toggle>

          ${this._isConnected ? l`
            <span class="connection-status connected">
              <uui-icon name="icon-check"></uui-icon> Connected
            </span>
          ` : this._autoRefresh ? l`
            <span class="connection-status connecting">
              <uui-icon name="icon-time"></uui-icon> Connecting...
            </span>
          ` : ""}
        </div>

        <div class="tab-navigation">
          <uui-button 
            look="${this._activeTab === "overview" ? "primary" : "default"}"
            color="${this._activeTab === "overview" ? "positive" : "default"}"
            @click="${() => a(this, w).call(this, "overview")}"
          >
            <uui-icon name="icon-chart"></uui-icon> Overview
          </uui-button>
          <uui-button 
            look="${this._activeTab === "heap" ? "primary" : "default"}"
            color="${this._activeTab === "heap" ? "positive" : "default"}"
            @click="${() => a(this, w).call(this, "heap")}"
          >
            <uui-icon name="icon-box"></uui-icon> Heap & GC
          </uui-button>
          <uui-button 
            look="${this._activeTab === "umbraco" ? "primary" : "default"}"
            color="${this._activeTab === "umbraco" ? "positive" : "default"}"
            @click="${() => a(this, w).call(this, "umbraco")}"
          >
            <uui-icon name="icon-umbraco"></uui-icon> Umbraco
          </uui-button>
        </div>

        <div class="tab-content">
          ${_(this, g, J).call(this)}
        </div>
      </uui-box>
          `;
  }
};
m = /* @__PURE__ */ new WeakMap();
E = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakMap();
B = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakSet();
A = async function() {
  if (!a(this, u)) {
    console.error("Metrics service not initialized");
    return;
  }
  try {
    this._umbracoMetrics = await a(this, u).getUmbracoMetrics();
  } catch (e) {
    console.error("Error loading Umbraco metrics:", e), a(this, m) && a(this, m).peek("danger", {
      data: {
        headline: "Error",
        message: e instanceof Error ? e.message : "Failed to load Umbraco metrics"
      }
    });
  }
};
G = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
N = function() {
  if (!this._performanceMetrics)
    return l`<p>Click "Refresh Metrics" to load application performance data</p>`;
  const e = this._performanceMetrics;
  return l`
      <umbmetrics-app-info-banner
        .applicationInfo=${e.applicationInfo}
        .isConnected=${this._isConnected}
      ></umbmetrics-app-info-banner>

      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-metric-card
          icon="icon-dashboard"
          title="CPU Usage"
          value="${e.cpuUsage.toFixed(1)}%"
          detail="Process CPU"
          color="${L(e.cpuUsage, 80)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-memory"
          title="Working Set"
          value="${e.memoryUsage.workingSetMB.toFixed(0)} MB"
          detail="Private: ${e.memoryUsage.privateMemoryMB.toFixed(0)} MB"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-activity"
          title="Requests/Sec"
          value="${e.requestMetrics.requestsPerSecond.toFixed(2)}"
          detail="Last min: ${e.requestMetrics.lastMinuteRequests}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-timer"
          title="Avg Response"
          value="${e.requestMetrics.averageResponseTimeMs.toFixed(0)} ms"
          detail="Last 1000 requests"
          color="${L(e.requestMetrics.averageResponseTimeMs, 1e3)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-link"
          title="Active Requests"
          value="${e.requestMetrics.activeRequests}"
          detail="Total: ${n(e.requestMetrics.totalRequests)}"
          ?clickable=${!0}
          actionLabel="View Details"
          @card-action="${a(this, G)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-alert"
          title="Failed Requests"
          value="${n(e.requestMetrics.failedRequests)}"
          detail="4xx/5xx responses"
          color="${e.requestMetrics.failedRequests > 0 ? "danger" : "positive"}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-nodes"
          title="Threads"
          value="${e.threadInfo.threadCount}"
          detail="Pool: ${e.threadInfo.threadPoolThreadCount}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-list"
          title="Work Items"
          value="${e.threadInfo.pendingWorkItemCount}"
          detail="Completed: ${n(e.threadInfo.completedWorkItemCount)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          span="4"
          icon="icon-calendar"
          title="Last Updated"
          value="${new Date(e.timestamp).toLocaleString()}"
        ></umbmetrics-metric-card>
      </umbmetrics-metrics-grid>
    `;
};
X = function() {
  if (!this._performanceMetrics)
    return l`<p>Click "Refresh Metrics" to load heap information</p>`;
  const e = this._performanceMetrics, t = [
    { label: "Gen 0", value: `${e.memoryUsage.gcGen0HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 1", value: `${e.memoryUsage.gcGen1HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 2", value: `${e.memoryUsage.gcGen2HeapSizeMB.toFixed(2)} MB` }
  ], i = [
    { label: "Gen 0", value: n(e.garbageCollectionStats.gen0Collections) },
    { label: "Gen 1", value: n(e.garbageCollectionStats.gen1Collections) },
    { label: "Gen 2", value: n(e.garbageCollectionStats.gen2Collections) }
  ], s = [
    { label: "GC Mode", value: e.garbageCollectionStats.isServerGC ? "Server" : "Workstation" },
    { label: "Total Heap Size", value: `${e.memoryUsage.totalHeapSizeMB.toFixed(2)} MB` },
    { label: "Fragmented Memory", value: `${e.memoryUsage.fragmentedMemoryMB.toFixed(2)} MB` },
    { label: "Memory Load", value: `${e.garbageCollectionStats.memoryLoadMB.toFixed(2)} MB` },
    { label: "High Memory Threshold", value: `${e.garbageCollectionStats.highMemoryLoadThresholdMB.toFixed(2)} MB` },
    { label: "Latency Mode", value: e.garbageCollectionStats.gcLatencyMode },
    { label: "Total Pause Time", value: `${e.garbageCollectionStats.totalPauseTimeMs.toFixed(2)} ms` }
  ];
  return l`
      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-stat-card
          span="2"
          icon="icon-box"
          title="GC Heap Sizes"
          .stats=${t}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-trash"
          title="GC Collections"
          .stats=${i}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="4"
          icon="icon-chart"
          title="Garbage Collector Details"
          .stats=${s}
        ></umbmetrics-stat-card>
      </umbmetrics-metrics-grid>
    `;
};
Q = function() {
  if (!this._umbracoMetrics)
    return l`<p>Click "Refresh Metrics" to load Umbraco-specific data</p>`;
  const e = this._umbracoMetrics, t = [
    { label: "Total Nodes", value: n(e.contentStatistics.totalContentNodes) },
    { label: "Published", value: n(e.contentStatistics.publishedNodes), color: "positive" },
    { label: "Unpublished", value: n(e.contentStatistics.unpublishedNodes), color: "warning" },
    { label: "Trashed", value: n(e.contentStatistics.trashedNodes), color: e.contentStatistics.trashedNodes > 0 ? "danger" : "positive" },
    { label: "Content Types", value: e.contentStatistics.contentTypeCount }
  ], i = [
    { label: "Total Items", value: n(e.mediaStatistics.totalMediaItems) },
    { label: "Total Size", value: `${e.mediaStatistics.totalMediaSizeMB.toFixed(2)} MB` },
    { label: "Images", value: n(e.mediaStatistics.imagesCount) },
    { label: "Documents", value: n(e.mediaStatistics.documentsCount) },
    { label: "Media Types", value: e.mediaStatistics.mediaTypeCount }
  ], s = [
    { label: "Runtime Cache", value: `${n(e.cacheStatistics.runtimeCacheCount)} items` },
    { label: "NuCache", value: `${n(e.cacheStatistics.nuCacheCount)} items` },
    { label: "Total Size", value: e.cacheStatistics.totalCacheSize }
  ], r = [
    { label: "Total Users", value: n(e.backofficeUsers.totalUsers) },
    { label: "Active Users", value: n(e.backofficeUsers.activeUsers), color: "positive" },
    { label: "Administrators", value: n(e.backofficeUsers.adminUsers) },
    { label: "Current Sessions", value: n(e.backofficeUsers.currentSessions), color: e.backofficeUsers.currentSessions > 0 ? "positive" : "default" }
  ];
  return l`
      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-stat-card
          span="2"
          icon="icon-document"
          title="Content Statistics"
          .stats=${t}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-picture"
          title="Media Library"
          .stats=${i}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-server-alt"
          title="Cache Performance"
          .stats=${s}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-users"
          title="Backoffice Users"
          .stats=${r}
        ></umbmetrics-stat-card>
      </umbmetrics-metrics-grid>
    `;
};
J = function() {
  switch (this._activeTab) {
    case "overview":
      return _(this, g, N).call(this);
    case "heap":
      return _(this, g, X).call(this);
    case "umbraco":
      return _(this, g, Q).call(this);
    default:
      return _(this, g, N).call(this);
  }
};
v.styles = T`${K(fe)}`;
C([
  $()
], v.prototype, "_contextCurrentUser", 2);
C([
  $()
], v.prototype, "_performanceMetrics", 2);
C([
  $()
], v.prototype, "_autoRefresh", 2);
C([
  $()
], v.prototype, "_activeTab", 2);
C([
  $()
], v.prototype, "_isConnected", 2);
C([
  $()
], v.prototype, "_umbracoMetrics", 2);
v = C([
  U("umbmetrics-dashboard")
], v);
const Te = v;
export {
  v as UmbMetrcisDashboardElement,
  Te as default
};
//# sourceMappingURL=dashboard.element-DL5vTwJj.js.map
