import { UmbModalToken } from "@umbraco-cms/backoffice/modal";


export const UMB_METRICS_CLEANUP_DIALOG = new UmbModalToken(
  "UmbMetrics.Dialog.CleanupMetrics",
  {
    modal: {
      type: "dialog",
      size: "medium",
    },
  }
);
