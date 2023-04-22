import { configureStore } from '@reduxjs/toolkit';
import { filterBarReducer } from 'store/componentSlices/filterBarSlice';
import { accountsReducer } from 'store/dataSlices/accountsSlice';
import { categoriesReducer } from 'store/dataSlices/categoriesSlice';
import { transactionsReducer } from 'store/dataSlices/transactionsSlice';

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
