import { createSlice, current } from "@reduxjs/toolkit";
import { fetchTransactionsThunk } from "../../api/thunks/fetchTransactionsThunk";

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
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
        // takes a filter object to filter the current transactions
        setFilters(state, action) {
            state.appliedFilters = action.payload;
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

export const {setFilters, applyFilters} = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;