import { UmbMetrics_Section, UmbMetrics_Section_Entrypoint, UmbMetrics_Section_Path } from "../types/constants.js";

export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umb Metrics Entrypoint",
    alias: UmbMetrics_Section_Entrypoint,
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },  {
    name: "Umbraco Metrics Section",
    alias: UmbMetrics_Section,
    type: "section",
    "meta": {
        "label": "UmbMetrics",
        "pathname": UmbMetrics_Section_Path
    }
}
];
