import { CategoryGroup, SubCategory } from 'interfaces/Category';
import {
  ALL_CATEGORIES_DIMENSION,
  CATEGORY_GROUP_DIMENSION,
  SINGLE_CATEGORY_DIMENSION,
  ALL_CATEGORY_GROUPS_ITEM,
  ALL_CATEGORIES_ITEM,
  NO_PARENT,
} from 'store/consts/consts';

export enum categoryDimensions {
  allCategoriesDimension = ALL_CATEGORIES_DIMENSION,
  categoryGroupDimension = CATEGORY_GROUP_DIMENSION,
  singleCategoryDimension = SINGLE_CATEGORY_DIMENSION,
}

export interface SpendingAnalysisState {
  categoryDimension: categoryDimensions;
  selectedCategoryGroup: CategoryGroup | string;
  selectedCategory: SubCategory | string;
  parentOfSelected: CategoryGroup | string;
  plotState: PlotState;
}

interface PlotState {
  tooltipType: string;
  // tooltipData: TooltipData;
  showTooltip: boolean;
  // highlightedBarData: HighlightedBarData;
}

// todo: implement interfaces
// interface TooltipData {}

// interface HighlightedBarData {}
