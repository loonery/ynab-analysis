import axios from 'axios';

import { API_BASE, BUDGET_ID, DEFAULT_HEADERS } from '../consts/apiConsts';
import { processTransactions } from '../utils/transactionHelpers';

export const getTransactionsService = async () => {
  const transactionsResponse = await axios.get(
    `${API_BASE}/budgets/${BUDGET_ID}/transactions`,
    {
      headers: DEFAULT_HEADERS,
    },
  );
  // to render the transactions as we want we need categories to determine category groups
  const categoriesResponse = await axios.get(
    `${API_BASE}/budgets/${BUDGET_ID}/categories`,
    {
      headers: DEFAULT_HEADERS,
    },
  );

  // 'peel the fruit'
  let transactions = transactionsResponse.data.data.transactions;
  let categories = categoriesResponse.data.data.category_groups;

  // flatten the transactions
  transactions = processTransactions(transactions, categories);

  return transactions;
};
