import { MonthYear } from 'store/interfaces/types/MonthYear';

import { YnabFullBudgetMonth } from './externalDataInterfaces/ynabBudgetMonth';

export interface BudgetMonth extends YnabFullBudgetMonth {
  day: string;
  month: string;
  year: string;
  month_year: MonthYear;
}
