import { ACTIVE_REQUESTS_SIDEBAR_MODAL } from './active-requests-sidebar.modal.js';
import { UMB_METRICS_CLEANUP_DIALOG } from './cleanup-dialog.token.js';
import { UMB_METRICS_EXPORT_MODAL } from './export-modal.token.js';

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'modal',
    alias: 'UmbMetrics.Modal.ActiveRequestsSidebar',
    name: 'Active Requests Sidebar Modal',
    js: () => import('./active-requests-sidebar.element.js'),
    meta: {
      modal: ACTIVE_REQUESTS_SIDEBAR_MODAL,
    },
  },
  {
    type: 'modal',
    alias: 'UmbMetrics.Modal.ExportMetrics',
    name: 'Export Metrics Modal',
    js: () => import('./export-modal.element.js'),
    meta: {
      modal: UMB_METRICS_EXPORT_MODAL,
    },
  },
  {
    type: 'modal',
    alias: 'UmbMetrics.Modal.CleanUp',
    name: 'CleanUp Dialog',
    js: () => import('./cleanup-dialog.element.js'),
    meta: {
      modal: UMB_METRICS_CLEANUP_DIALOG,
    },
  },
];
