import { createSelector } from '@reduxjs/toolkit';
import { ynabApi } from 'api/ynabApi';
import { FullBudgetMonth } from 'interfaces/externalDataInterfaces/ynabBudgetMonth';
import { FetchedData } from 'store/interfaces/FetchedData';

export const selectAllBudgetMonths = ynabApi.endpoints.getAllBudgetMonths.select();

// export const selectActiveBudgetMonths = createSelector(
//   [selectAllBudgetMonths],
//   (budgetMonths): FetchedData<FullBudgetMonth[]> => {},
// );
