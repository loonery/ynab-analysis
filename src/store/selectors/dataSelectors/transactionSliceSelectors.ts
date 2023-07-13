import { createSelector } from '@reduxjs/toolkit';
import { processTransactions } from 'api/utils/transactionUtils';
import { ynabApi } from 'api/ynabApi';
import { CategoryGroup } from 'interfaces/Category';
import { SubCategory } from 'interfaces/Category';
import { Transaction } from 'interfaces/Transaction';
import _ from 'lodash';
import { RootState } from 'store';
import { READY_TO_ASSIGN_CATEGORY_ID } from 'store/consts/consts';
import { DateRange } from 'store/interfaces/DateRange';
import { FetchedData } from 'store/interfaces/FetchedData';
import { AppliedFilters } from 'store/interfaces/FilterBarState';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import { selectCategoriesResult } from './categorySelectors';

const selectFilters = (state: RootState): AppliedFilters =>
  state.filterBar.appliedFilters;

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
            ? !filteredAccounts.includes(transaction.account_id)
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

/**
 * Gets all of the active months that are available on this YNAB budget
 * */
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

/**
 * Gets all of the active months that are available on this YNAB budget
 * */
export const selectFilteredTransactionDates = createSelector(
  [selectTransactions, selectTransactionDates, selectFilters, selectTransactionDateRange],
  (
    transactionsData,
    transactionDatesData,
    appliedFilters,
    transactionDateRangeData,
  ): FetchedData<MonthYear[]> => {
    const { data: transactionDateRange } = transactionDateRangeData;
    const { data: transactionDates } = transactionDatesData;
    const { data: transactions } = transactionsData;

    const startDate = appliedFilters.startDate ?? transactionDateRange?.startDate;
    const endDate = appliedFilters.endDate ?? transactionDateRange?.endDate;

    // check dependencies
    if (transactions && transactionDates && startDate && endDate) {
      // filter
      const filteredTransactionDates = transactionDates.filter((monthYear) => {
        const passStart = startDate ? new Date(monthYear) >= new Date(startDate) : true;
        const passEnd = endDate ? new Date(monthYear) <= new Date(endDate) : true;
        return passStart && passEnd;
      });

      return {
        data: filteredTransactionDates,
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectFilteredTransactionSubCategories = createSelector(
  [selectFilteredTransactions],
  (transactionsData): FetchedData<SubCategory[]> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      // get unique values and filter all undefined values
      const data: SubCategory[] = _.uniq(
        transactions.map((transaction: Transaction) => transaction.subcategory),
      ).filter(
        (item: SubCategory | undefined): item is SubCategory => item !== undefined,
      );
      return {
        data,
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectFilteredTransactionCategoryGroups = createSelector(
  [selectFilteredTransactions],
  (transactionsData): FetchedData<CategoryGroup[]> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      // get unique categoryGroups that are active in transactions and filter all undefined values
      const data: CategoryGroup[] = _.uniq(
        transactions.map((transaction: Transaction) => transaction.category_group),
      ).filter(
        (item: CategoryGroup | undefined): item is CategoryGroup => item !== undefined,
      );
      return {
        data,
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);
