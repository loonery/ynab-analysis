import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { DateRange } from 'store/interfaces/DateRange';
import { FetchedData } from 'store/interfaces/FetchedData';
import { DropdownKey, FilterBarDropdownState } from 'store/interfaces/FilterBarState';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import { selectTransactionDates } from '../dataSelectors/transactionSliceSelectors';

export const selectDropdown = (
  state: RootState,
  dropdownKey: DropdownKey,
): FilterBarDropdownState => state.filterBar[dropdownKey];

export const selectTempDateRange = (state: RootState): DateRange =>
  state.filterBar.dateDropdown.tempDateRange;

export const selectDatesAfterStartDate = createSelector(
  [selectTempDateRange, selectTransactionDates],
  (dates, transactionDates): FetchedData<MonthYear[]> => {
    const { startDate } = dates;
    const { data: allDates } = transactionDates;

    if (allDates && startDate) {
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
    return { data: undefined, isLoading: false };
  },
);
