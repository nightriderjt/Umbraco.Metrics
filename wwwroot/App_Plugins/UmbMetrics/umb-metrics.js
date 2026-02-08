const manifests$2 = [
  {
    name: "Umb Metrics Entrypoint",
    alias: "UmbMetrics.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-Oq5q_Wuc.js")
  }
];
const manifests$1 = [
  {
    name: "Umb Metrics Dashboard",
    alias: "UmbMetrics.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element--1xPDrN_.js"),
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
];
const manifests = [
  ...manifests$2,
  ...manifests$1
];
export {
  manifests
};
//# sourceMappingURL=umb-metrics.js.map
