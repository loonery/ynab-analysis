import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactionsThunk } from "../../api/thunks/fetchTransactionsThunk";

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        filteredTransactions: [],
        loading: false,
        error: undefined
    },
    reducers: {
        // takes a filter object to filter the current transactions
        filterTransactions(state, action) { 
            // get active filters
            const appliedFilters = action.payload;
            const {categoryFilter, dateFilter, accountFilter} = appliedFilters;

            // filter the transactions
            const filteredTransactions = state.transactions.filter((transaction) => {
            
                // if filter defined, apply filter. If not defined, let anything through
                const date = dateFilter ? (transaction.month_year >= dateFilter.start && transaction.month_year) <= dateFilter.end : true;
                const category = categoryFilter ? (transaction.categoryFilter.includes(transaction.category)) : true;
                const account = accountFilter ? (transaction.account.includes(transaction.account)) : true;
                
                // let the transaction through if it passes through all filters 
                return (date && category && account);
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
            console.log('loading...')
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