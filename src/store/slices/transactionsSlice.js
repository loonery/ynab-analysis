import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactionsThunk } from "../../api/thunks/fetchTransactionsThunk";

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        filteredTransactions: [],
        loading: true,
        error: undefined
    },
    reducers: {
        // takes a filter object to filter the current transactions
        filterTransactions(state, action) { 
            // get active filters
            const appliedFilters = action.payload;
            const {filteredCategories, startDate, endDate, filteredAccounts} = appliedFilters;

            // filter the transactions
            const filteredTransactions = state.transactions.filter((transaction) => {
            
                // if filter defined, apply filter. If not defined, let anything through
                const passStart = startDate ? (transaction.month_year >= startDate) : true;

                const passEnd = endDate ? (transaction.month_year <= endDate) : true;

                const passCategory = filteredCategories ? 
                            (filteredCategories.includes(transaction.category_name) 
                            || filteredCategories.includes(transaction.category_group_name)) 
                            : true;

                const passAccount = filteredAccounts ? (filteredAccounts.includes(transaction.account)) : true;
                
                // let the transaction through if it passes through all filters 
                return (
                    passStart &&
                    passEnd &&
                    passCategory &&
                    passAccount
                );
            });
            state.filteredTransactions = filteredTransactions;
        }
    },
    extraReducers: {
        [fetchTransactionsThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.transactions = action.payload;    // thunk return value is the payload
        },
        [fetchTransactionsThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchTransactionsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;             // thunk error value returned here
        },
    }
});

export const {changeAppliedFilters, filterTransactions} = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;