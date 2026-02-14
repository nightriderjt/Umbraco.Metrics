import { LitElement as S, html as l, unsafeCSS as T, css as z, property as d, customElement as k, state as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as U } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as te } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT as ie } from "@umbraco-cms/backoffice/current-user";
import { UMB_AUTH_CONTEXT as ae } from "@umbraco-cms/backoffice/auth";
import { M as re } from "./active-requests-sidebar.element-CuDfZ5L2.js";
import "./export-modal.element-DyvmmFy3.js";
import { UMB_MODAL_MANAGER_CONTEXT as j } from "@umbraco-cms/backoffice/modal";
import { A as oe, U as se } from "./bundle.manifests-8zwSDxjj.js";
function V(e, t) {
  return e > t ? "danger" : e > t * 0.7 ? "warning" : "positive";
}
function n(e) {
  return e.toLocaleString();
}
function ce(e) {
  const t = Math.floor(e / 86400), i = Math.floor(e % 86400 / 3600), o = Math.floor(e % 3600 / 60), a = Math.floor(e % 60);
  return `${t}d ${i}h ${o}m ${a}s`;
}
const ne = ":host{display:block}.app-info-banner{display:flex;flex-wrap:wrap;gap:1rem;padding:1rem;background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);margin-bottom:1.5rem;border:1px solid var(--uui-color-border)}.info-item{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:var(--uui-color-text)}.info-item strong{color:var(--uui-color-text-alt)}.info-item.connected,.info-item.connected strong{color:var(--uui-color-positive)}.info-item.connected uui-icon{color:var(--uui-color-positive)}";
var le = Object.defineProperty, ue = Object.getOwnPropertyDescriptor, G = (e, t, i, o) => {
  for (var a = o > 1 ? void 0 : o ? ue(t, i) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (a = (o ? c(t, i, a) : c(a)) || a);
  return o && a && le(t, i, a), a;
};
let w = class extends U(S) {
  constructor() {
    super(...arguments), this.isConnected = !1;
  }
  render() {
    return this.applicationInfo ? l`
      <div class="app-info-banner">
        <div class="info-item">
          <strong>${this.localize?.term("appInfo_process") || "Process"}:</strong> ${this.applicationInfo.processName} (PID: ${this.applicationInfo.processId})
        </div>
        <div class="info-item">
          <strong>${this.localize?.term("appInfo_runtime") || "Runtime"}:</strong> ${this.applicationInfo.runtimeVersion}
        </div>
        <div class="info-item">
          <strong>${this.localize?.term("appInfo_architecture") || "Architecture"}:</strong> ${this.applicationInfo.is64BitProcess ? this.localize?.term("appInfo_64bit") || "64-bit" : this.localize?.term("appInfo_32bit") || "32-bit"}
        </div>
        <div class="info-item">
          <strong>${this.localize?.term("appInfo_cpuCores") || "CPU Cores"}:</strong> ${this.applicationInfo.processorCount}
        </div>
        <div class="info-item">
          <strong>${this.localize?.term("appInfo_uptime") || "Uptime"}:</strong> ${ce(this.applicationInfo.uptimeSeconds)}
        </div>
        ${this.isConnected ? l`
          <div class="info-item connected">
            <uui-icon name="icon-check"></uui-icon>
            <strong>${this.localize?.term("appInfo_signalRConnected") || "SignalR Connected"}</strong>
          </div>
        ` : ""}
      </div>
    ` : l``;
  }
};
w.styles = z`${T(ne)}`;
G([
  d({ type: Object })
], w.prototype, "applicationInfo", 2);
G([
  d({ type: Boolean })
], w.prototype, "isConnected", 2);
w = G([
  k("umbmetrics-app-info-banner")
], w);
const de = ':host{display:block;height:100%}:host([span="2"]){grid-column:span 2}:host([span="3"]){grid-column:span 3}:host([span="4"]){grid-column:span 4}.metric-card{display:flex;flex-direction:column;height:100%;background:var(--uui-color-surface);border:1px solid var(--uui-color-border);border-radius:var(--uui-border-radius);overflow:hidden}.card-header{display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:var(--uui-color-surface-alt);border-bottom:1px solid var(--uui-color-border);min-height:48px}.header-title{display:flex;align-items:center;gap:.5rem}.header-title uui-icon{font-size:1.25rem;color:var(--uui-color-interactive)}.header-title h3{margin:0;font-size:.875rem;font-weight:600;color:var(--uui-color-text-alt)}.action-button{--uui-button-height: 28px;--uui-button-padding-left-factor: 1;--uui-button-padding-right-factor: 1}.action-button uui-icon{font-size:1rem}.card-body{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;padding:1.25rem 1rem;text-align:center}.metric-value{font-size:1.75rem;font-weight:700;color:var(--uui-color-text);line-height:1.2}.metric-value.positive{color:var(--uui-color-positive)}.metric-value.warning{color:var(--uui-color-warning)}.metric-value.danger{color:var(--uui-color-danger)}.metric-detail{font-size:.8rem;color:var(--uui-color-text-alt);margin-top:.5rem}';
var me = Object.defineProperty, pe = Object.getOwnPropertyDescriptor, X = (e) => {
  throw TypeError(e);
}, f = (e, t, i, o) => {
  for (var a = o > 1 ? void 0 : o ? pe(t, i) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (a = (o ? c(t, i, a) : c(a)) || a);
  return o && a && me(t, i, a), a;
}, he = (e, t, i) => t.has(e) || X("Cannot " + i), ve = (e, t, i) => (he(e, t, "read from private field"), i ? i.call(e) : t.get(e)), be = (e, t, i) => t.has(e) ? X("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), O;
let h = class extends U(S) {
  constructor() {
    super(...arguments), this.icon = "icon-info", this.title = "", this.value = "", this.detail = "", this.color = "default", this.span = 1, this.clickable = !1, this.actionIcon = "icon-activity", this.actionLabel = "View Details", be(this, O, (e) => {
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
              @click="${ve(this, O)}"
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
h.styles = z`${T(de)}`;
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
  k("umbmetrics-metric-card")
], h);
const fe = ':host{display:block}.metrics-grid{display:grid;grid-template-columns:repeat(var(--grid-columns, 4),1fr);grid-auto-rows:1fr;gap:1rem}@media(max-width:1200px){.metrics-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:768px){.metrics-grid{grid-template-columns:1fr}}::slotted([span="2"]){grid-column:span 2}::slotted([span="3"]){grid-column:span 3}::slotted([span="4"]){grid-column:span 4}';
var ge = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, J = (e, t, i, o) => {
  for (var a = o > 1 ? void 0 : o ? _e(t, i) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (a = (o ? c(t, i, a) : c(a)) || a);
  return o && a && ge(t, i, a), a;
};
let I = class extends U(S) {
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
I.styles = z`${T(fe)}`;
J([
  d({ type: Number })
], I.prototype, "columns", 2);
I = J([
  k("umbmetrics-metrics-grid")
], I);
const $e = ':host{display:block;height:100%}:host([span="2"]){grid-column:span 2}:host([span="3"]){grid-column:span 3}:host([span="4"]){grid-column:span 4}.stat-card{display:flex;flex-direction:column;height:100%;background:var(--uui-color-surface);border:1px solid var(--uui-color-border);border-radius:var(--uui-border-radius);overflow:hidden}.card-header{display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:var(--uui-color-surface-alt);border-bottom:1px solid var(--uui-color-border);min-height:48px}.header-title{display:flex;align-items:center;gap:.5rem}.header-title uui-icon{font-size:1.25rem;color:var(--uui-color-interactive)}.header-title h3{margin:0;font-size:.875rem;font-weight:600;color:var(--uui-color-text-alt)}.card-body{flex:1;padding:1rem}.stats-list{display:flex;flex-direction:column;gap:.5rem}.stat-row{display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--uui-color-border)}.stat-row:last-child{border-bottom:none}.stat-label{color:var(--uui-color-text-alt);font-size:.875rem}.stat-row strong{font-size:.95rem;font-weight:600}.stat-row strong.positive{color:var(--uui-color-positive)}.stat-row strong.warning{color:var(--uui-color-warning)}.stat-row strong.danger{color:var(--uui-color-danger)}.stat-row strong.default{color:var(--uui-color-text)}';
var ye = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, E = (e, t, i, o) => {
  for (var a = o > 1 ? void 0 : o ? Me(t, i) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (a = (o ? c(t, i, a) : c(a)) || a);
  return o && a && ye(t, i, a), a;
};
let $ = class extends U(S) {
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
$.styles = z`${T($e)}`;
E([
  d({ type: String })
], $.prototype, "icon", 2);
E([
  d({ type: String })
], $.prototype, "title", 2);
E([
  d({ type: Array })
], $.prototype, "stats", 2);
E([
  d({ type: Number, reflect: !0 })
], $.prototype, "span", 2);
$ = E([
  k("umbmetrics-stat-card")
], $);
const Ce = ":host{display:block;padding:1rem}uui-box.wide{width:100%}.metrics-controls{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}.connection-status{display:flex;align-items:center;gap:.25rem;font-size:.875rem;padding:.25rem .75rem;border-radius:var(--uui-border-radius)}.connection-status.connected{color:var(--uui-color-positive);background:var(--uui-color-positive-emphasis)}.connection-status.connecting{color:var(--uui-color-warning);background:var(--uui-color-warning-emphasis)}.tab-navigation{display:flex;gap:.5rem;margin-bottom:1.5rem;border-bottom:1px solid var(--uui-color-border);padding-bottom:1rem}.tab-content{min-height:400px}.utils-tab{padding:1rem 0}.utils-tab h3{margin:0 0 .5rem;font-size:1.5rem;font-weight:600;color:var(--uui-color-text)}.utils-tab .description{margin:0 0 2rem;color:var(--uui-color-text-alt);font-size:.875rem}.utils-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}.util-card{background:var(--uui-color-surface);border:1px solid var(--uui-color-border);border-radius:var(--uui-border-radius);padding:1.5rem;transition:all .2s ease}.util-card:hover{border-color:var(--uui-color-interactive);box-shadow:0 4px 12px #0000001a}.util-icon{display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:var(--uui-color-surface-alt);border-radius:50%;margin-bottom:1rem}.util-icon uui-icon{font-size:1.5rem;color:var(--uui-color-interactive)}.util-content h4{margin:0 0 .5rem;font-size:1.125rem;font-weight:600;color:var(--uui-color-text)}.util-content p{margin:0 0 1rem;color:var(--uui-color-text-alt);font-size:.875rem;line-height:1.5}@media(max-width:768px){.utils-grid{grid-template-columns:1fr}.util-card{padding:1rem}}";
var xe = Object.defineProperty, we = Object.getOwnPropertyDescriptor, Q = (e) => {
  throw TypeError(e);
}, y = (e, t, i, o) => {
  for (var a = o > 1 ? void 0 : o ? we(t, i) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (a = (o ? c(t, i, a) : c(a)) || a);
  return o && a && xe(t, i, a), a;
}, q = (e, t, i) => t.has(e) || Q("Cannot " + i), r = (e, t, i) => (q(e, t, "read from private field"), i ? i.call(e) : t.get(e)), p = (e, t, i) => t.has(e) ? Q("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), M = (e, t, i, o) => (q(e, t, "write to private field"), t.set(e, i), i), _ = (e, t, i) => (q(e, t, "access private method"), i), m, R, u, g, D, A, v, B, W, H, L, N, P, C, F, K, Y, Z, ee;
let b = class extends U(S) {
  constructor() {
    super(), p(this, v), this._autoRefresh = !1, this._activeTab = "overview", this._isConnected = !1, p(this, m), p(this, R), p(this, u), p(this, g), p(this, D, async (e) => {
      if (!r(this, u)) {
        console.error("Metrics service not initialized");
        return;
      }
      const t = e.target;
      t.state = "waiting";
      try {
        this._autoRefresh && r(this, u).isConnected ? (await r(this, u).requestMetrics(), _(this, v, B).call(this)) : await Promise.all([
          r(this, A).call(this),
          _(this, v, B).call(this)
        ]), t.state = "success";
      } catch (i) {
        console.error("Error refreshing metrics:", i), t.state = "failed";
      }
    }), p(this, A, async () => {
      if (!r(this, u)) {
        console.error("Metrics service not initialized");
        return;
      }
      try {
        this._performanceMetrics = await r(this, u).getPerformanceMetrics();
      } catch (e) {
        console.error("Error loading performance metrics:", e), r(this, m) && r(this, m).peek("danger", {
          data: {
            headline: "Error",
            message: e instanceof Error ? e.message : "Failed to load performance metrics"
          }
        });
      }
    }), p(this, W, async () => {
      (await this.getContext(j))?.open(
        this,
        oe
      );
    }), p(this, H, async () => {
      (await this.getContext(j))?.open(
        this,
        se
      );
    }), p(this, L, async () => {
      this._autoRefresh = !this._autoRefresh, this._autoRefresh ? await r(this, N).call(this) : await r(this, P).call(this);
    }), p(this, N, async () => {
      if (!r(this, u)) {
        console.error("Metrics service not initialized"), this._autoRefresh = !1;
        return;
      }
      try {
        r(this, m) && r(this, m).peek("default", {
          data: {
            headline: "Connecting...",
            message: "Establishing connection to metrics hub"
          }
        }), M(this, g, r(this, u).onMetricsUpdate((e) => {
          this._performanceMetrics = e, this._isConnected = !0;
        })), await r(this, u).connectToHub(), this._isConnected = r(this, u).isConnected, this._isConnected && r(this, m) && r(this, m).peek("positive", {
          data: {
            headline: "Connected",
            message: "Real-time metrics updates enabled"
          }
        });
      } catch (e) {
        console.error("Error starting auto-refresh:", e), this._autoRefresh = !1, this._isConnected = !1, r(this, m) && r(this, m).peek("danger", {
          data: {
            headline: "Connection Failed",
            message: e instanceof Error ? e.message : "Failed to connect to metrics hub. Try again."
          }
        }), r(this, g) && (r(this, g).call(this), M(this, g, void 0));
      }
    }), p(this, P, async () => {
      if (r(this, u))
        try {
          r(this, g) && (r(this, g).call(this), M(this, g, void 0)), await r(this, u).disconnectFromHub(), this._isConnected = !1, r(this, m) && r(this, m).peek("default", {
            data: {
              headline: "Disconnected",
              message: "Real-time updates disabled"
            }
          });
        } catch (e) {
          console.error("Error stopping auto-refresh:", e);
        }
    }), p(this, C, (e) => {
      this._activeTab = e;
    }), this.consumeContext(te, (e) => {
      M(this, m, e);
    }), this.consumeContext(ie, (e) => {
      this.observe(
        e?.currentUser,
        (t) => {
          this._contextCurrentUser = t;
        },
        "_contextCurrentUser"
      );
    }), this.consumeContext(ae, (e) => {
      M(this, R, e), M(this, u, new re(async () => {
        const t = await r(this, R)?.getLatestToken();
        if (!t)
          throw new Error("No authentication token available");
        return t;
      }));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), r(this, P).call(this);
  }
  render() {
    return l`
      <uui-box headline="${this.localize?.term("dashboard_applicationPerformanceMetrics") || "Application Performance Metrics"}" class="wide">
        <div slot="header">[${this.localize?.term("dashboard_dotnetApplication") || ".NET Application"} - ${this.localize?.term("dashboard_realTimeMetrics") || "Real-time Metrics"}${this._contextCurrentUser?.name ? ` - ${this._contextCurrentUser.name}` : ""}]</div>

        <div class="metrics-controls">
          <uui-button color="default" look="primary" @click="${r(this, D)}">
            <uui-icon name="icon-refresh"></uui-icon> ${this.localize?.term("dashboard_refreshMetrics") || "Refresh Metrics"}
          </uui-button>

          <uui-toggle
            label="${this.localize?.term("dashboard_realTimeUpdates") || "Real-time Updates (SignalR)"}"
            .checked="${this._autoRefresh}"
            @change="${r(this, L)}"
          ></uui-toggle>

          ${this._isConnected ? l`
            <span class="connection-status connected">
              <uui-icon name="icon-check"></uui-icon> ${this.localize?.term("dashboard_connected") || "Connected"}
            </span>
          ` : this._autoRefresh ? l`
            <span class="connection-status connecting">
              <uui-icon name="icon-time"></uui-icon> ${this.localize?.term("dashboard_connecting") || "Connecting..."}
            </span>
          ` : ""}
        </div>

        <div class="tab-navigation">
          <uui-button 
            look="${this._activeTab === "overview" ? "primary" : "default"}"
            color="${this._activeTab === "overview" ? "positive" : "default"}"
            @click="${() => r(this, C).call(this, "overview")}"
          >
            <uui-icon name="icon-chart"></uui-icon> ${this.localize?.term("dashboard_overview") || "Overview"}
          </uui-button>
          <uui-button 
            look="${this._activeTab === "heap" ? "primary" : "default"}"
            color="${this._activeTab === "heap" ? "positive" : "default"}"
            @click="${() => r(this, C).call(this, "heap")}"
          >
            <uui-icon name="icon-box"></uui-icon> ${this.localize?.term("dashboard_heapAndGC") || "Heap & GC"}
          </uui-button>
          <uui-button 
            look="${this._activeTab === "umbraco" ? "primary" : "default"}"
            color="${this._activeTab === "umbraco" ? "positive" : "default"}"
            @click="${() => r(this, C).call(this, "umbraco")}"
          >
            <uui-icon name="icon-umbraco"></uui-icon> ${this.localize?.term("dashboard_umbracoMetrics") || "Umbraco Metrics"}
          </uui-button>
          <uui-button 
            look="${this._activeTab === "utils" ? "primary" : "default"}"
            color="${this._activeTab === "utils" ? "positive" : "default"}"
            @click="${() => r(this, C).call(this, "utils")}"
          >
            <uui-icon name="icon-settings"></uui-icon> ${this.localize?.term("dashboard_utils") || "Utils"}
          </uui-button>
        </div>

        <div class="tab-content">
          ${_(this, v, ee).call(this)}
        </div>
      </uui-box>
          `;
  }
};
m = /* @__PURE__ */ new WeakMap();
R = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
A = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakSet();
B = async function() {
  if (!r(this, u)) {
    console.error("Metrics service not initialized");
    return;
  }
  try {
    this._umbracoMetrics = await r(this, u).getUmbracoMetrics();
  } catch (e) {
    console.error("Error loading Umbraco metrics:", e), r(this, m) && r(this, m).peek("danger", {
      data: {
        headline: "Error",
        message: e instanceof Error ? e.message : "Failed to load Umbraco metrics"
      }
    });
  }
};
W = /* @__PURE__ */ new WeakMap();
H = /* @__PURE__ */ new WeakMap();
L = /* @__PURE__ */ new WeakMap();
N = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakMap();
F = function() {
  if (!this._performanceMetrics)
    return l`<p>${this.localize?.term("dashboard_clickToLoadPerformance") || 'Click "Refresh Metrics" to load application performance data'}</p>`;
  const e = this._performanceMetrics;
  return l`
      <umbmetrics-app-info-banner
        .applicationInfo=${e.applicationInfo}
        .isConnected=${this._isConnected}
      ></umbmetrics-app-info-banner>

      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-metric-card
          icon="icon-dashboard"
          title="${this.localize?.term("metrics_cpuUsage") || "CPU Usage"}"
          value="${e.cpuUsage.toFixed(1)}%"
          detail="Process CPU"
          color="${V(e.cpuUsage, 80)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-memory"
          title="${this.localize?.term("metrics_memoryUsage") || "Memory Usage"}"
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
          color="${V(e.requestMetrics.averageResponseTimeMs, 1e3)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-link"
          title="${this.localize?.term("metrics_activeRequests") || "Active Requests"}"
          value="${e.requestMetrics.activeRequests}"
          detail="Total: ${n(e.requestMetrics.totalRequests)}"
          ?clickable=${!0}
          actionLabel="View Details"
          @card-action="${r(this, W)}"
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
          title="${this.localize?.term("metrics_threadCount") || "Thread Count"}"
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
          title="${this.localize?.term("dashboard_lastUpdated") || "Last updated"}"
          value="${new Date(e.timestamp).toLocaleString()}"
        ></umbmetrics-metric-card>
      </umbmetrics-metrics-grid>
    `;
};
K = function() {
  if (!this._performanceMetrics)
    return l`<p>${this.localize?.term("dashboard_clickToLoadHeap") || 'Click "Refresh Metrics" to load heap information'}</p>`;
  const e = this._performanceMetrics, t = [
    { label: "Gen 0", value: `${e.memoryUsage.gcGen0HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 1", value: `${e.memoryUsage.gcGen1HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 2", value: `${e.memoryUsage.gcGen2HeapSizeMB.toFixed(2)} MB` }
  ], i = [
    { label: "Gen 0", value: n(e.garbageCollectionStats.gen0Collections) },
    { label: "Gen 1", value: n(e.garbageCollectionStats.gen1Collections) },
    { label: "Gen 2", value: n(e.garbageCollectionStats.gen2Collections) }
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
    return l`<p>${this.localize?.term("dashboard_clickToLoadUmbraco") || 'Click "Refresh Metrics" to load Umbraco-specific data'}</p>`;
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
  ], o = [
    { label: "Runtime Cache", value: `${n(e.cacheStatistics.runtimeCacheCount)} items` },
    { label: "NuCache", value: `${n(e.cacheStatistics.nuCacheCount)} items` },
    { label: "Total Size", value: e.cacheStatistics.totalCacheSize }
  ], a = [
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
          .stats=${o}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-users"
          title="Backoffice Users"
          .stats=${a}
        ></umbmetrics-stat-card>
      </umbmetrics-metrics-grid>
    `;
};
Z = function() {
  return l`
      <div class="utils-tab">
        <h3>${this.localize?.term("dashboard_utilityTools") || "Utility Tools"}</h3>
        <p class="description">${this.localize?.term("dashboard_utilityToolsDescription") || "Additional tools for managing and exporting metrics data"}</p>
        
        <div class="utils-grid">
          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-download"></uui-icon>
            </div>
            <div class="util-content">
              <h4>${this.localize?.term("dashboard_exportMetricsCard") || "Export Metrics"}</h4>
              <p>${this.localize?.term("dashboard_exportMetricsDescription") || "Export performance and Umbraco metrics in various formats (CSV, JSON)"}</p>
              <uui-button 
                look="primary" 
                color="positive"
                @click="${r(this, H)}"
                style="margin-top: 1rem;"
              >
                <uui-icon name="icon-download"></uui-icon>
                ${this.localize?.term("dashboard_openExportDialog") || "Open Export Dialog"}
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-settings"></uui-icon>
            </div>
            <div class="util-content">
              <h4>${this.localize?.term("dashboard_dataManagement") || "Data Management"}</h4>
              <p>${this.localize?.term("dashboard_dataManagementDescription") || "Manage historical metrics data and cleanup options"}</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-trash"></uui-icon>
                ${this.localize?.term("dashboard_cleanupOldData") || "Cleanup Old Data"}
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-chart"></uui-icon>
            </div>
            <div class="util-content">
              <h4>${this.localize?.term("dashboard_advancedAnalytics") || "Advanced Analytics"}</h4>
              <p>${this.localize?.term("dashboard_advancedAnalyticsDescription") || "Generate detailed reports and analytics from collected metrics"}</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-chart"></uui-icon>
                ${this.localize?.term("dashboard_generateReport") || "Generate Report"}
              </uui-button>
            </div>
          </div>

          <div class="util-card">
            <div class="util-icon">
              <uui-icon name="icon-alarm-clock"></uui-icon>
            </div>
            <div class="util-content">
              <h4>${this.localize?.term("dashboard_scheduledTasks") || "Scheduled Tasks"}</h4>
              <p>${this.localize?.term("dashboard_scheduledTasksDescription") || "Schedule automatic exports and data collection tasks"}</p>
              <uui-button 
                look="outline"
                style="margin-top: 1rem;"
                disabled
              >
                <uui-icon name="icon-time"></uui-icon>
                ${this.localize?.term("dashboard_scheduleExport") || "Schedule Export"}
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
      return _(this, v, F).call(this);
    case "heap":
      return _(this, v, K).call(this);
    case "umbraco":
      return _(this, v, Y).call(this);
    case "utils":
      return _(this, v, Z).call(this);
    default:
      return _(this, v, F).call(this);
  }
};
b.styles = z`${T(Ce)}`;
y([
  x()
], b.prototype, "_contextCurrentUser", 2);
y([
  x()
], b.prototype, "_performanceMetrics", 2);
y([
  x()
], b.prototype, "_autoRefresh", 2);
y([
  x()
], b.prototype, "_activeTab", 2);
y([
  x()
], b.prototype, "_isConnected", 2);
y([
  x()
], b.prototype, "_umbracoMetrics", 2);
b = y([
  k("umbmetrics-dashboard")
], b);
const Oe = b;
export {
  b as UmbMetrcisDashboardElement,
  Oe as default
};
//# sourceMappingURL=dashboard.element-CEhVUHIv.js.map
