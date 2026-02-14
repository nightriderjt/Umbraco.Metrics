import { UmbModalToken as n } from "@umbraco-cms/backoffice/modal";
import { LitElement as c, html as l, css as u, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
const d = [
  {
    name: "Umb Metrics Entrypoint",
    alias: "UmbMetrics.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-BdY19EoO.js")
  }
], M = [
  {
    name: "Umb Metrics Dashboard",
    alias: "UmbMetrics.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-BhLyD9CR.js"),
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
], h = new n(
  "UmbMetrics.Modal.ActiveRequestsSidebar",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), U = new n(
  "UmbMetrics.Modal.ExportMetrics",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), g = [
  {
    type: "modal",
    alias: "UmbMetrics.Modal.ActiveRequestsSidebar",
    name: "Active Requests Sidebar Modal",
    js: () => import("./active-requests-sidebar.element-CuDfZ5L2.js").then((e) => e.a),
    meta: {
      modal: h
    }
  },
  {
    type: "modal",
    alias: "UmbMetrics.Modal.ExportMetrics",
    name: "Export Metrics Modal",
    js: () => import("./export-modal.element-BdGmOXPf.js"),
    meta: {
      modal: U
    }
  }
], v = {
  type: "icons",
  alias: "UmbMetrics.Icons",
  name: "UmbMetrics Icons",
  js: () => import("./icons-DaMqJOw9.js")
}, y = [
  {
    type: "localization",
    alias: "UmbMetrics.Localization.el-GR",
    name: "Greek (Greece)",
    meta: {
      culture: "el-GR"
    },
    js: () => import("./el-An6eITLL.js")
  },
  {
    type: "localization",
    alias: "UmbMetrics.Localization.en-US",
    name: "English (United States)",
    meta: {
      culture: "en-US"
    },
    js: () => import("./en-Bzb-k-Mr.js")
  }
];
var f = Object.getOwnPropertyDescriptor, E = (e, s, m, o) => {
  for (var i = o > 1 ? void 0 : o ? f(s, m) : s, t = e.length - 1, r; t >= 0; t--)
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
a.styles = u`
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
a = E([
  p("umbmetrics-package-view")
], a);
const S = [
  ...d,
  ...M,
  ...g,
  v,
  ...y
];
export {
  h as A,
  U,
  S as m
};
//# sourceMappingURL=bundle.manifests-B6YLofMu.js.map
