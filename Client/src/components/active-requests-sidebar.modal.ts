import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export const ACTIVE_REQUESTS_SIDEBAR_MODAL = new UmbModalToken(
  'UmbMetrics.Modal.ActiveRequestsSidebar',
  {
    modal: {
      type: 'sidebar',
      size: 'medium',
    },
  }
);