import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactionsThunk } from 'api/thunks/fetchTransactionsThunk';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    loading: false,
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

export const { setFilters, applyFilters } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
