import {
  MONTH_DATA_KEY_NAME,
  TOTAL_DATA_KEY_NAME,
} from 'components/reports/SpendingByCategoryReport/consts/consts';
import { MonthYear } from 'store/interfaces/types/MonthYear';
export interface SpendingChartData {
  [MONTH_DATA_KEY_NAME]: MonthYear;
  [TOTAL_DATA_KEY_NAME]: number;
  [dataKey: string]: number | string;
}
