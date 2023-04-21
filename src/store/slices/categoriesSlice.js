import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoriesThunk } from 'api/thunks/fetchCategoriesThunk';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    categoriesLoading: false,
    error: undefined,
  },
  reducers: {},
  extraReducers: {
    [fetchCategoriesThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    [fetchCategoriesThunk.pending]: (state) => {
      state.loading = true;
    },
    [fetchCategoriesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
export const categoriesReducer = categoriesSlice.reducer;
