import { BarTooltipProps } from 'components/reports/SpendingByCategoryReport/components/SpendingByCategoryPlot/BarTooltip';
import { DotTooltipProps } from 'components/reports/SpendingByCategoryReport/components/SpendingByCategoryPlot/DotTooltip';
import { CategoryGroup, SubCategory } from 'interfaces/Category';
import {
  ALL_CATEGORIES_DIMENSION,
  CATEGORY_GROUP_DIMENSION,
  SINGLE_CATEGORY_DIMENSION,
  ALL_CATEGORY_GROUPS_ITEM,
  ALL_CATEGORIES_ITEM,
  NO_PARENT,
} from 'store/consts/consts';
import { DOT_TOOLTIP_TYPE, BAR_TOOLTIP_TYPE } from 'store/consts/consts';

export enum categoryDimensions {
  allCategoriesDimension = ALL_CATEGORIES_DIMENSION,
  categoryGroupDimension = CATEGORY_GROUP_DIMENSION,
  singleCategoryDimension = SINGLE_CATEGORY_DIMENSION,
}

export enum tooltipType {
  dotTooltipType = DOT_TOOLTIP_TYPE,
  barTooltipType = BAR_TOOLTIP_TYPE,
}

export interface SpendingAnalysisState {
  categoryDimension: categoryDimensions;
  selectedCategoryGroup: CategoryGroup | string;
  selectedCategory: SubCategory | string;
  parentOfSelected: CategoryGroup | string;
  plotState: PlotState;
}

interface PlotState {
  tooltipType: tooltipType | undefined;
  tooltipData: TooltipData;
  showTooltip: boolean;
  highlightedBarData: HighlightedBarData | undefined;
}

export type TooltipData = DotTooltipProps | BarTooltipProps | undefined;

export interface HighlightedBarData {
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
}
