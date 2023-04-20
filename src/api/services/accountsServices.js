import axios from 'axios';

import { API_BASE, BUDGET_ID, DEFAULT_HEADERS } from '../consts/apiConsts';
import { processAccounts } from '../utils/accountHelpers';

export const getAccountsService = async () => {
  const accountsResponse = await axios.get(`${API_BASE}/budgets/${BUDGET_ID}/accounts`, {
    headers: DEFAULT_HEADERS,
  });
  let accounts = accountsResponse.data.data.accounts;
  accounts = processAccounts(accounts);
  return accounts;
};
