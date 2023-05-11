import {
  YnabCategoriesResponse,
  YnabCategoryGroup,
  YnabCategory,
} from 'api/interfaces/ynabCategory';
import axios from 'axios';

import { API_BASE, BUDGET_ID, DEFAULT_HEADERS } from '../consts/apiConsts';
import {
  YnabTransactionsResponse,
  YnabTransaction,
  YnabSubtransaction,
} from '../interfaces/ynabTransaction';
import { processTransactions } from '../utils/transactionHelpers';

/**
 *
 * @returns
 */
export const getTransactionsService = async () => {
  // this api call gets all transactions that are then posted to the transactionsSlice state
  const transactionsResponse: YnabTransactionsResponse = await axios.get(
    `${API_BASE}/budgets/${BUDGET_ID}/transactions`,
    {
      headers: DEFAULT_HEADERS,
    },
  );

  // to render the transactions as we want we need categories to determine category groups
  const categoriesResponse: YnabCategoriesResponse = await axios.get(
    `${API_BASE}/budgets/${BUDGET_ID}/categories`,
    {
      headers: DEFAULT_HEADERS,
    },
  );

  // 'Get the inner data from the responses'
  let transactions: YnabTransaction[] = transactionsResponse.data.data.transactions;
  const categories: YnabCategoryGroup[] = categoriesResponse.data.data.category_groups;

  // flatten the transactions
  transactions = processTransactions(transactions, categories);

  return transactions;
};
