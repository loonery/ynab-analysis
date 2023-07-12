import { FormattedAccountType } from 'interfaces/Account';
import { YnabApiAccountType } from 'interfaces/externalDataInterfaces/ynabAccount';

export const FORMATTED_YNAB_API_ACCOUNT_TYPES = [
  'Checking',
  'Savings',
  'Cash',
  'Credit Card',
  'Line of Credit',
  'Other Asset',
  'Other Liability',
  'Mortgage',
  'Auto Loan',
  'Student Loan',
  'Personal Loan',
  'Medical Debt',
  'Other Debt',
] as const;

export const BUDGET_ACCOUNTS_STRING = 'Budget Accounts';
export const TRACKING_ACCOUNTS_STRING = 'Tracking Accounts';
export const ACCOUNT_SUPER_TYPES = [
  BUDGET_ACCOUNTS_STRING,
  TRACKING_ACCOUNTS_STRING,
] as const;

export const YNAB_API_ACCOUNT_TYPES = [
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
] as const;

type AccountMapType = {
  [K in YnabApiAccountType]: FormattedAccountType;
};

export const YNAB_ACCOUNT_TYPES_TO_FORMMATTED_TYPE_MAP: AccountMapType = {
  checking: 'Checking',
  savings: 'Savings',
  cash: 'Cash',
  creditCard: 'Credit Card',
  lineOfCredit: 'Line of Credit',
  otherAsset: 'Other Asset',
  otherLiability: 'Other Liability',
  mortgage: 'Mortgage',
  autoLoan: 'Auto Loan',
  studentLoan: 'Student Loan',
  personalLoan: 'Personal Loan',
  medicalDebt: 'Medical Debt',
  otherDebt: 'Other Debt',
};
