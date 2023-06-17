import { createSelector } from '@reduxjs/toolkit';
import { processTransactions } from 'api/utils/transactionHelpers';
import { ynabApi } from 'api/ynabApi';
import { Transaction } from 'interfaces/Transaction';
import _ from 'lodash';
import { RootState } from 'store';
import { READY_TO_ASSIGN_CATEGORY_ID } from 'store/consts/consts';
import { DateRange } from 'store/interfaces/DateRange';
import { FetchedData } from 'store/interfaces/FetchedData';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import { selectFilters } from '../componentSelectors/filterBarSelectors';

import { selectCategoriesResult } from './categorySelectors';

export const selectTransactionsResult = ynabApi.endpoints.getTransactions.select();

// here is where transactions are processed from the YnabTransaction interface to the
// Transaction interface
export const selectTransactions = createSelector(
  selectTransactionsResult,
  selectCategoriesResult,
  (transactionResult, categoriesResult): FetchedData<Transaction[]> => {
    const data =
      transactionResult?.data && categoriesResult?.data
        ? processTransactions(transactionResult.data, categoriesResult.data)
        : undefined;

    return data ? { data, isLoading: false } : { data, isLoading: true };
  },
);

/**
 * Filters transactions based on filters active in the filterBar
 */
export const selectFilteredTransactions = createSelector(
  [
    selectTransactions,
    selectFilters,
    (state: RootState, onlySpending = true): boolean => onlySpending,
  ],
  (transactionsData, appliedFilters, onlySpending): FetchedData<Transaction[]> => {
    const { startDate, endDate, filteredCategories, filteredAccounts } = appliedFilters;
    const { data: transactions, isLoading } = transactionsData;

    // if we only want to have the transactions related to spending
    // we filter out the starting balances and income
    let preFilteredTransactions = transactions;
    if (onlySpending) {
      preFilteredTransactions = transactions
        ? transactions.filter((transaction) => {
            const { subcategory } = transaction;
            const categorized = subcategory !== undefined;
            const notInflow = subcategory?.id !== READY_TO_ASSIGN_CATEGORY_ID;
            return categorized && notInflow;
          })
        : [];
    }

    // if we have the transactions, perform the filtering
    if (preFilteredTransactions && !isLoading) {
      const filteredTransactions = preFilteredTransactions.filter((transaction) => {
        // if filter defined, apply filter. If not defined, let anything through
        const passStart = startDate
          ? new Date(transaction.month_year) >= new Date(startDate)
          : true;

        const passEnd = endDate
          ? new Date(transaction.month_year) <= new Date(endDate)
          : true;

        const tid = transaction.subcategory?.id;
        const passCategory =
          filteredCategories.length > 0 && tid ? !filteredCategories.includes(tid) : true;

        const passAccount =
          filteredAccounts.length > 0
            ? !filteredAccounts.includes(transaction.account_name)
            : true;

        // let the transaction through if it passes through all filters
        return passStart && passEnd && passCategory && passAccount;
      });
      return { data: filteredTransactions, isLoading: false };
    }
    // else return that the data is still loading
    return { data: undefined, isLoading: true };
  },
);

/**
 * Returns the earliest and latest occurring dates (as a month_year) of
 * all transactions in the store, stored in an object as {earliest: ..., latest: ...}
 */
export const selectTransactionDateRange = createSelector(
  [selectTransactions],
  (transactionsData: FetchedData<Transaction[]>): FetchedData<DateRange> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      return {
        data: {
          startDate: transactions.length ? transactions.at(0)?.month_year : undefined,
          endDate: transactions.length ? transactions.at(-1)?.month_year : undefined,
        },
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectTransactionDates = createSelector(
  [selectTransactions],
  (transactionsData): FetchedData<MonthYear[]> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      return {
        data: _.uniq(transactions.map((transaction) => transaction?.month_year)),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectFilteredTransactionCategories = createSelector(
  [selectFilteredTransactions],
  (transactionsData): FetchedData<(string | undefined)[]> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      return {
        data: _.uniq(transactions.map((transaction) => transaction.subcategory?.id)),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectFilteredTransactionCategoryGroups = createSelector(
  [selectFilteredTransactions],
  (transactionsData): FetchedData<(string | undefined)[]> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      return {
        data: _.uniq(transactions.map((transaction) => transaction.category_group?.id)),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);
