import { createSelector } from "@reduxjs/toolkit";
import { selectTransactionDates } from "./transactionSliceSelectors";

export const selectDropdown = (state, { dropdownKey }) => state.filterBar[dropdownKey];
export const selectTempStartDate = (state) => state.filterBar.dateDropdown.tempDateRange.startDate;

export const selectDatesAfterStartDate = createSelector(
    [
    selectTempStartDate,
    selectTransactionDates,
  ],
  (startDate, allDates) => {
    const datesAfterStart = allDates.filter(date => {
        const constructedDate = new Date(date);
        const constructedStartDate = new Date(startDate);
        return constructedDate >= constructedStartDate;
    });
    return datesAfterStart;
  })