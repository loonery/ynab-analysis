import { convertAmount } from './generalHelpers';

export const processAccounts = (accounts) => {
  accounts = accounts.map((account) => {
    const balance = convertAmount(account.balance);
    const cleared_balance = convertAmount(account.cleared_balance);
    const newAccount = { ...account, balance, cleared_balance };
    return newAccount;
  });
  return accounts;
};
