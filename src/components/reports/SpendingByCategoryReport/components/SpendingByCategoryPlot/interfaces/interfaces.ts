import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { DotProps } from 'recharts';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import { DataKeys } from './types/types';
/**
 * Interfaces the Spending by Category Plot
 */
export interface DotTooltipProps {
  month: MonthYear;
  total: number;
}

export interface BarTooltipProps {
  payload: SpendingChartData;
  dataKey: string;
}

export interface DotTooltipValues {
  monthString: string;
  totalString: string;
}

export interface BarTooltipValues {
  categoryName: string;
  dollarValue: number;
  percentString: string;
}

export interface ComposedSpendingChartProps {
  data: SpendingChartData[];
  dataKeys: DataKeys;
}

export interface CustomDotProps {
  active?: boolean;
  payload?: SpendingChartData;
  cx?: number;
  cy?: number;
}

export interface BarMouseOverProps {
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
}
