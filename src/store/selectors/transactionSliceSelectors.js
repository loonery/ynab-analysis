import { createSelector } from '@reduxjs/toolkit';

const selectTransactions = (state) => state.transactions.transactions;
const selectFilters = (state) => state.transactions.appliedFilters;

/**
 * Filters transactions based on filters active in the fi
 */
export const selectFilteredTransactions = createSelector(
  [
    selectTransactions,
    selectFilters,
  ],
  (transactions, appliedFilters) => {
    const {
      filteredCategories, startDate, endDate, filteredAccounts,
    } = appliedFilters;

    // filter the transactions
    const filteredTransactions = transactions.filter((transaction) => {
      // if filter defined, apply filter. If not defined, let anything through
      const passStart = startDate ? (transaction.month_year >= startDate) : true;

      const passEnd = endDate ? (transaction.month_year <= endDate) : true;

      const passCategory = (filteredCategories.length > 0)
        ? (filteredCategories.includes(transaction.category_name)
                        || filteredCategories.includes(transaction.category_group_name))
        : true;

      const passAccount = (filteredAccounts.length > 0)
        ? (filteredAccounts.includes(transaction.account))
        : true;

      // let the transaction through if it passes through all filters
      return (
        passStart
                && passEnd
                && passCategory
                && passAccount
      );
    });
    return filteredTransactions;
  },
);

/**
 * Returns the earliest and latest occurring dates (as a month_year) of
 * all transactions in the store, stored in an object
 */
export const selectTransactionDateRange = createSelector(
  [selectTransactions],
  (transactions) => ({
    earliest: transactions.at(0).month_year,
    latest: transactions.at(-1).month_year,
  }),
);

/**
 * Returns all categories of all transactions in the store, stored in a map of parent : child category
 */
export const selectTransactionCategories = createSelector(
  [selectTransactions],
  (transactions) => {
    const categoryMap = new Map();
    for (const transaction of transactions) {
      // get the two types of categories on each transaction
      const groupName = transaction.category_group_name;
      const childName = transaction.category_name;

      // if the category group is in the map...
      if (categoryMap.has(groupName)) {
        const currentChildList = categoryMap.get(groupName);
        const newChildList = currentChildList.has(childName) ? currentChildList : currentChildList.add(childName);
        categoryMap.set(groupName, newChildList);

        // otherwise if we need to add the category group...
      } else {
        categoryMap.set(groupName, new Set([childName]));
      }
    }
    return categoryMap;
  },
);

export const selectTransactionAccounts = createSelector(
  [selectTransactions],
  (transactions) => {
    const accounts = new Set();
    for (const transaction of transactions) {
      accounts.add(transaction.account);
    }
  },
);

export const selectTransactionsByCategoryItem = createSelector(
  [
    selectTransactionCategories,
    selectTransactions,
    (state, selectedCategory) => selectedCategory,
  ],
  (categories, transactions, selectedCategory) => {
    const isCategoryGroup = categories.has(selectedCategory);

    const returned = isCategoryGroup
      ? transactions.filter((transaction) => transaction.category_group_name === selectedCategory)
      : transactions.filter((transaction) => transaction.category_name === selectedCategory);

    return returned;
  },
);
