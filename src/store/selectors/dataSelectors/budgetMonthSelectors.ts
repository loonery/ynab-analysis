import { createSelector } from '@reduxjs/toolkit';
import { ynabApi } from 'api/ynabApi';
import { BudgetMonth } from 'interfaces/BudgetMonth';
import { FetchedData } from 'store/interfaces/FetchedData';
import { MonthYear } from 'store/interfaces/types/MonthYear';

export const selectAllBudgetMonths = ynabApi.endpoints.getAllBudgetMonths.select();

/**
 * Retrieves budget months that are not in the future
 */
export const selectActiveBudgetMonths = createSelector(
  [selectAllBudgetMonths],
  (budgetMonths): FetchedData<BudgetMonth[]> => {
    return budgetMonths.data
      ? {
          data: budgetMonths.data.filter((month) => {
            const today = new Date();
            const otherDate = new Date(month.month_year);
            return otherDate <= today;
          }),
          isLoading: false,
        }
      : { data: undefined, isLoading: true };
  },
);

/**
 *
 */
export const selectActiveMonths = createSelector(
  [selectActiveBudgetMonths],
  (budgetMonthsData): FetchedData<MonthYear[]> => {
    const { data: budgetMonths } = budgetMonthsData;
    if (budgetMonths) {
      return {
        data: budgetMonths.map((e: BudgetMonth) => e.month_year),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);
