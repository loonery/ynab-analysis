import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccountsService } from 'api/services/accountsServices';

const fetchAccountsThunk = createAsyncThunk('accounts/fetch', async () => {
  const accounts = await getAccountsService();
  console.log(accounts);
  return accounts;
});

export { fetchAccountsThunk };
