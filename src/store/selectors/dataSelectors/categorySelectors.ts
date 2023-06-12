import { createSelector } from '@reduxjs/toolkit';
import { ynabApi } from 'api/ynabApi';
import { CategoryData } from 'interfaces/Category';
import { FetchedData } from 'store/interfaces/FetchedData';

export const selectCategoriesResult = ynabApi.endpoints.getCategories.select();

export const selectCategoryData = createSelector(
  [selectCategoriesResult],
  (categories): FetchedData<CategoryData> => {
    return categories?.data
      ? { data: categories?.data, isLoading: false }
      : { data: undefined, isLoading: true };
  },
);

export const selectAllCategoryGroupNames = createSelector(
  [selectCategoryData],
  (data): FetchedData<string[]> => {
    const { data: categoryData } = data;
    if (categoryData) {
      return {
        data: categoryData?.categories.map((category) => category.name),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);
