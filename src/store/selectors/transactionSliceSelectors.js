import { createSelector } from "@reduxjs/toolkit";

const selectTransactions = (state) => state.transactions.transactions;
const selectLoading = (state) => state.transactions.loading;
const selectFilters = (state) => state.filterBar.appliedFilters;

/**
 * Filters transactions based on filters active in the fi
 */
export const selectFilteredTransactions = createSelector(
  [
    selectTransactions,
    selectFilters
  ],
  (transactions, appliedFilters) => {
    const {
      startDate, 
      endDate, 
      filteredCategories, 
      filteredAccounts,
    } = appliedFilters;

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
 * all transactions in the store, stored in an object as {earliest: ..., latest: ...}
 */
export const selectTransactionDateRange = createSelector(
  [selectTransactions],
  (transactions) => {
    return (
      {
        earliest: transactions.length ? transactions.at(0).month_year : undefined,
        latest: transactions.length ? transactions.at(-1).month_year : undefined,
      }
    );}
);

export const selectTransactionDates = createSelector(
  [selectTransactions],
  (transactions) => {
    const dates = new Set();
    for (let transaction of transactions) {
      dates.add(transaction.month_year);
    }    
    return Array.from(dates.values());
  }
);

/**
 * Returns all categories of all transactions in the store, stored in a map of parent : child category
 [
   {
     parent: ...,
     children: [...]
    },
    {
      ...
    }
  ]
    
*/
export const selectTransactionCategories = createSelector(
  [selectTransactions],
  (transactions) => {

    const transactionCategories = {};
    for (const transaction of transactions) {

      // get the two types of categories on each transaction
      const groupName = transaction.category_group_name;
      const childName = transaction.category_name;

      // if the category group is in the object...
      if (transactionCategories[groupName]) {
        const currentChildList = transactionCategories[groupName];
        transactionCategories[groupName] = currentChildList.includes(childName) 
          ? currentChildList 
          : [...currentChildList, childName];
        
      // otherwise if we need to add the category group...
      } else {
        transactionCategories[groupName] = [childName];
      }
    }
    return transactionCategories;
  },
);

export const selectTransactionAccounts = createSelector(
  [selectTransactions],
  (transactions) => {
    const accounts = new Set();
    for (const transaction of transactions) {
      accounts.add(transaction.account);
    }
    return Array.from(accounts);
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
