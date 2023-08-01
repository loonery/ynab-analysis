import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { DateRange } from 'store/interfaces/DateRange';
import { FetchedData } from 'store/interfaces/FetchedData';
import { DropdownKey, FilterBarDropdownState } from 'store/interfaces/FilterBarState';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import { selectActiveMonths } from '../dataSelectors/budgetMonthSelectors';

export const selectDropdown = (
  state: RootState,
  dropdownKey: DropdownKey,
): FilterBarDropdownState => state.filterBar[dropdownKey];

export const selectAppliedAccountFilters = (state: RootState): string[] =>
  state.filterBar.appliedFilters.filteredAccounts;

/**
 *
 * @param state
 * @returns string Ids of filtered out categories
 */
export const selectAppliedCategoryFilters = (state: RootState): string[] =>
  state.filterBar.appliedFilters.filteredCategories;

export const selectAppliedDateFilter = (state: RootState): DateRange => {
  const { startDate, endDate } = state.filterBar.appliedFilters;
  return { startDate, endDate };
};

export const selectTempDateRange = (state: RootState): DateRange =>
  state.filterBar.dateDropdown.tempDateRange;

/**
 * Retrieves all selectable dates that are after the user's selected start date filter
 */
export const selectDatesAfterStartDate = createSelector(
  [selectTempDateRange, selectActiveMonths],
  (dates, transactionDates): FetchedData<MonthYear[]> => {
    const { startDate } = dates;
    const { data: allDates } = transactionDates;

    if (allDates) {
      const datesAfterStart = allDates.filter((date: MonthYear) => {
        // null protect dates
        if (date && startDate) {
          const constructedDate = new Date(date);
          const constructedStartDate = new Date(startDate);
          return constructedDate >= constructedStartDate;
        }
        return false;
      });
      return { data: datesAfterStart, isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);
