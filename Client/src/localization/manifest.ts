

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "localization",
    alias: "UmbMetrics.Localization.el-GR",
    name: "Greek (Greece)",
    meta: {
      culture: "el-GR",
    },
    js: () => import("./el.ts"),
  },{
    type: "localization",
    alias: "UmbMetrics.Localization.en-US",
    name: "English (United States)",
    meta: {
      culture: "en-US",
    },
    js: () => import("./en.ts"),
  } 
];