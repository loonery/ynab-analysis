import { createSelector } from "@reduxjs/toolkit";
import { selectTransactionDates } from "./transactionSliceSelectors";

export const selectDropdown = (state, { dropdownKey }) => state.filterBar[dropdownKey];
export const selectTempDateRange = (state) => state.filterBar.dateDropdown.tempDateRange;

export const selectDatesAfterStartDate = createSelector(
    [
      selectTempDateRange,
      selectTransactionDates,
    ],
  (dates, allDates) => {

    const { startDate } = dates;
    const datesAfterStart = allDates.filter(date => {
        const constructedDate = new Date(date);
        const constructedStartDate = new Date(startDate);
        return constructedDate >= constructedStartDate;
    });
    return datesAfterStart;
  })