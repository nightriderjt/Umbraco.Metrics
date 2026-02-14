import { UmbModalToken as m } from "@umbraco-cms/backoffice/modal";
import { LitElement as c, html as l, css as p, customElement as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
const d = [
  {
    name: "Umb Metrics Entrypoint",
    alias: "UmbMetrics.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-BdY19EoO.js")
  }
], h = [
  {
    name: "Umb Metrics Dashboard",
    alias: "UmbMetrics.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-vqzXiDgz.js"),
    meta: {
      label: "Umbraco Metrics",
      pathname: "umb-metrics"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Settings"
      }
    ]
  }
], M = new m(
  "UmbMetrics.Modal.ActiveRequestsSidebar",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), g = new m(
  "UmbMetrics.Modal.ExportMetrics",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
), v = [
  {
    type: "modal",
    alias: "UmbMetrics.Modal.ActiveRequestsSidebar",
    name: "Active Requests Sidebar Modal",
    js: () => import("./active-requests-sidebar.element-DxrkQQUB.js").then((e) => e.a),
    meta: {
      modal: M
    }
  },
  {
    type: "modal",
    alias: "UmbMetrics.Modal.ExportMetrics",
    name: "Export Metrics Modal",
    js: () => import("./export-modal.element-DtLSTZXh.js"),
    meta: {
      modal: g
    }
  }
], U = {
  type: "icons",
  alias: "UmbMetrics.Icons",
  name: "UmbMetrics Icons",
  js: () => import("./icons-DaMqJOw9.js")
};
var y = Object.getOwnPropertyDescriptor, f = (e, s, n, o) => {
  for (var i = o > 1 ? void 0 : o ? y(s, n) : s, t = e.length - 1, r; t >= 0; t--)
    (r = e[t]) && (i = r(i) || i);
  return i;
};
let a = class extends b(c) {
  render() {
    return l`
      <div class="package-header">
        <umb-icon name="umbmetrics-logo" class="package-logo"></umb-icon>
        <div>
          <h1>UmbMetrics</h1>
          <span class="version">v17.1.0.6</span>
        </div>
      </div>

      <p class="description">
        Real-time performance monitoring dashboard for Umbraco. 
        Monitor CPU usage, memory consumption, active requests, response times, 
        and more directly from your Umbraco backoffice.
      </p>

      <div class="actions">
        <uui-button
          look="primary"
          label="Open Dashboard"
          href="/umbraco/section/settings/dashboard/umb-metrics">
          Open Dashboard
        </uui-button>
        <uui-button
          look="secondary"
          label="View on GitHub"
          href="https://github.com/nightriderjt/Umbraco.Metrics"
          target="_blank">
          <uui-icon name="icon-link"></uui-icon>
          GitHub
        </uui-button>
      </div>
    `;
  }
};
a.styles = p`
    :host {
      display: block;
      padding: var(--uui-size-layout-1);
    }

    .package-header {
      display: flex;
      align-items: center;
      gap: var(--uui-size-space-5);
      margin-bottom: var(--uui-size-space-6);
    }

    .package-logo {
      width: 64px;
      height: 64px;
    }

    h1 {
      margin: 0;
      font-size: var(--uui-type-h2-size);
    }

    .version {
      color: var(--uui-color-text-alt);
      font-size: var(--uui-type-small-size);
    }

    .description {
      color: var(--uui-color-text);
      line-height: 1.6;
      max-width: 600px;
      margin-bottom: var(--uui-size-space-6);
    }

    .actions {
      display: flex;
      gap: var(--uui-size-space-4);
    }
  `;
a = f([
  u("umbmetrics-package-view")
], a);
const z = [
  ...d,
  ...h,
  ...v,
  U
];
export {
  M as A,
  g as U,
  z as m
};
//# sourceMappingURL=bundle.manifests-PzZDyP-T.js.map
