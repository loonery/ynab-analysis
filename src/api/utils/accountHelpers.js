import { convertAmount } from './generalHelpers';

const aliasAccountType = (type) => {
  let newType;

  switch (type) {
    case 'creditCard':
      newType = 'Credit Card';
      break;
    case 'cash':
      newType = 'Cash';
      break;
    case 'otherAsset':
      newType = 'Other Asset';
      break;
    case 'checking':
      newType = 'Checking';
      break;
    default:
      newType = type;
      break;
  }

  return newType;
};

export const processAccounts = (accounts) => {
  accounts = accounts.map((account) => {
    const balance = convertAmount(account.balance);
    const cleared_balance = convertAmount(account.cleared_balance);
    const type = aliasAccountType(account.type);
    const newAccount = { ...account, balance, cleared_balance, type };
    return newAccount;
  });
  return accounts;
};
