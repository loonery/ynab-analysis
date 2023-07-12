import { YNAB_ACCOUNT_TYPES_TO_FORMMATTED_TYPE_MAP } from 'consts/consts';
import { Account } from 'interfaces/Account';
import { FormattedAccountType } from 'interfaces/Account';
import {
  YnabAccount,
  YnabApiAccountType,
} from 'interfaces/externalDataInterfaces/ynabAccount';

import { convertAmount } from './generalUtils';

const getNewAccountType = (type: YnabApiAccountType): FormattedAccountType => {
  if (YNAB_ACCOUNT_TYPES_TO_FORMMATTED_TYPE_MAP[type]) {
    return YNAB_ACCOUNT_TYPES_TO_FORMMATTED_TYPE_MAP[type];
  }
  throw new Error('account type could not be mapped');
};

const convertYnabAccountToAccount = (ynabAccount: YnabAccount): Account => {
  return {
    id: ynabAccount.id, // Required, string with $uuid format
    name: ynabAccount.name, // Required
    type: ynabAccount.type,
    typeLabel: getNewAccountType(ynabAccount.type),
    on_budget: ynabAccount.on_budget, // Required
    closed: ynabAccount.closed, // Required
    note: ynabAccount.note, // Optional
    balance: convertAmount(ynabAccount.balance), // Required, integer with $int64 format
    cleared_balance: ynabAccount.cleared_balance, // Required, integer with $int64 format
    uncleared_balance: ynabAccount.uncleared_balance, // Required, integer with $int64 format
    transfer_payee_id: ynabAccount.transfer_payee_id, // Required, string with $uuid format
    direct_import_linked: ynabAccount.direct_import_linked, // Required
    direct_import_in_error: ynabAccount.direct_import_in_error, // Required
    last_reconciled_at: ynabAccount.last_reconciled_at, // Optional, string with $date-time format
    debt_original_balance: ynabAccount.debt_original_balance, // Optional, integer with $int64 format
    debt_interest_rates: ynabAccount.debt_interest_rates, // Optional, object with string keys and integer values
    debt_minimum_payments: ynabAccount.debt_minimum_payments, // Optional, object with string keys and integer values
    debt_escrow_amounts: ynabAccount.debt_escrow_amounts, // Optional, object with string keys and integer values
    deleted: ynabAccount.deleted, // Required
  };
};

export const processAccounts = (accounts: YnabAccount[]): Account[] => {
  return accounts.map((account: YnabAccount) => {
    return convertYnabAccountToAccount(account);
  });
};
