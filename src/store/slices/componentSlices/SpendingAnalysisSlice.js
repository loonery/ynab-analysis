import { createSlice } from '@reduxjs/toolkit';
import {
  ALL_CATEGORIES_DIMENSION,
  ALL_CATEGORY_GROUPS_ITEM,
  ALL_CATEGORIES_ITEM,
  NO_PARENT,
} from 'store/consts/consts';

const spendingAnalysisSlice = createSlice({
  name: 'spendingAnalysis',
  initialState: {
    categoryDimension: ALL_CATEGORIES_DIMENSION,
    selectedCategoryGroup: ALL_CATEGORY_GROUPS_ITEM,
    selectedCategory: ALL_CATEGORIES_ITEM,
    parentOfSelected: NO_PARENT,
  },
  reducers: {
    setCategoryDimension(state, action) {
      state.categoryDimension = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedCategoryGroup(state, action) {
      state.selectedCategoryGroup = action.payload;
    },
    setParentOfSelected(state, action) {
      state.parentOfSelected = action.payload;
    },
  },
});
export const {
  setCategoryDimension,
  setSelectedCategory,
  setSelectedCategoryGroup,
  setParentOfSelected,
} = spendingAnalysisSlice.actions;
export const spendingAnalysisReducer = spendingAnalysisSlice.reducer;
