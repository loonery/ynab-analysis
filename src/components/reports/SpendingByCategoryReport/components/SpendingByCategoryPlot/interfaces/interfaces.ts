import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
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
  active: boolean;
  cx: number | string;
  cy: number | string;
  payload: SpendingChartData;
}
