import { UmbMetrics_Dashboard_Alias, UmbMetrics_Dashboard_Path, UmbMetrics_Section } from "../types/constants.js";

export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umb Metrics Dashboard",
    alias: UmbMetrics_Dashboard_Alias,
    type: "dashboard",
    js: () => import("./dashboard.element.js"),
    meta: {
      label: "Umbraco Metrics",
      pathname: UmbMetrics_Dashboard_Path,
    },
    conditions: [
      {
        alias:"Umb.Condition.SectionAlias",
        match: UmbMetrics_Section,
      },
    ],
  },
];
