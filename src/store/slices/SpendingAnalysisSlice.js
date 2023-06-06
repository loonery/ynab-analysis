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
    plotState: {
      tooltipType: undefined,
      tooltipData: undefined,
      showTooltip: false,
      highlightedBarData: undefined,
    },
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
    setTooltipData(state, { payload }) {
      state.plotState.tooltipData = payload;
    },
    setTooltipType(state, { payload }) {
      state.plotState.tooltipType = payload;
    },
    setShowTooltip(state, { payload }) {
      state.plotState.showTooltip = payload;
    },
    setHighlightedBarData(state, { payload }) {
      state.plotState.highlightedBarData = payload;
    },
  },
});
export const {
  setCategoryDimension,
  setSelectedCategory,
  setSelectedCategoryGroup,
  setParentOfSelected,
  setTooltipData,
  setTooltipType,
  setShowTooltip,
  setHighlightedBarData,
} = spendingAnalysisSlice.actions;
export const spendingAnalysisReducer = spendingAnalysisSlice.reducer;
