import { createSelector } from '@reduxjs/toolkit';
import { ynabApi } from 'api/ynabApi';
import { CategoryData, CategoryGroup, SubCategory } from 'interfaces/Category';
import { RootState } from 'store';
import { PLOTLY_ANTIQUE_SCALE, PLOTLY_DARK_24 } from 'store/consts/consts';
import { FetchedData } from 'store/interfaces/FetchedData';
import { ColorMap } from 'store/interfaces/SpendingAnalysis';
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

export const selectAllCategoryGroupIds = createSelector(
  [selectAllCategoryGroups],
  (data): FetchedData<string[]> => {
    const { data: categories } = data;
    if (categories) {
      return {
        data: categories.map((category) => category.id),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectSubcategoryIdsByParentId = createSelector(
  [selectCategoryData, (state, categoryGroupId: string): string => categoryGroupId],
  (data, categoryGroupId): FetchedData<string[]> => {
    const { data: categoryData } = data;
    if (categoryData) {
      return {
        data: categoryData?.categories
          .find((category) => category.id === categoryGroupId)
          ?.subCategories.map((subCat) => subCat.id),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectCategoryNameById = createSelector(
  [selectCategoryData, (state: RootState, id: string): string => id],
  (categoryDataResponse, id): FetchedData<string> => {
    const { data: categoryData } = categoryDataResponse;
    if (categoryData) {
      return { data: categoryData.idToNameMap[id], isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectCategoryColors = createSelector(
  [selectCategoryData, (state: RootState, colorScheme: string): string => colorScheme],
  (categoryDataResponse, colorScheme): FetchedData<ColorMap> => {
    const { data: categoryData } = categoryDataResponse;

    const idToColorMap: ColorMap = {};

    if (categoryData) {
      let circularPointer = 0;
      // PLOTLY dark 24 palette on repeat for category groups
      categoryData.categories.forEach((categoryGroup: CategoryGroup) => {
        idToColorMap[categoryGroup.id] =
          PLOTLY_DARK_24[circularPointer++ % PLOTLY_DARK_24.length];
      });
      // plotly antique scale for subcategories
      circularPointer = 0;
      categoryData.categories.forEach((categoryGroup: CategoryGroup) => {
        categoryGroup.subCategories.forEach((subCategory: SubCategory) => {
          idToColorMap[subCategory.id] =
            PLOTLY_ANTIQUE_SCALE[circularPointer++ % PLOTLY_ANTIQUE_SCALE.length];
        });
      });
      return { data: idToColorMap, isLoading: true };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectCategoryFillById = createSelector(
  [selectCategoryColors, (state: RootState, id: string): string => id],
  (colorsResponse, id): string => {
    const { data: colorMap } = colorsResponse;
    if (colorMap) {
      return colorMap[id];
    }
    // if we don't have the data default it to black
    return 'black';
  },
);
