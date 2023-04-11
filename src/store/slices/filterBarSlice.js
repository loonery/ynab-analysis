import { createSlice } from "@reduxjs/toolkit";

const filterBarSlice = createSlice({
    name: 'filterBar',
    initialState: {
        startDate: undefined, 
        endDate: undefined,
        filteredCategories: [],
        filteredAccounts: [],
    },
    reducers: {
        setStartDateFilter(state, action) {
            state.startDate = action.payload;
        },
        setEndDateFilter(state, action) {
            state.endDate = action.payload;
        }, 
        setCategoryFilter(state, action) {
            state.filteredCategories = action.payload;
        },
        setAccountFilter(state, action) {
            state.filteredAccounts = action.payload;
        },
    }
});

export const {
    setStartDateFilter,
    setEndDateFilter,
    setCategoryFilter,
    setAccountFilter
} = filterBarSlice.actions;