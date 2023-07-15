import {
  BarTooltipProps,
  DotTooltipProps,
} from 'components/reports/SpendingByCategoryReport/components/SpendingByCategoryPlot/interfaces/interfaces';
import { CategoryGroup, SubCategory } from 'interfaces/Category';
import {
  ALL_CATEGORIES_DIMENSION,
  CATEGORY_GROUP_DIMENSION,
  SINGLE_CATEGORY_DIMENSION,
} from 'store/consts/consts';
import { DOT_TOOLTIP_TYPE, BAR_TOOLTIP_TYPE } from 'store/consts/consts';

export enum CategoryDimensions {
  allCategoriesDimension = ALL_CATEGORIES_DIMENSION,
  categoryGroupDimension = CATEGORY_GROUP_DIMENSION,
  singleCategoryDimension = SINGLE_CATEGORY_DIMENSION,
}

export enum tooltipType {
  dotTooltipType = DOT_TOOLTIP_TYPE,
  barTooltipType = BAR_TOOLTIP_TYPE,
}

export interface SpendingAnalysisState {
  categoryDimension: CategoryDimensions;
  selectedCategoryGroupId: string;
  selectedSubCategoryId: string;
  parentIdOfSelected: string;
  plotState: PlotState;
}

export interface PlotState {
  tooltipType: tooltipType | undefined;
  tooltipData: TooltipData;
  showTooltip: boolean;
  highlightedBarData: HighlightedBarData | undefined;
}

export interface HighlightedBarData {
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
}

export type TooltipData = DotTooltipProps | BarTooltipProps | undefined;
