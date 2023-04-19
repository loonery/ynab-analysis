import { configureStore } from '@reduxjs/toolkit';
import { filterBarReducer } from 'store/slices/filterBarSlice';
import { transactionsReducer } from 'store/slices/transactionsSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filterBar: filterBarReducer,
  },
});

export * from '../api/thunks/fetchTransactionsThunk';
export * from '../api/thunks/fetchAccountsThunk';
export { store };
