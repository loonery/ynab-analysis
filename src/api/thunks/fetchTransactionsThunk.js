import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactionsService } from 'api/services/transactionServices';

const fetchTransactionsThunk = createAsyncThunk('transactions/fetch', async () => {
  const transactions = await getTransactionsService();
  console.log(transactions);
  return transactions;
});

export { fetchTransactionsThunk };
