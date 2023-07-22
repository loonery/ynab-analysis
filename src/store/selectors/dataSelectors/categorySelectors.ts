import { createSelector } from '@reduxjs/toolkit';
import { ynabApi } from 'api/ynabApi';
import { CategoryData, CategoryGroup, SubCategory } from 'interfaces/Category';
import { RootState } from 'store';
import { FetchedData } from 'store/interfaces/FetchedData';

export const selectCategoriesResult = ynabApi.endpoints.getCategories.select();

export const selectCategoryData = createSelector(
  [selectCategoriesResult],
  (categories): FetchedData<CategoryData> => {
    return categories?.data
      ? { data: categories.data, isLoading: false }
      : { data: undefined, isLoading: true };
  },
);

export const selectAllCategoryGroups = createSelector(
  [selectCategoryData],
  (data): FetchedData<CategoryGroup[]> => {
    const { data: categoryData } = data;
    if (categoryData) {
      return {
        data: categoryData?.categories,
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectAllSubCategories = createSelector(
  [selectCategoryData],
  (data): FetchedData<SubCategory[]> => {
    const { data: categoryData } = data;
    if (categoryData) {
      return {
        data: categoryData?.subcategories,
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectAllCategoryGroupNames = createSelector(
  [selectAllCategoryGroups],
  (data): FetchedData<string[]> => {
    const { data: categories } = data;
    if (categories) {
      return {
        data: categories.map((category) => category.name),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectSubcategoryNamesByParentId = createSelector(
  [selectCategoryData, (state, categoryGroupId: string): string => categoryGroupId],
  (data, categoryGroupId): FetchedData<string[]> => {
    const { data: categoryData } = data;
    if (categoryData) {
      return {
        data: categoryData?.categories
          .find((category) => category.id === categoryGroupId)
          ?.subCategories.map((subCat) => subCat.name),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);
