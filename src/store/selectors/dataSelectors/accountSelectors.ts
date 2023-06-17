import { createSelector } from '@reduxjs/toolkit';
import { ynabApi } from 'api/ynabApi';
import { Account } from 'interfaces/Account';
import { FetchedData } from 'store/interfaces/FetchedData';
export const selectAccountsResult = ynabApi.endpoints.getAccounts.select();

export const selectCategoryData = createSelector(
  [selectAccountsResult],
  (accountsResult): FetchedData<Account[]> => {
    const accounts = accountsResult.data;
    return accounts
      ? { data: accounts, isLoading: false }
      : { data: undefined, isLoading: true };
  },
);
