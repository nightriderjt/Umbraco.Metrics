import { UmbModalToken } from "@umbraco-cms/backoffice/modal";


export const UMB_METRICS_CLEANUP_DIALOG = new UmbModalToken(
  "UmbMetrics.Modal.CleanUp",
  {
    modal: {
      type: "sidebar",
      size: "small",
    },
  }
);
