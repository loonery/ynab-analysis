import { createSlice } from '@reduxjs/toolkit';
import { fetchAccountsThunk } from 'api/thunks/fetchAccountsThunk';

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    loading: false,
    error: undefined,
  },
  reducers: {},
  extraReducers: {
    [fetchAccountsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.accounts = action.payload;
    },
    [fetchAccountsThunk.pending]: (state) => {
      state.loading = true;
    },
    [fetchAccountsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const accountsReducer = accountsSlice.reducer;