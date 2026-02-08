export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umb Metrics Dashboard",
    alias: "UmbMetrics.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element.js"),
    meta: {
      label: "Umbraco Metrics",
      pathname: "umb-metrics",
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Settings",
      },
    ],
  },
];
