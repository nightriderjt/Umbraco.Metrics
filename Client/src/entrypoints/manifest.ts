export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umb Metrics Entrypoint",
    alias: "UmbMetrics.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
