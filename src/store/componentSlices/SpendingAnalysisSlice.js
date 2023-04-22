import { createSlice } from '@reduxjs/toolkit';
import { ALL_CATEGORIES_DIMENSION, DEFAULT_CATEGORY_ITEM } from 'store/consts/consts';

const spendingAnalysisSlice = createSlice({
  name: 'spendingAnalysis',
  initialState: {
    categoryDimension: ALL_CATEGORIES_DIMENSION,
    selectedCategoryItem: DEFAULT_CATEGORY_ITEM,
  },
  reducers: {},
});
// export const {} = spendingAnalysisSlice.actions;
export const spendingAnalysisReducer = spendingAnalysisSlice.reducer;
