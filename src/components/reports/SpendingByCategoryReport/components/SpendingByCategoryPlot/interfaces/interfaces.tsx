import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { MonthYear } from 'store/interfaces/types/MonthYear';

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
