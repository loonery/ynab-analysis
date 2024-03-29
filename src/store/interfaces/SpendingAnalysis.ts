import {
  BarTooltipProps,
  DotTooltipProps,
} from 'components/reports/SpendingByCategoryReport/components/SpendingByCategoryPlot/interfaces/interfaces';
import {
  ALL_CATEGORIES_DIMENSION,
  CATEGORY_GROUP_DIMENSION,
  SINGLE_CATEGORY_DIMENSION,
} from 'store/consts/consts';
import { DOT_TOOLTIP_TYPE, BAR_TOOLTIP_TYPE } from 'store/consts/consts';

import { MonthYear } from './types/MonthYear';

export type CategoryDimensions =
  | typeof ALL_CATEGORIES_DIMENSION
  | typeof CATEGORY_GROUP_DIMENSION
  | typeof SINGLE_CATEGORY_DIMENSION;

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

export interface ColorMap {
  [id: string]: string;
}

export interface PlotState {
  tooltipType: tooltipType | undefined;
  tooltipData: TooltipData;
  showTooltip: boolean;
  highlightedBarData: HighlightedBarData | undefined;
  colorMap: ColorMap;
}

export interface HighlightedBarData {
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
}

export type TooltipData = DotTooltipProps | BarTooltipProps | undefined;

export interface MonthToCategorySpendingMap {
  [month: MonthYear]: { total: number; [categoryTypeId: string]: number };
}
