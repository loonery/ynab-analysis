import axios from 'axios';

import { API_BASE, BUDGET_ID, DEFAULT_HEADERS } from '../consts/apiConsts';
export const getAccountsService = async () => {
  const accountsResponse = await axios.get(`${API_BASE}/budgets/${BUDGET_ID}/accounts`, {
    headers: DEFAULT_HEADERS,
  });
  console.log(accountsResponse);
  return accountsResponse;
};
