import axios from "axios";
import { API_BASE, BUDGET_ID, defaultHeaders } from "../apiUtils";
import { getFlattenedTransactions } from "./transactionHelper";

export const getTransactionsService = async () => {
    
  const transactionsResponse = await axios.get(`${API_BASE}/budgets/${BUDGET_ID}/transactions`, {
    headers: defaultHeaders
  });
    // to render the transactions as we want we need categories to determine category groups
  const categoriesResponse = await axios.get(`${API_BASE}/budgets/${BUDGET_ID}/categories`, {
    headers: defaultHeaders
  });
    
  // 'peel the fruit' 
  let transactions = transactionsResponse.data.data.transactions;
  let categories = categoriesResponse.data.data.category_groups;

  // flatten the transactions
  transactions = getFlattenedTransactions(transactions, categories);
    
  return transactions;
};