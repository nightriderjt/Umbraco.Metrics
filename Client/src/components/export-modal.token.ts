import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export const UMB_METRICS_EXPORT_MODAL = new UmbModalToken(
  "UmbMetrics.Modal.ExportMetrics",
  {
    modal: {
      type: "sidebar",
      size: "medium",
    },
  }
);
