import { LitElement as S, html as l, unsafeCSS as V, css as k, property as d, customElement as T, state as $ } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as U } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as te } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT as ie } from "@umbraco-cms/backoffice/current-user";
import { UMB_AUTH_CONTEXT as re } from "@umbraco-cms/backoffice/auth";
import { M as ae } from "./active-requests-sidebar.element-DxrkQQUB.js";
import { UMB_MODAL_MANAGER_CONTEXT as H } from "@umbraco-cms/backoffice/modal";
import { A as oe, U as se } from "./bundle.manifests-DWVuRyEE.js";
function j(e, t) {
  return e > t ? "danger" : e > t * 0.7 ? "warning" : "positive";
}
function c(e) {
  return e.toLocaleString();
}
function ne(e) {
  const t = Math.floor(e / 86400), i = Math.floor(e % 86400 / 3600), o = Math.floor(e % 3600 / 60), r = Math.floor(e % 60);
  return `${t}d ${i}h ${o}m ${r}s`;
}
const ce = ":host{display:block}.app-info-banner{display:flex;flex-wrap:wrap;gap:1rem;padding:1rem;background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);margin-bottom:1.5rem;border:1px solid var(--uui-color-border)}.info-item{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:var(--uui-color-text)}.info-item strong{color:var(--uui-color-text-alt)}.info-item.connected,.info-item.connected strong{color:var(--uui-color-positive)}.info-item.connected uui-icon{color:var(--uui-color-positive)}";
var le = Object.defineProperty, ue = Object.getOwnPropertyDescriptor, G = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ue(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && le(t, i, r), r;
};
let w = class extends U(S) {
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
          <strong>Uptime:</strong> ${ne(this.applicationInfo.uptimeSeconds)}
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
w.styles = k`${V(ce)}`;
G([
  d({ type: Object })
], w.prototype, "applicationInfo", 2);
G([
  d({ type: Boolean })
], w.prototype, "isConnected", 2);
w = G([
  T("umbmetrics-app-info-banner")
], w);
var de = Object.defineProperty, me = Object.getOwnPropertyDescriptor, X = (e) => {
  throw TypeError(e);
}, f = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? me(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && de(t, i, r), r;
}, pe = (e, t, i) => t.has(e) || X("Cannot " + i), he = (e, t, i) => (pe(e, t, "read from private field"), i ? i.call(e) : t.get(e)), ve = (e, t, i) => t.has(e) ? X("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), I;
let h = class extends U(S) {
  constructor() {
    super(...arguments), this.icon = "icon-info", this.title = "", this.value = "", this.detail = "", this.color = "default", this.span = 1, this.clickable = !1, this.actionIcon = "icon-activity", this.actionLabel = "View Details", ve(this, I, (e) => {
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
              @click="${he(this, I)}"
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
I = /* @__PURE__ */ new WeakMap();
h.styles = k`
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
  T("umbmetrics-metric-card")
], h);
var be = Object.defineProperty, fe = Object.getOwnPropertyDescriptor, J = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? fe(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && be(t, i, r), r;
};
let O = class extends U(S) {
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
O.styles = k`
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
J([
  d({ type: Number })
], O.prototype, "columns", 2);
O = J([
  T("umbmetrics-metrics-grid")
], O);
var ge = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, E = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ye(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && ge(t, i, r), r;
};
let _ = class extends U(S) {
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
_.styles = k`
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
E([
  d({ type: String })
], _.prototype, "icon", 2);
E([
  d({ type: String })
], _.prototype, "title", 2);
E([
  d({ type: Array })
], _.prototype, "stats", 2);
E([
  d({ type: Number, reflect: !0 })
], _.prototype, "span", 2);
_ = E([
  T("umbmetrics-stat-card")
], _);
const _e = ":host{display:block;padding:1rem}uui-box.wide{width:100%}.metrics-controls{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}.connection-status{display:flex;align-items:center;gap:.25rem;font-size:.875rem;padding:.25rem .75rem;border-radius:var(--uui-border-radius)}.connection-status.connected{color:var(--uui-color-positive);background:var(--uui-color-positive-emphasis)}.connection-status.connecting{color:var(--uui-color-warning);background:var(--uui-color-warning-emphasis)}.tab-navigation{display:flex;gap:.5rem;margin-bottom:1.5rem;border-bottom:1px solid var(--uui-color-border);padding-bottom:1rem}.tab-content{min-height:400px}.utils-tab{padding:1rem 0}.utils-tab h3{margin:0 0 .5rem;font-size:1.5rem;font-weight:600;color:var(--uui-color-text)}.utils-tab .description{margin:0 0 2rem;color:var(--uui-color-text-alt);font-size:.875rem}.utils-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}.util-card{background:var(--uui-color-surface);border:1px solid var(--uui-color-border);border-radius:var(--uui-border-radius);padding:1.5rem;transition:all .2s ease}.util-card:hover{border-color:var(--uui-color-interactive);box-shadow:0 4px 12px #0000001a}.util-icon{display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:var(--uui-color-surface-alt);border-radius:50%;margin-bottom:1rem}.util-icon uui-icon{font-size:1.5rem;color:var(--uui-color-interactive)}.util-content h4{margin:0 0 .5rem;font-size:1.125rem;font-weight:600;color:var(--uui-color-text)}.util-content p{margin:0 0 1rem;color:var(--uui-color-text-alt);font-size:.875rem;line-height:1.5}@media(max-width:768px){.utils-grid{grid-template-columns:1fr}.util-card{padding:1rem}}";
var Me = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, Q = (e) => {
  throw TypeError(e);
}, M = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ce(t, i) : t, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = (o ? n(t, i, r) : n(r)) || r);
  return o && r && Me(t, i, r), r;
}, W = (e, t, i) => t.has(e) || Q("Cannot " + i), a = (e, t, i) => (W(e, t, "read from private field"), i ? i.call(e) : t.get(e)), p = (e, t, i) => t.has(e) ? Q("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), C = (e, t, i, o) => (W(e, t, "write to private field"), t.set(e, i), i), y = (e, t, i) => (W(e, t, "access private method"), i), m, R, u, g, B, z, v, A, q, L, D, N, P, x, F, K, Y, Z, ee;
let b = class extends U(S) {
  constructor() {
    super(), p(this, v), this._autoRefresh = !1, this._activeTab = "overview", this._isConnected = !1, p(this, m), p(this, R), p(this, u), p(this, g), p(this, B, async (e) => {
      if (!a(this, u)) {
        console.error("Metrics service not initialized");
        return;
      }
      const t = e.target;
      t.state = "waiting";
      try {
        this._autoRefresh && a(this, u).isConnected ? (await a(this, u).requestMetrics(), y(this, v, A).call(this)) : await Promise.all([
          a(this, z).call(this),
          y(this, v, A).call(this)
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
    }), p(this, q, async () => {
      (await this.getContext(H))?.open(
        this,
        oe
      );
    }), p(this, L, async () => {
      (await this.getContext(H))?.open(
        this,
        se
      );
    }), p(this, D, async () => {
      this._autoRefresh = !this._autoRefresh, this._autoRefresh ? await a(this, N).call(this) : await a(this, P).call(this);
    }), p(this, N, async () => {
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
        }), C(this, g, a(this, u).onMetricsUpdate((e) => {
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
        }), a(this, g) && (a(this, g).call(this), C(this, g, void 0));
      }
    }), p(this, P, async () => {
      if (a(this, u))
        try {
          a(this, g) && (a(this, g).call(this), C(this, g, void 0)), await a(this, u).disconnectFromHub(), this._isConnected = !1, a(this, m) && a(this, m).peek("default", {
            data: {
              headline: "Disconnected",
              message: "Real-time updates disabled"
            }
          });
        } catch (e) {
          console.error("Error stopping auto-refresh:", e);
        }
    }), p(this, x, (e) => {
      this._activeTab = e;
    }), this.consumeContext(te, (e) => {
      C(this, m, e);
    }), this.consumeContext(ie, (e) => {
      this.observe(
        e?.currentUser,
        (t) => {
          this._contextCurrentUser = t;
        },
        "_contextCurrentUser"
      );
    }), this.consumeContext(re, (e) => {
      C(this, R, e), C(this, u, new ae(async () => {
        const t = await a(this, R)?.getLatestToken();
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
            @click="${() => a(this, x).call(this, "overview")}"
          >
            <uui-icon name="icon-chart"></uui-icon> Overview
          </uui-button>
          <uui-button 
            look="${this._activeTab === "heap" ? "primary" : "default"}"
            color="${this._activeTab === "heap" ? "positive" : "default"}"
            @click="${() => a(this, x).call(this, "heap")}"
          >
            <uui-icon name="icon-box"></uui-icon> Heap & GC
          </uui-button>
          <uui-button 
            look="${this._activeTab === "umbraco" ? "primary" : "default"}"
            color="${this._activeTab === "umbraco" ? "positive" : "default"}"
            @click="${() => a(this, x).call(this, "umbraco")}"
          >
            <uui-icon name="icon-umbraco"></uui-icon> Umbraco
          </uui-button>
          <uui-button 
            look="${this._activeTab === "utils" ? "primary" : "default"}"
            color="${this._activeTab === "utils" ? "positive" : "default"}"
            @click="${() => a(this, x).call(this, "utils")}"
          >
            <uui-icon name="icon-settings"></uui-icon> Utils
          </uui-button>
        </div>

        <div class="tab-content">
          ${y(this, v, ee).call(this)}
        </div>
      </uui-box>
          `;
  }
};
m = /* @__PURE__ */ new WeakMap();
R = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
B = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakSet();
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
q = /* @__PURE__ */ new WeakMap();
L = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
N = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
x = /* @__PURE__ */ new WeakMap();
F = function() {
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
          color="${j(e.cpuUsage, 80)}"
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
          detail="Last 100 requests"
          color="${j(e.requestMetrics.averageResponseTimeMs, 1e3)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-link"
          title="Active Requests"
          value="${e.requestMetrics.activeRequests}"
          detail="Total: ${c(e.requestMetrics.totalRequests)}"
          ?clickable=${!0}
          actionLabel="View Details"
          @card-action="${a(this, q)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-alert"
          title="Failed Requests"
          value="${c(e.requestMetrics.failedRequests)}"
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
          detail="Completed: ${c(e.threadInfo.completedWorkItemCount)}"
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
K = function() {
  if (!this._performanceMetrics)
    return l`<p>Click "Refresh Metrics" to load heap information</p>`;
  const e = this._performanceMetrics, t = [
    { label: "Gen 0", value: `${e.memoryUsage.gcGen0HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 1", value: `${e.memoryUsage.gcGen1HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 2", value: `${e.memoryUsage.gcGen2HeapSizeMB.toFixed(2)} MB` }
  ], i = [
    { label: "Gen 0", value: c(e.garbageCollectionStats.gen0Collections) },
    { label: "Gen 1", value: c(e.garbageCollectionStats.gen1Collections) },
    { label: "Gen 2", value: c(e.garbageCollectionStats.gen2Collections) }
  ], o = [
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
          .stats=${o}
        ></umbmetrics-stat-card>
      </umbmetrics-metrics-grid>
    `;
};
Y = function() {
  if (!this._umbracoMetrics)
    return l`<p>Click "Refresh Metrics" to load Umbraco-specific data</p>`;
  const e = this._umbracoMetrics, t = [
    { label: "Total Nodes", value: c(e.contentStatistics.totalContentNodes) },
    { label: "Published", value: c(e.contentStatistics.publishedNodes), color: "positive" },
    { label: "Unpublished", value: c(e.contentStatistics.unpublishedNodes), color: "warning" },
    { label: "Trashed", value: c(e.contentStatistics.trashedNodes), color: e.contentStatistics.trashedNodes > 0 ? "danger" : "positive" },
    { label: "Content Types", value: e.contentStatistics.contentTypeCount }
  ], i = [
    { label: "Total Items", value: c(e.mediaStatistics.totalMediaItems) },
    { label: "Total Size", value: `${e.mediaStatistics.totalMediaSizeMB.toFixed(2)} MB` },
    { label: "Images", value: c(e.mediaStatistics.imagesCount) },
    { label: "Documents", value: c(e.mediaStatistics.documentsCount) },
    { label: "Media Types", value: e.mediaStatistics.mediaTypeCount }
  ], o = [
    { label: "Runtime Cache", value: `${c(e.cacheStatistics.runtimeCacheCount)} items` },
    { label: "NuCache", value: `${c(e.cacheStatistics.nuCacheCount)} items` },
    { label: "Total Size", value: e.cacheStatistics.totalCacheSize }
  ], r = [
    { label: "Total Users", value: c(e.backofficeUsers.totalUsers) },
    { label: "Active Users", value: c(e.backofficeUsers.activeUsers), color: "positive" },
    { label: "Administrators", value: c(e.backofficeUsers.adminUsers) },
    { label: "Current Sessions", value: c(e.backofficeUsers.currentSessions), color: e.backofficeUsers.currentSessions > 0 ? "positive" : "default" }
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
          .stats=${o}
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
Z = function() {
  return l`
      <div class="utils-tab">
        <h3>Utility Tools</h3>
        <p class="description">Additional tools for managing and exporting metrics data</p>
        
        <div class="utils-grid">
          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-download"></uui-icon>
            </div>
            <div class="util-content">
              <h4>Export Metrics</h4>
              <p>Export performance and Umbraco metrics in various formats (CSV, JSON)</p>
              <uui-button 
                look="primary" 
                color="positive"
                @click="${a(this, L)}"
                style="margin-top: 1rem;"
              >
                <uui-icon name="icon-download"></uui-icon>
                Open Export Dialog
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-settings"></uui-icon>
            </div>
            <div class="util-content">
              <h4>Data Management</h4>
              <p>Manage historical metrics data and cleanup options</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-trash"></uui-icon>
                Cleanup Old Data
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-chart"></uui-icon>
            </div>
            <div class="util-content">
              <h4>Advanced Analytics</h4>
              <p>Generate detailed reports and analytics from collected metrics</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-chart"></uui-icon>
                Generate Report
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-alarm-clock"></uui-icon>
            </div>
            <div class="util-content">
              <h4>Scheduled Tasks</h4>
              <p>Schedule automatic exports and data collection tasks</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-time"></uui-icon>
                Schedule Export
              </uui-button>
            </div>
          </div>
        </div>
      </div>
    `;
};
ee = function() {
  switch (this._activeTab) {
    case "overview":
      return y(this, v, F).call(this);
    case "heap":
      return y(this, v, K).call(this);
    case "umbraco":
      return y(this, v, Y).call(this);
    case "utils":
      return y(this, v, Z).call(this);
    default:
      return y(this, v, F).call(this);
  }
};
b.styles = k`${V(_e)}`;
M([
  $()
], b.prototype, "_contextCurrentUser", 2);
M([
  $()
], b.prototype, "_performanceMetrics", 2);
M([
  $()
], b.prototype, "_autoRefresh", 2);
M([
  $()
], b.prototype, "_activeTab", 2);
M([
  $()
], b.prototype, "_isConnected", 2);
M([
  $()
], b.prototype, "_umbracoMetrics", 2);
b = M([
  T("umbmetrics-dashboard")
], b);
const Re = b;
export {
  b as UmbMetrcisDashboardElement,
  Re as default
};
//# sourceMappingURL=dashboard.element-rL4uqz_q.js.map
