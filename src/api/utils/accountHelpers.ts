import { Account } from 'api/interfaces/Account';
import { FormattedAccountType } from 'api/interfaces/Account';
import {
  YnabAccount,
  AccountType,
} from 'api/interfaces/externalDataInterfaces/ynabAccount';

import { convertAmount } from './generalHelpers';

const getNewAccountType = (type: AccountType): FormattedAccountType => {
  let newType;

  switch (type) {
    case AccountType['checking']:
      newType = FormattedAccountType['Checking'];
      break;
    case AccountType['savings']:
      newType = FormattedAccountType['Savings'];
      break;
    case AccountType['cash']:
      newType = FormattedAccountType['Cash'];
      break;
    case AccountType['creditCard']:
      newType = FormattedAccountType['Credit Card'];
      break;
    case AccountType['lineOfCredit']:
      newType = FormattedAccountType['Line of Credit'];
      break;
    case AccountType['otherAsset']:
      newType = FormattedAccountType['Other Asset'];
      break;
    case AccountType['otherLiability']:
      newType = FormattedAccountType['Other Liability'];
      break;
    case AccountType['mortgage']:
      newType = FormattedAccountType['Mortgage'];
      break;
    case AccountType['autoLoan']:
      newType = FormattedAccountType['Auto Loan'];
      break;
    case AccountType['studentLoan']:
      newType = FormattedAccountType['Student Loan'];
      break;
    case AccountType['personalLoan']:
      newType = FormattedAccountType['Personal Loan'];
      break;
    case AccountType['medicalDebt']:
      newType = FormattedAccountType['Medical Debt'];
      break;
    case AccountType['otherDebt']:
      newType = FormattedAccountType['Other Debt'];
      break;
  }
  return newType;
};

const convertYnabAccountToAccount = (ynabAccount: YnabAccount): Account => {
  return {
    id: ynabAccount.id, // Required, string with $uuid format
    name: ynabAccount.name, // Required
    type: getNewAccountType(ynabAccount.type),
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
