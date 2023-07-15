import { configureStore } from '@reduxjs/toolkit';
import { ynabApi } from 'api/ynabApi';
import { filterBarReducer } from 'store/slices/filterBarSlice';

import { spendingAnalysisReducer } from './slices/spendingAnalysisSlice';

const store = configureStore({
  reducer: {
    [ynabApi.reducerPath]: ynabApi.reducer,
    filterBar: filterBarReducer,
    spendingAnalysis: spendingAnalysisReducer,
  },
  middleware: (gDM) => gDM().concat(ynabApi.middleware),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export { store };
