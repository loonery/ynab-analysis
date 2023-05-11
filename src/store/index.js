import { configureStore } from '@reduxjs/toolkit';
import { filterBarReducer } from 'store/slices/componentSlices/filterBarSlice';
import { accountsReducer } from 'store/slices/dataSlices/accountsSlice';
import { categoriesReducer } from 'store/slices/dataSlices/categoriesSlice';
import { transactionsReducer } from 'store/slices/dataSlices/transactionsSlice';

import { spendingAnalysisReducer } from './slices/componentSlices/SpendingAnalysisSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    accounts: accountsReducer,
    categories: categoriesReducer,
    filterBar: filterBarReducer,
    spendingAnalysis: spendingAnalysisReducer,
  },
});

export * from 'api/thunks/fetchTransactionsThunk';
export * from 'api/thunks/fetchAccountsThunk';
export * from 'api/thunks/fetchCategoriesThunk';
export { store };
