import { createSelector } from '@reduxjs/toolkit';

export const selectCategoryDropdown = (state) => state.filterBar.categoryDropdown;