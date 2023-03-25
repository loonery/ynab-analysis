import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: []
    },
    reducers: {}
});

export const {changeAppliedFilters, filterTransactions} = transactionsSlice.actions;