import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactionsService } from "../transactionsApi/transactionServices";

const fetchTransactionsThunk = createAsyncThunk("transactions/fetch", async () => {
  const transactions = await getTransactionsService();
  return transactions;
});

export { fetchTransactionsThunk };