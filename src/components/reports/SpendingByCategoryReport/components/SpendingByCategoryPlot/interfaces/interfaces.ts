import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { DotProps } from 'recharts';
import { ColorMap } from 'store/interfaces/SpendingAnalysis';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import { DataKeys } from './types/types';
/**
 * Interfaces the Spending by Category Plot
 */

// CHART INTERFACES
export interface ComposedSpendingChartProps {
  data: SpendingChartData[];
  dataKeys: DataKeys;
  colorMap: ColorMap;
}

// DOT INTERFACES
export interface DotTooltipProps {
  month: MonthYear;
  total: number;
}

export interface DotTooltipValues {
  monthString: string;
  totalString: string;
}

export interface CustomDotProps {
  active?: boolean;
  payload?: SpendingChartData;
  cx?: number;
  cy?: number;
}

// BAR INTERFACES
export interface BarTooltipProps {
  payload: SpendingChartData;
  dataKey: string;
}

export interface BarTooltipValues {
  categoryName: string;
  dollarValue: number;
  percentString: string;
}

export interface HighlightedBarProps {
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
}

// types the data that is passed to mouse events in recharts when the user hovers
// over a bar
export type BarMouseOverData = HighlightedBarProps & {
  tooltipPayload: tooltipPayload[];
};

export type tooltipPayload = BarTooltipProps & { fill: string };
