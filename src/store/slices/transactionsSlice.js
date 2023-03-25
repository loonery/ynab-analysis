import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactionsThunk } from "../apis/thunks/fetchTransactionsThunk";

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        appliedFilters: {
            categoryFilter: undefined, 
            dateFilter: undefined,
            accountFilter: undefined,
        },
        transactions: [],
        loading: false,
        error: undefined
    },
    reducers: {
        changeAppliedFilters(state, action) { 
            // get active filters
            state.appliedFilters = action.payload;
            const {categoryFilter, dateFilter, accountFilter} = state.appliedFilters;

            // filter the transactions
            const filteredTransactions  = state.transactions.filter((transaction) => {
            
                // if filter defined, apply filter. If not defined, let anything through
                const date = dateFilter ? (transaction.month_year >= dateFilter.start && transaction.month_year) <= dateFilter.end : true;
                const category = categoryFilter ? (transaction.categoryFilter.includes(transaction.category)) : true;
                const account = accountFilter ? (transaction.account.includes(transaction.account)) : true;
                
                // let the transaction through if it passes through all filters 
                return (date && category && account);
            });
            state.transactions = filteredTransactions;
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