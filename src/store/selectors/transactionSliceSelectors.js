import { createSelector } from "@reduxjs/toolkit";

const selectTransactions = state => state.transactions.transactions;
const selectFilters = state => state.transactions.appliedFilters;

/**
 * Filters transactions based on filters active in the fi
 */
export const selectFilteredTransactions = createSelector(
    [
        selectTransactions, 
        selectFilters
    ], 
    (transactions, appliedFilters) => {

        const {filteredCategories, startDate, endDate, filteredAccounts} = appliedFilters;

        // filter the transactions
        const filteredTransactions = transactions.filter((transaction) => {
        
            // if filter defined, apply filter. If not defined, let anything through
            const passStart = startDate ? (transaction.month_year >= startDate) : true;

            const passEnd = endDate ? (transaction.month_year <= endDate) : true;

            const passCategory = (filteredCategories.length > 0) ? 
                        (filteredCategories.includes(transaction.category_name) 
                        || filteredCategories.includes(transaction.category_group_name)) 
                        : true;

            const passAccount = (filteredAccounts.length > 0) ? 
                                (filteredAccounts.includes(transaction.account)) : 
                                true;
            
            // let the transaction through if it passes through all filters 
            return (
                passStart &&
                passEnd &&
                passCategory &&
                passAccount
            );
        });
        return filteredTransactions;
});

/**
 * Returns the earliest and latest occurring dates (as a month_year) of 
 * all transactions in the store, stored in an object
 */
export const selectTransactionDateRange = createSelector(
    [selectTransactions], 
    (transactions) => {
        return {
            earliest: transactions.at(0).month_year, 
            latest: transactions.at(-1).month_year
        }
    }
)

/**
 * Returns all categories of all transactions in the store, stored in a map of parent : child category
 */
export const selectTransactionCategories = createSelector(
    [selectTransactions],
    (transactions) => {
        
    }
)
