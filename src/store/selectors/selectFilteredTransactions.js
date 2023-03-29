import { createSelector } from "@reduxjs/toolkit";

const selectTransactions = state => state.transactions.transactions;
const selectFilters = state => state.transactions.appliedFilters;

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

            const passAccount = (filteredAccounts.length > 0) ? (filteredAccounts.includes(transaction.account)) : true;
            
            // let the transaction through if it passes through all filters 
            return (
                passStart &&
                passEnd &&
                passCategory &&
                passAccount
            );
        });
        return filteredTransactions;
})