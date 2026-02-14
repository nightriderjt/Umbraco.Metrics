import { LitElement as S, html as l, unsafeCSS as k, css as T, property as d, customElement as U, state as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as et } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT as it } from "@umbraco-cms/backoffice/current-user";
import { UMB_AUTH_CONTEXT as rt } from "@umbraco-cms/backoffice/auth";
import { M as at } from "./active-requests-sidebar.element-DxrkQQUB.js";
import "./export-modal.element-BQYYZef6.js";
import { UMB_MODAL_MANAGER_CONTEXT as j } from "@umbraco-cms/backoffice/modal";
import { A as ot, U as st } from "./bundle.manifests-BbUZzlgB.js";
function V(t, e) {
  return t > e ? "danger" : t > e * 0.7 ? "warning" : "positive";
}
function c(t) {
  return t.toLocaleString();
}
function nt(t) {
  const e = Math.floor(t / 86400), i = Math.floor(t % 86400 / 3600), o = Math.floor(t % 3600 / 60), r = Math.floor(t % 60);
  return `${e}d ${i}h ${o}m ${r}s`;
}
const ct = ":host{display:block}.app-info-banner{display:flex;flex-wrap:wrap;gap:1rem;padding:1rem;background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);margin-bottom:1.5rem;border:1px solid var(--uui-color-border)}.info-item{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:var(--uui-color-text)}.info-item strong{color:var(--uui-color-text-alt)}.info-item.connected,.info-item.connected strong{color:var(--uui-color-positive)}.info-item.connected uui-icon{color:var(--uui-color-positive)}";
var lt = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, W = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ut(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (r = (o ? n(e, i, r) : n(r)) || r);
  return o && r && lt(e, i, r), r;
};
let w = class extends E(S) {
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
          <strong>Uptime:</strong> ${nt(this.applicationInfo.uptimeSeconds)}
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
w.styles = T`${k(ct)}`;
W([
  d({ type: Object })
], w.prototype, "applicationInfo", 2);
W([
  d({ type: Boolean })
], w.prototype, "isConnected", 2);
w = W([
  U("umbmetrics-app-info-banner")
], w);
const dt = ':host{display:block;height:100%}:host([span="2"]){grid-column:span 2}:host([span="3"]){grid-column:span 3}:host([span="4"]){grid-column:span 4}.metric-card{display:flex;flex-direction:column;height:100%;background:var(--uui-color-surface);border:1px solid var(--uui-color-border);border-radius:var(--uui-border-radius);overflow:hidden}.card-header{display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:var(--uui-color-surface-alt);border-bottom:1px solid var(--uui-color-border);min-height:48px}.header-title{display:flex;align-items:center;gap:.5rem}.header-title uui-icon{font-size:1.25rem;color:var(--uui-color-interactive)}.header-title h3{margin:0;font-size:.875rem;font-weight:600;color:var(--uui-color-text-alt)}.action-button{--uui-button-height: 28px;--uui-button-padding-left-factor: 1;--uui-button-padding-right-factor: 1}.action-button uui-icon{font-size:1rem}.card-body{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;padding:1.25rem 1rem;text-align:center}.metric-value{font-size:1.75rem;font-weight:700;color:var(--uui-color-text);line-height:1.2}.metric-value.positive{color:var(--uui-color-positive)}.metric-value.warning{color:var(--uui-color-warning)}.metric-value.danger{color:var(--uui-color-danger)}.metric-detail{font-size:.8rem;color:var(--uui-color-text-alt);margin-top:.5rem}';
var mt = Object.defineProperty, pt = Object.getOwnPropertyDescriptor, X = (t) => {
  throw TypeError(t);
}, f = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? pt(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (r = (o ? n(e, i, r) : n(r)) || r);
  return o && r && mt(e, i, r), r;
}, ht = (t, e, i) => e.has(t) || X("Cannot " + i), vt = (t, e, i) => (ht(t, e, "read from private field"), i ? i.call(t) : e.get(t)), bt = (t, e, i) => e.has(t) ? X("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), B;
let h = class extends E(S) {
  constructor() {
    super(...arguments), this.icon = "icon-info", this.title = "", this.value = "", this.detail = "", this.color = "default", this.span = 1, this.clickable = !1, this.actionIcon = "icon-activity", this.actionLabel = "View Details", bt(this, B, (t) => {
      t.stopPropagation(), this.clickable && this.dispatchEvent(new CustomEvent("card-action", { bubbles: !0, composed: !0 }));
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
              @click="${vt(this, B)}"
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
B = /* @__PURE__ */ new WeakMap();
h.styles = T`${k(dt)}`;
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
const ft = ':host{display:block}.metrics-grid{display:grid;grid-template-columns:repeat(var(--grid-columns, 4),1fr);grid-auto-rows:1fr;gap:1rem}@media(max-width:1200px){.metrics-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:768px){.metrics-grid{grid-template-columns:1fr}}::slotted([span="2"]){grid-column:span 2}::slotted([span="3"]){grid-column:span 3}::slotted([span="4"]){grid-column:span 4}';
var gt = Object.defineProperty, yt = Object.getOwnPropertyDescriptor, J = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yt(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (r = (o ? n(e, i, r) : n(r)) || r);
  return o && r && gt(e, i, r), r;
};
let I = class extends E(S) {
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
I.styles = T`${k(ft)}`;
J([
  d({ type: Number })
], I.prototype, "columns", 2);
I = J([
  U("umbmetrics-metrics-grid")
], I);
const _t = ':host{display:block;height:100%}:host([span="2"]){grid-column:span 2}:host([span="3"]){grid-column:span 3}:host([span="4"]){grid-column:span 4}.stat-card{display:flex;flex-direction:column;height:100%;background:var(--uui-color-surface);border:1px solid var(--uui-color-border);border-radius:var(--uui-border-radius);overflow:hidden}.card-header{display:flex;justify-content:space-between;align-items:center;padding:.75rem 1rem;background:var(--uui-color-surface-alt);border-bottom:1px solid var(--uui-color-border);min-height:48px}.header-title{display:flex;align-items:center;gap:.5rem}.header-title uui-icon{font-size:1.25rem;color:var(--uui-color-interactive)}.header-title h3{margin:0;font-size:.875rem;font-weight:600;color:var(--uui-color-text-alt)}.card-body{flex:1;padding:1rem}.stats-list{display:flex;flex-direction:column;gap:.5rem}.stat-row{display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--uui-color-border)}.stat-row:last-child{border-bottom:none}.stat-label{color:var(--uui-color-text-alt);font-size:.875rem}.stat-row strong{font-size:.95rem;font-weight:600}.stat-row strong.positive{color:var(--uui-color-positive)}.stat-row strong.warning{color:var(--uui-color-warning)}.stat-row strong.danger{color:var(--uui-color-danger)}.stat-row strong.default{color:var(--uui-color-text)}';
var Mt = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, R = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ct(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (r = (o ? n(e, i, r) : n(r)) || r);
  return o && r && Mt(e, i, r), r;
};
let _ = class extends E(S) {
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
            ${this.stats.map((t) => l`
              <div class="stat-row">
                <span class="stat-label">${t.label}</span>
                <strong class="${t.color || "default"}">${t.value}</strong>
              </div>
            `)}
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }
};
_.styles = T`${k(_t)}`;
R([
  d({ type: String })
], _.prototype, "icon", 2);
R([
  d({ type: String })
], _.prototype, "title", 2);
R([
  d({ type: Array })
], _.prototype, "stats", 2);
R([
  d({ type: Number, reflect: !0 })
], _.prototype, "span", 2);
_ = R([
  U("umbmetrics-stat-card")
], _);
const $t = ":host{display:block;padding:1rem}uui-box.wide{width:100%}.metrics-controls{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}.connection-status{display:flex;align-items:center;gap:.25rem;font-size:.875rem;padding:.25rem .75rem;border-radius:var(--uui-border-radius)}.connection-status.connected{color:var(--uui-color-positive);background:var(--uui-color-positive-emphasis)}.connection-status.connecting{color:var(--uui-color-warning);background:var(--uui-color-warning-emphasis)}.tab-navigation{display:flex;gap:.5rem;margin-bottom:1.5rem;border-bottom:1px solid var(--uui-color-border);padding-bottom:1rem}.tab-content{min-height:400px}.utils-tab{padding:1rem 0}.utils-tab h3{margin:0 0 .5rem;font-size:1.5rem;font-weight:600;color:var(--uui-color-text)}.utils-tab .description{margin:0 0 2rem;color:var(--uui-color-text-alt);font-size:.875rem}.utils-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}.util-card{background:var(--uui-color-surface);border:1px solid var(--uui-color-border);border-radius:var(--uui-border-radius);padding:1.5rem;transition:all .2s ease}.util-card:hover{border-color:var(--uui-color-interactive);box-shadow:0 4px 12px #0000001a}.util-icon{display:flex;align-items:center;justify-content:center;width:48px;height:48px;background:var(--uui-color-surface-alt);border-radius:50%;margin-bottom:1rem}.util-icon uui-icon{font-size:1.5rem;color:var(--uui-color-interactive)}.util-content h4{margin:0 0 .5rem;font-size:1.125rem;font-weight:600;color:var(--uui-color-text)}.util-content p{margin:0 0 1rem;color:var(--uui-color-text-alt);font-size:.875rem;line-height:1.5}@media(max-width:768px){.utils-grid{grid-template-columns:1fr}.util-card{padding:1rem}}";
var xt = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, Q = (t) => {
  throw TypeError(t);
}, M = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? wt(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (r = (o ? n(e, i, r) : n(r)) || r);
  return o && r && xt(e, i, r), r;
}, q = (t, e, i) => e.has(t) || Q("Cannot " + i), a = (t, e, i) => (q(t, e, "read from private field"), i ? i.call(t) : e.get(t)), p = (t, e, i) => e.has(t) ? Q("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), C = (t, e, i, o) => (q(t, e, "write to private field"), e.set(t, i), i), y = (t, e, i) => (q(t, e, "access private method"), i), m, P, u, g, z, A, v, D, L, H, N, F, O, $, G, K, Y, Z, tt;
let b = class extends E(S) {
  constructor() {
    super(), p(this, v), this._autoRefresh = !1, this._activeTab = "overview", this._isConnected = !1, p(this, m), p(this, P), p(this, u), p(this, g), p(this, z, async (t) => {
      if (!a(this, u)) {
        console.error("Metrics service not initialized");
        return;
      }
      const e = t.target;
      e.state = "waiting";
      try {
        this._autoRefresh && a(this, u).isConnected ? (await a(this, u).requestMetrics(), y(this, v, D).call(this)) : await Promise.all([
          a(this, A).call(this),
          y(this, v, D).call(this)
        ]), e.state = "success";
      } catch (i) {
        console.error("Error refreshing metrics:", i), e.state = "failed";
      }
    }), p(this, A, async () => {
      if (!a(this, u)) {
        console.error("Metrics service not initialized");
        return;
      }
      try {
        this._performanceMetrics = await a(this, u).getPerformanceMetrics();
      } catch (t) {
        console.error("Error loading performance metrics:", t), a(this, m) && a(this, m).peek("danger", {
          data: {
            headline: "Error",
            message: t instanceof Error ? t.message : "Failed to load performance metrics"
          }
        });
      }
    }), p(this, L, async () => {
      (await this.getContext(j))?.open(
        this,
        ot
      );
    }), p(this, H, async () => {
      (await this.getContext(j))?.open(
        this,
        st
      );
    }), p(this, N, async () => {
      this._autoRefresh = !this._autoRefresh, this._autoRefresh ? await a(this, F).call(this) : await a(this, O).call(this);
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
        }), C(this, g, a(this, u).onMetricsUpdate((t) => {
          this._performanceMetrics = t, this._isConnected = !0;
        })), await a(this, u).connectToHub(), this._isConnected = a(this, u).isConnected, this._isConnected && a(this, m) && a(this, m).peek("positive", {
          data: {
            headline: "Connected",
            message: "Real-time metrics updates enabled"
          }
        });
      } catch (t) {
        console.error("Error starting auto-refresh:", t), this._autoRefresh = !1, this._isConnected = !1, a(this, m) && a(this, m).peek("danger", {
          data: {
            headline: "Connection Failed",
            message: t instanceof Error ? t.message : "Failed to connect to metrics hub. Try again."
          }
        }), a(this, g) && (a(this, g).call(this), C(this, g, void 0));
      }
    }), p(this, O, async () => {
      if (a(this, u))
        try {
          a(this, g) && (a(this, g).call(this), C(this, g, void 0)), await a(this, u).disconnectFromHub(), this._isConnected = !1, a(this, m) && a(this, m).peek("default", {
            data: {
              headline: "Disconnected",
              message: "Real-time updates disabled"
            }
          });
        } catch (t) {
          console.error("Error stopping auto-refresh:", t);
        }
    }), p(this, $, (t) => {
      this._activeTab = t;
    }), this.consumeContext(et, (t) => {
      C(this, m, t);
    }), this.consumeContext(it, (t) => {
      this.observe(
        t?.currentUser,
        (e) => {
          this._contextCurrentUser = e;
        },
        "_contextCurrentUser"
      );
    }), this.consumeContext(rt, (t) => {
      C(this, P, t), C(this, u, new at(async () => {
        const e = await a(this, P)?.getLatestToken();
        if (!e)
          throw new Error("No authentication token available");
        return e;
      }));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), a(this, O).call(this);
  }
  render() {
    return l`
      <uui-box headline="Application Performance Metrics" class="wide">
        <div slot="header">[.NET 10 Application - Real-time Metrics${this._contextCurrentUser?.name ? ` - ${this._contextCurrentUser.name}` : ""}]</div>

        <div class="metrics-controls">
          <uui-button color="default" look="primary" @click="${a(this, z)}">
            <uui-icon name="icon-refresh"></uui-icon> Refresh Metrics
          </uui-button>

          <uui-toggle
            label="Real-time Updates (SignalR)"
            .checked="${this._autoRefresh}"
            @change="${a(this, N)}"
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
            @click="${() => a(this, $).call(this, "overview")}"
          >
            <uui-icon name="icon-chart"></uui-icon> Overview
          </uui-button>
          <uui-button 
            look="${this._activeTab === "heap" ? "primary" : "default"}"
            color="${this._activeTab === "heap" ? "positive" : "default"}"
            @click="${() => a(this, $).call(this, "heap")}"
          >
            <uui-icon name="icon-box"></uui-icon> Heap & GC
          </uui-button>
          <uui-button 
            look="${this._activeTab === "umbraco" ? "primary" : "default"}"
            color="${this._activeTab === "umbraco" ? "positive" : "default"}"
            @click="${() => a(this, $).call(this, "umbraco")}"
          >
            <uui-icon name="icon-umbraco"></uui-icon> Umbraco
          </uui-button>
          <uui-button 
            look="${this._activeTab === "utils" ? "primary" : "default"}"
            color="${this._activeTab === "utils" ? "positive" : "default"}"
            @click="${() => a(this, $).call(this, "utils")}"
          >
            <uui-icon name="icon-settings"></uui-icon> Utils
          </uui-button>
        </div>

        <div class="tab-content">
          ${y(this, v, tt).call(this)}
        </div>
      </uui-box>
          `;
  }
};
m = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
A = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakSet();
D = async function() {
  if (!a(this, u)) {
    console.error("Metrics service not initialized");
    return;
  }
  try {
    this._umbracoMetrics = await a(this, u).getUmbracoMetrics();
  } catch (t) {
    console.error("Error loading Umbraco metrics:", t), a(this, m) && a(this, m).peek("danger", {
      data: {
        headline: "Error",
        message: t instanceof Error ? t.message : "Failed to load Umbraco metrics"
      }
    });
  }
};
L = /* @__PURE__ */ new WeakMap();
H = /* @__PURE__ */ new WeakMap();
N = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakMap();
O = /* @__PURE__ */ new WeakMap();
$ = /* @__PURE__ */ new WeakMap();
G = function() {
  if (!this._performanceMetrics)
    return l`<p>Click "Refresh Metrics" to load application performance data</p>`;
  const t = this._performanceMetrics;
  return l`
      <umbmetrics-app-info-banner
        .applicationInfo=${t.applicationInfo}
        .isConnected=${this._isConnected}
      ></umbmetrics-app-info-banner>

      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-metric-card
          icon="icon-dashboard"
          title="CPU Usage"
          value="${t.cpuUsage.toFixed(1)}%"
          detail="Process CPU"
          color="${V(t.cpuUsage, 80)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-memory"
          title="Working Set"
          value="${t.memoryUsage.workingSetMB.toFixed(0)} MB"
          detail="Private: ${t.memoryUsage.privateMemoryMB.toFixed(0)} MB"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-activity"
          title="Requests/Sec"
          value="${t.requestMetrics.requestsPerSecond.toFixed(2)}"
          detail="Last min: ${t.requestMetrics.lastMinuteRequests}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-timer"
          title="Avg Response"
          value="${t.requestMetrics.averageResponseTimeMs.toFixed(0)} ms"
          detail="Last 100 requests"
          color="${V(t.requestMetrics.averageResponseTimeMs, 1e3)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-link"
          title="Active Requests"
          value="${t.requestMetrics.activeRequests}"
          detail="Total: ${c(t.requestMetrics.totalRequests)}"
          ?clickable=${!0}
          actionLabel="View Details"
          @card-action="${a(this, L)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-alert"
          title="Failed Requests"
          value="${c(t.requestMetrics.failedRequests)}"
          detail="4xx/5xx responses"
          color="${t.requestMetrics.failedRequests > 0 ? "danger" : "positive"}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-nodes"
          title="Threads"
          value="${t.threadInfo.threadCount}"
          detail="Pool: ${t.threadInfo.threadPoolThreadCount}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-list"
          title="Work Items"
          value="${t.threadInfo.pendingWorkItemCount}"
          detail="Completed: ${c(t.threadInfo.completedWorkItemCount)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          span="4"
          icon="icon-calendar"
          title="Last Updated"
          value="${new Date(t.timestamp).toLocaleString()}"
        ></umbmetrics-metric-card>
      </umbmetrics-metrics-grid>
    `;
};
K = function() {
  if (!this._performanceMetrics)
    return l`<p>Click "Refresh Metrics" to load heap information</p>`;
  const t = this._performanceMetrics, e = [
    { label: "Gen 0", value: `${t.memoryUsage.gcGen0HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 1", value: `${t.memoryUsage.gcGen1HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 2", value: `${t.memoryUsage.gcGen2HeapSizeMB.toFixed(2)} MB` }
  ], i = [
    { label: "Gen 0", value: c(t.garbageCollectionStats.gen0Collections) },
    { label: "Gen 1", value: c(t.garbageCollectionStats.gen1Collections) },
    { label: "Gen 2", value: c(t.garbageCollectionStats.gen2Collections) }
  ], o = [
    { label: "GC Mode", value: t.garbageCollectionStats.isServerGC ? "Server" : "Workstation" },
    { label: "Total Heap Size", value: `${t.memoryUsage.totalHeapSizeMB.toFixed(2)} MB` },
    { label: "Fragmented Memory", value: `${t.memoryUsage.fragmentedMemoryMB.toFixed(2)} MB` },
    { label: "Memory Load", value: `${t.garbageCollectionStats.memoryLoadMB.toFixed(2)} MB` },
    { label: "High Memory Threshold", value: `${t.garbageCollectionStats.highMemoryLoadThresholdMB.toFixed(2)} MB` },
    { label: "Latency Mode", value: t.garbageCollectionStats.gcLatencyMode },
    { label: "Total Pause Time", value: `${t.garbageCollectionStats.totalPauseTimeMs.toFixed(2)} ms` }
  ];
  return l`
      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-stat-card
          span="2"
          icon="icon-box"
          title="GC Heap Sizes"
          .stats=${e}
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
  const t = this._umbracoMetrics, e = [
    { label: "Total Nodes", value: c(t.contentStatistics.totalContentNodes) },
    { label: "Published", value: c(t.contentStatistics.publishedNodes), color: "positive" },
    { label: "Unpublished", value: c(t.contentStatistics.unpublishedNodes), color: "warning" },
    { label: "Trashed", value: c(t.contentStatistics.trashedNodes), color: t.contentStatistics.trashedNodes > 0 ? "danger" : "positive" },
    { label: "Content Types", value: t.contentStatistics.contentTypeCount }
  ], i = [
    { label: "Total Items", value: c(t.mediaStatistics.totalMediaItems) },
    { label: "Total Size", value: `${t.mediaStatistics.totalMediaSizeMB.toFixed(2)} MB` },
    { label: "Images", value: c(t.mediaStatistics.imagesCount) },
    { label: "Documents", value: c(t.mediaStatistics.documentsCount) },
    { label: "Media Types", value: t.mediaStatistics.mediaTypeCount }
  ], o = [
    { label: "Runtime Cache", value: `${c(t.cacheStatistics.runtimeCacheCount)} items` },
    { label: "NuCache", value: `${c(t.cacheStatistics.nuCacheCount)} items` },
    { label: "Total Size", value: t.cacheStatistics.totalCacheSize }
  ], r = [
    { label: "Total Users", value: c(t.backofficeUsers.totalUsers) },
    { label: "Active Users", value: c(t.backofficeUsers.activeUsers), color: "positive" },
    { label: "Administrators", value: c(t.backofficeUsers.adminUsers) },
    { label: "Current Sessions", value: c(t.backofficeUsers.currentSessions), color: t.backofficeUsers.currentSessions > 0 ? "positive" : "default" }
  ];
  return l`
      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-stat-card
          span="2"
          icon="icon-document"
          title="Content Statistics"
          .stats=${e}
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
                @click="${a(this, H)}"
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
tt = function() {
  switch (this._activeTab) {
    case "overview":
      return y(this, v, G).call(this);
    case "heap":
      return y(this, v, K).call(this);
    case "umbraco":
      return y(this, v, Y).call(this);
    case "utils":
      return y(this, v, Z).call(this);
    default:
      return y(this, v, G).call(this);
  }
};
b.styles = T`${k($t)}`;
M([
  x()
], b.prototype, "_contextCurrentUser", 2);
M([
  x()
], b.prototype, "_performanceMetrics", 2);
M([
  x()
], b.prototype, "_autoRefresh", 2);
M([
  x()
], b.prototype, "_activeTab", 2);
M([
  x()
], b.prototype, "_isConnected", 2);
M([
  x()
], b.prototype, "_umbracoMetrics", 2);
b = M([
  U("umbmetrics-dashboard")
], b);
const Bt = b;
export {
  b as UmbMetrcisDashboardElement,
  Bt as default
};
//# sourceMappingURL=dashboard.element-7UWrucyu.js.map
