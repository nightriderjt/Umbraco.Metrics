import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export const UMB_METRICS_EXPORT_MODAL = new UmbModalToken(
  "UmbMetrics.Modal.Export",
  {
    modal: {
      type: "dialog",
      size: "medium",
    },
  }
);