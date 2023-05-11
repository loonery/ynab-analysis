import { createSelector } from '@reduxjs/toolkit';
import { READY_TO_ASSIGN_CATEGORY_ID } from 'store/consts/consts';
import { getUniqueValues } from 'store/utils/storeHelpers';

export const selectTransactions = (state) => state.transactions.transactions;
export const selectFilters = (state) => state.filterBar.appliedFilters;

/**
 * Filters transactions based on filters active in the fi
 */
export const selectFilteredTransactions = createSelector(
  [selectTransactions, selectFilters, (state, onlySpending = true) => onlySpending],
  (transactions, appliedFilters, onlySpending) => {
    const { startDate, endDate, filteredCategories, filteredAccounts } = appliedFilters;

    // if we only want to have the transactions related to spending
    // we filter out the starting balances and income
    if (onlySpending) {
      transactions = transactions.filter((transaction) => {
        const { category_id } = transaction;
        const categorized = category_id !== undefined;
        const notInflow = category_id !== READY_TO_ASSIGN_CATEGORY_ID;
        return categorized && notInflow;
      });
    }

    const filteredTransactions = transactions.filter((transaction) => {
      // if filter defined, apply filter. If not defined, let anything through

      const passStart = startDate
        ? new Date(transaction.month_year) >= new Date(startDate)
        : true;

      const passEnd = endDate
        ? new Date(transaction.month_year) <= new Date(endDate)
        : true;

      const passCategory =
        filteredCategories.length > 0
          ? !filteredCategories.includes(transaction.category_name)
          : true;

      const passAccount =
        filteredAccounts.length > 0
          ? !filteredAccounts.includes(transaction.account_name)
          : true;

      // let the transaction through if it passes through all filters
      return passStart && passEnd && passCategory && passAccount;
    });
    return filteredTransactions;
  },
);

export const selectTransactionDates = createSelector(
  [selectTransactions],
  (transactions) => {
    return getUniqueValues(transactions, 'month_year');
  },
);

/**
 * Returns the earliest and latest occurring dates (as a month_year) of
 * all transactions in the store, stored in an object as {earliest: ..., latest: ...}
 */
export const selectTransactionDateRange = createSelector(
  [selectTransactions],
  (transactions) => {
    return {
      earliest: transactions.length ? transactions.at(0).month_year : undefined,
      latest: transactions.length ? transactions.at(-1).month_year : undefined,
    };
  },
);

export const selectFilteredTransactionCategories = createSelector(
  [selectFilteredTransactions],
  (transactions) => {
    return getUniqueValues(transactions, 'category_name');
  },
);

export const selectFilteredTransactionCategoryGroups = createSelector(
  [selectFilteredTransactions],
  (transactions) => {
    return getUniqueValues(transactions, 'category_group_name');
  },
);
