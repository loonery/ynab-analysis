import { configureStore } from '@reduxjs/toolkit';
import { accountsReducer } from 'store/slices/accountsSlice';
import { categoriesReducer } from 'store/slices/categoriesSlice';
import { filterBarReducer } from 'store/slices/filterBarSlice';
import { transactionsReducer } from 'store/slices/transactionsSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    accounts: accountsReducer,
    categories: categoriesReducer,
    filterBar: filterBarReducer,
  },
});

export * from 'api/thunks/fetchTransactionsThunk';
export * from 'api/thunks/fetchAccountsThunk';
export * from 'api/thunks/fetchCategoriesThunk';
export { store };
