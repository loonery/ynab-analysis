import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { DateRange } from 'store/interfaces/DateRange.js';
import {
  AppliedFilters,
  DropdownKey,
  FilterBarDropdown,
} from 'store/interfaces/FilterBarState.js';

import { selectTransactionDates } from '../dataSelectors/transactionSliceSelectors.js';

export const selectDropdown = (
  state: RootState,
  dropdownKey: DropdownKey,
): FilterBarDropdown => state.filterBar[dropdownKey];

export const selectTempDateRange = (state: RootState): DateRange =>
  state.filterBar.dateDropdown.tempDateRange;

export const selectFilters = (state: RootState): AppliedFilters =>
  state.filterBar.appliedFilters;

export const selectDatesAfterStartDate = createSelector(
  [selectTempDateRange, selectTransactionDates],
  (dates, allDatesReturn): string[] => {
    const { startDate } = dates;
    const { data: allDates } = allDatesReturn;
    const datesAfterStart = allDates
      ? allDates.filter((date: string) => {
          // null protect dates
          if (date && startDate) {
            const constructedDate = new Date(date);
            const constructedStartDate = new Date(startDate);
            return constructedDate >= constructedStartDate;
          }
          return false;
        })
      : [];
    return datesAfterStart;
  },
);
