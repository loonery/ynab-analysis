import { createSlice } from '@reduxjs/toolkit';
import {
  ALL_CATEGORY_GROUPS_OPTION,
  ALL_SUBCATEGORIES_OPTION,
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
  selectedCategoryGroupId: ALL_CATEGORY_GROUPS_OPTION.id,
  selectedSubCategoryId: ALL_SUBCATEGORIES_OPTION.id,
  parentIdOfSelected: NO_PARENT,
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
      const { newSubCategoryId }: { newSubCategoryId: string } = payload;
      state.selectedSubCategoryId = newSubCategoryId;
    },
    setSelectedCategoryGroup(state, { payload }) {
      const { newCategoryGroupId }: { newCategoryGroupId: string } = payload;
      state.selectedCategoryGroupId = newCategoryGroupId;
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
  setTooltipData,
  setTooltipType,
  setShowTooltip,
  setHighlightedBarData,
} = spendingAnalysisSlice.actions;
export const spendingAnalysisReducer = spendingAnalysisSlice.reducer;
