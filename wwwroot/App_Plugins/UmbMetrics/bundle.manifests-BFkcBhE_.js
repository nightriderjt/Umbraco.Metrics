import { UmbModalToken as e } from "@umbraco-cms/backoffice/modal";
const a = [
  {
    name: "Umb Metrics Entrypoint",
    alias: "UmbMetrics.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-BdY19EoO.js")
  }
], s = [
  {
    name: "Umb Metrics Dashboard",
    alias: "UmbMetrics.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-VVhuZ0i7.js"),
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
], i = new e(
  "UmbMetrics.Modal.ActiveRequestsSidebar",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
), m = [
  {
    type: "modal",
    alias: "UmbMetrics.Modal.ActiveRequestsSidebar",
    name: "Active Requests Sidebar Modal",
    js: () => import("./active-requests-sidebar.element-CYvpeEM1.js").then((t) => t.a),
    meta: {
      modal: i
    }
  }
], n = [
  ...a,
  ...s,
  ...m
];
export {
  i as A,
  n as m
};
//# sourceMappingURL=bundle.manifests-BFkcBhE_.js.map
