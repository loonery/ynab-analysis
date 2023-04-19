import { createSlice } from '@reduxjs/toolkit';

const accountsSlice = createSlice({
  name: 'transactions',
  initialState: {
    accounts: [],
    loading: true,
    error: undefined,
  },
  reducers: {},
  extraReducers: {},
});

export const accountsReducer = accountsSlice.reducer;
