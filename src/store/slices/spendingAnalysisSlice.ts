import { createSlice } from '@reduxjs/toolkit';
import { CategoryGroup } from 'interfaces/Category';
import {
  ALL_CATEGORY_GROUPS_ITEM,
  ALL_CATEGORIES_ITEM,
  NO_PARENT,
} from 'store/consts/consts';
import {
  SpendingAnalysisState,
  CategoryDimensions,
  TooltipData,
} from 'store/interfaces/SpendingAnalysisState';
import { HighlightedBarData, PlotState } from 'store/interfaces/SpendingAnalysisState';
import { tooltipType } from 'store/interfaces/SpendingAnalysisState';

const initialPlotState: PlotState = {
  tooltipType: undefined,
  tooltipData: undefined,
  showTooltip: false,
  highlightedBarData: undefined,
};

const initialState: SpendingAnalysisState = {
  categoryDimension: CategoryDimensions.allCategoriesDimension,
  selectedCategoryGroup: ALL_CATEGORY_GROUPS_ITEM,
  selectedCategory: ALL_CATEGORIES_ITEM,
  parentOfSelected: NO_PARENT,
  plotState: initialPlotState,
};

const sliceName = 'spendingAnalysis';

const spendingAnalysisSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCategoryDimension(state, { payload }) {
      const categoryDimension: CategoryDimensions = payload;
      state.categoryDimension = categoryDimension;
    },
    setSelectedCategory(state, { payload }) {
      const selectedCategory: string = payload;
      state.selectedCategory = selectedCategory;
    },
    setSelectedCategoryGroup(state, { payload }) {
      const selectedCategoryGroup: CategoryGroup | string = payload;
      state.selectedCategoryGroup = selectedCategoryGroup;
    },
    setParentOfSelected(state, { payload }) {
      const parentOfSelected: CategoryGroup | string = payload;
      state.parentOfSelected = parentOfSelected;
    },
    setTooltipData(state, { payload }) {
      const tooltipData: TooltipData = payload;
      state.plotState.tooltipData = tooltipData;
    },
    setTooltipType(state, { payload }) {
      const tooltipType: tooltipType = payload;
      state.plotState.tooltipType = tooltipType;
    },
    setShowTooltip(state, { payload }) {
      const showTooltip: boolean = payload;
      state.plotState.showTooltip = showTooltip;
    },
    setHighlightedBarData(state, { payload }) {
      const highlightedBarData: HighlightedBarData = payload;
      state.plotState.highlightedBarData = highlightedBarData;
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
