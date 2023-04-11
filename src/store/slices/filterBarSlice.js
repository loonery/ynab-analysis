import { createSlice } from "@reduxjs/toolkit";

const filterBarSlice = createSlice({
    name: 'filterBar',
    initialState: {
        startDate: undefined, 
        endDate: undefined,
        filteredCategories: new Set(),
        filteredAccounts: new Set(),
    },
    reducers: {
        setStartDateFilter(state, action) {
            state.startDate = action.payload;
        },
        setEndDateFilter(state, action) {
            state.endDate = action.payload;
        }, 
        addToCategoryFilter(state, action) {
            state.filteredCategories.add(action.payload);
        },
        removeFromCategoryFilter(state, action) {
            state.filteredCategories.delete(action.payload);
        },
        addToAccountFilter(state, action) {
            state.filteredAccounts.add(action.payload);
        },
        removeFromAccountFilter(state, action) {
            state.filteredAccounts.delete(action.payload);
        },
    }
});

export const {
    setStartDateFilter,
    setEndDateFilter,
    addToCategoryFilter,
    removeFromCategoryFilter,
    addToAccountFilter,
    removeFromAccountFilter
} = filterBarSlice.actions;
export const filterBarReducer = filterBarSlice.reducer;