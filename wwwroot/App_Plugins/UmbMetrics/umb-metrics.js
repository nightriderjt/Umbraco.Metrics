const t = [
  {
    name: "Umb Metrics Entrypoint",
    alias: "UmbMetrics.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-BdY19EoO.js")
  }
], i = [
  {
    name: "Umb Metrics Dashboard",
    alias: "UmbMetrics.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-gW-TodY4.js"),
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
], s = [
  ...t,
  ...i
];
export {
  s as manifests
};
//# sourceMappingURL=umb-metrics.js.map
