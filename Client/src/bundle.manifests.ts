import { manifests as entrypoints } from "./entrypoints/manifest.js";
import { manifests as dashboardManifests } from "./dashboards/manifest.js";
import { manifests as components } from "./components/manifest.js";
import { umbmetricsicons as iconManifest } from "./icons/icons.manifest.js";
import "./package-view/package-view.element.js";
// Job of the bundle is to collate all the manifests from different parts of the extension and load other manifests
// We load this bundle from umbraco-package.json
export const manifests: Array<UmbExtensionManifest> = [
  ...entrypoints,
  ...dashboardManifests,
  ...components,
    iconManifest,
];
