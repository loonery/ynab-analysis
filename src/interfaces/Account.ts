import { ACCOUNT_SUPER_TYPES, FORMATTED_YNAB_API_ACCOUNT_TYPES } from 'consts/consts';

import { YnabApiAccountType } from './externalDataInterfaces/ynabAccount';
export interface Account {
  id: string; // Required, string with $uuid format
  name: string; // Required
  type: YnabApiAccountType;
  typeLabel: FormattedAccountType;
  on_budget: boolean; // Required
  closed: boolean; // Required
  note?: string | undefined; // Optional
  balance: string; // Required, integer with $int64 format
  cleared_balance: number; // Required, integer with $int64 format
  uncleared_balance: number; // Required, integer with $int64 format
  transfer_payee_id: string; // Required, string with $uuid format
  direct_import_linked: boolean; // Required
  direct_import_in_error: boolean; // Required
  last_reconciled_at?: string | undefined; // Optional, string with $date-time format
  debt_original_balance?: number | undefined; // Optional, integer with $int64 format
  debt_interest_rates?: LoanAccountPeriodicValue | undefined; // Optional, object with string keys and integer values
  debt_minimum_payments?: LoanAccountPeriodicValue | undefined; // Optional, object with string keys and integer values
  debt_escrow_amounts?: LoanAccountPeriodicValue | undefined; // Optional, object with string keys and integer values
  deleted: boolean; // Required
}

export type AccountSuperType = (typeof ACCOUNT_SUPER_TYPES)[number];

export type FormattedAccountType = (typeof FORMATTED_YNAB_API_ACCOUNT_TYPES)[number];
interface LoanAccountPeriodicValue {
  [key: string]: number; // Keys can be any string, values are integers with $int64 format
}
