import { createSlice, current } from "@reduxjs/toolkit";
import { fetchTransactionsThunk } from "../../api/thunks/fetchTransactionsThunk";

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        categories: [],
        filteredTransactions: [],
        appliedFilters : {
            startDate: undefined, 
            endDate: undefined,
            filteredCategories: [],
            filteredAccounts: []
        },
        loading: true,
        error: undefined,
    },
    reducers: {
        setActiveFilters(state, action) {
            state.appliedFilters = action.payload;
        }
    },
    extraReducers: {
        [fetchTransactionsThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.transactions = action.payload;    
        },
        [fetchTransactionsThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchTransactionsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
    }
});

export const {setFilters, applyFilters} = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;