import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface SqlStacktraceModalData {
  operationKey: string;
  operationValue?: string;
}

export const SQL_STACKTRACE_MODAL = new UmbModalToken<SqlStacktraceModalData>(
  'UmbMetrics.Modal.SqlStackTrace',
  {
    modal: {
      type: 'sidebar',
      size: 'large',
    },
  }
);
