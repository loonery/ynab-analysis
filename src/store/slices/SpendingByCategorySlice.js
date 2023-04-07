import { createSlice } from "@reduxjs/toolkit";

const SpendingByCategorySlice = createSlice({
    name: 'spendingByCategoryReport',
    initialState: {
        categoryDimension: '',
        selectedCategoryGroup: 'All',
        selectedCategory: 'All',
        activeCategoryGroups: [],
        activeSubCategories: [],
    }
})