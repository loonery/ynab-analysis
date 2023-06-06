import { configureStore } from '@reduxjs/toolkit';
import { ynabApi } from 'api/ynabApi';
import { filterBarReducer } from 'store/slices/filterBarSlice';

import { spendingAnalysisReducer } from './slices/SpendingAnalysisSlice';

const store = configureStore({
  reducer: {
    [ynabApi.reducerPath]: ynabApi.reducer,
    filterBar: filterBarReducer,
    spendingAnalysis: spendingAnalysisReducer,
  },
  middleware: (gDM) => gDM().concat(ynabApi.middleware),
});

export { store };
