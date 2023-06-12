import { Account } from '../Account';

export interface YnabAccount {
  id: string; // Required, string with $uuid format
  name: string; // Required
  type: AccountType;
  on_budget: boolean; // Required
  closed: boolean; // Required
  note?: string | undefined; // Optional
  balance: number; // Required, integer with $int64 format
  cleared_balance: number; // Required, integer with $int64 format
  uncleared_balance: number; // Required, integer with $int64 format
  transfer_payee_id: string; // Required, string with $uuid format
  direct_import_linked: boolean; // Required
  direct_import_in_error: boolean; // Required
  last_reconciled_at?: string; // Optional, string with $date-time format
  debt_original_balance?: number; // Optional, integer with $int64 format
  debt_interest_rates?: LoanAccountPeriodicValue; // Optional, object with string keys and integer values
  debt_minimum_payments?: LoanAccountPeriodicValue; // Optional, object with string keys and integer values
  debt_escrow_amounts?: LoanAccountPeriodicValue; // Optional, object with string keys and integer values
  deleted: boolean; // Required
}

export enum AccountType {
  'checking',
  'savings',
  'cash',
  'creditCard',
  'lineOfCredit',
  'otherAsset',
  'otherLiability',
  'mortgage',
  'autoLoan',
  'studentLoan',
  'personalLoan',
  'medicalDebt',
  'otherDebt',
}

interface LoanAccountPeriodicValue {
  [key: string]: number; // Keys can be any string, values are integers with $int64 format
}

export interface YnabAccountResponse {
  data: {
    accounts: YnabAccount[];
    server_knowledge: number;
  };
}
