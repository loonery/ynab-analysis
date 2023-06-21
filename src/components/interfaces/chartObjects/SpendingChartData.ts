import { MonthYear } from 'store/interfaces/types/MonthYear';
export interface SpendingChartData {
  month: MonthYear;
  total: number;
  [dataKey: string]: number | MonthYear;
}
