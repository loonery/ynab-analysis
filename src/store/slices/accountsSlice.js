import { createSlice } from '@reduxjs/toolkit';

const accountsSlice = createSlice({
  name: 'transactions',
  initialState: {
    accounts: [],
    loading: true,
    error: undefined,
  },
  reducers: {},
  extraReducers: {
    [fetchTransactionsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    [fetchTransactionsThunk.pending]: (state) => {
      state.loading = true;
    },
    [fetchTransactionsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
