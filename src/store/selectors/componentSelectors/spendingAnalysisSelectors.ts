import { createSelector } from '@reduxjs/toolkit';
import { InternMap, rollup } from 'd3';
import { CategoryGroup, SubCategory } from 'interfaces/Category';
import { Transaction } from 'interfaces/Transaction';
import { OptionInterface } from 'libs/reuse/elements/form-controls/interfaces/interfaces';
import { getOptionsFromValues } from 'libs/utils/utils';
import {
  mapCategoryValueToAllowedType,
  mapCategoryValueToId,
  mapCategoryValueToLabel,
} from 'libs/utils/utils';
import { RootState } from 'store';
import {
  ALL_CATEGORIES_DIMENSION,
  ALL_CATEGORY_GROUPS_OPTION,
  ALL_SUBCATEGORIES_OPTION,
} from 'store/consts/consts';
import { FetchedData } from 'store/interfaces/FetchedData';
import {
  HighlightedBarData,
  TooltipData,
  tooltipType,
  CategoryDimensions,
} from 'store/interfaces/SpendingAnalysis';
import { MonthYear } from 'store/interfaces/types/MonthYear';
import { totalSpendingHelper } from 'store/utils/selectorHelpers';

import { selectActiveMonths } from '../dataSelectors/budgetMonthSelectors';
import { selectCategoryData } from '../dataSelectors/categorySelectors';
import {
  selectFilteredTransactions,
  selectFilteredTransactionSubCategories,
  selectFilteredTransactionCategoryGroups,
} from '../dataSelectors/transactionSliceSelectors';
import {
  MonthlySpendingMap,
  CategoryGroupSpendingData,
  MonthlySpendingData,
  TOTAL_MONTHLY_SPENDING_KEY,
  SUBCATEGORY_MAP_KEY,
  SUB_CATEGORY_SPENDING_VALUE_KEY,
  SUB_CATEGORY_NAME_KEY,
  CATEGORY_GROUP_NAME_KEY,
  CATEGORY_GROUP_TOTAL_KEY,
  CATEGORY_GROUPS_MAP_KEY,
  SubCategorySpendingData,
} from '../interfaces/interfaces';

import { selectAppliedDateFilter } from './filterBarSelectors';

/**
 * atomic selectors
 */
export const selectSelectedCategoryId = (state: RootState): string => {
  return state.spendingAnalysis.selectedSubCategoryId;
};

export const selectSelectedCategoryGroupId = (state: RootState): string => {
  return state.spendingAnalysis.selectedCategoryGroupId;
};

export const selectCategoryDimension = (state: RootState): CategoryDimensions => {
  return state.spendingAnalysis.categoryDimension;
};

/**
 * Gets the name of the selectedCategoryGroupId
 */
export const selectSelectedCategoryGroupName = createSelector(
  [selectCategoryData, selectSelectedCategoryGroupId],
  (categoryData, selectedCategoryGroupId): string => {
    const { data, isLoading } = categoryData;
    let selectedCategoryName = 'Name not found';
    if (data && !isLoading) {
      selectedCategoryName =
        data.categories.find((el) => el.id === selectedCategoryGroupId)?.name ??
        'Name not found';
    }
    return selectedCategoryName;
  },
);

// selectors for category selector component
/**
 *
 */
export const selectCategoryGroupOptions = createSelector(
  [selectFilteredTransactionCategoryGroups],
  (categoryGroupNamesData): FetchedData<OptionInterface<string>[]> => {
    const { data: categoryGroups } = categoryGroupNamesData;

    // if we have the category groups data, we can compile the list of options
    if (categoryGroups) {
      const options = categoryGroups.sort((a, b) => a.name.localeCompare(b.name));
      const assembledOptions = getOptionsFromValues<CategoryGroup>(
        options,
        mapCategoryValueToAllowedType,
        mapCategoryValueToId,
        mapCategoryValueToLabel,
      );
      assembledOptions.splice(0, 0, ALL_CATEGORY_GROUPS_OPTION);
      return { data: assembledOptions as OptionInterface<string>[], isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectCategoryOptions = createSelector(
  [
    selectCategoryData,
    selectSelectedCategoryGroupId,
    selectCategoryDimension,
    selectFilteredTransactionSubCategories,
  ],
  (
    categoryData,
    selectedCategoryGroupId,
    categoryDimension,
    filteredSubCategoriesData,
  ): FetchedData<OptionInterface<string>[]> => {
    // if there is no parent, we don't want any drilldown options
    if (
      categoryDimension === ALL_CATEGORIES_DIMENSION &&
      selectedCategoryGroupId === ALL_CATEGORY_GROUPS_OPTION.id
    ) {
      return { data: [], isLoading: false };
    }

    const { data: filteredSubCategories } = filteredSubCategoriesData;

    // drilldown options are the selected category's children.
    // If the category dimension is not 'all categories' then the selectedCategoryGroup is not a string
    let allPossibleSubcategories: SubCategory[] = [];

    if (
      categoryData.data &&
      !categoryData.isLoading &&
      filteredSubCategories &&
      !filteredSubCategoriesData.isLoading
    ) {
      // assert that we will always find a selected subcategory at this stage
      allPossibleSubcategories = categoryData.data.categories.find(
        (el) => el.id === selectedCategoryGroupId,
      )?.subCategories as SubCategory[];

      allPossibleSubcategories.filter((subcategory) =>
        filteredSubCategories.map((e) => e.id).includes(subcategory.id),
      );
    } else {
      return { data: [], isLoading: true };
    }

    // get names of all child categories and filter them based upon which are
    // included in the analysis
    const returnedOptions = getOptionsFromValues(
      allPossibleSubcategories,
      mapCategoryValueToAllowedType,
      mapCategoryValueToId,
      mapCategoryValueToLabel,
    ) as OptionInterface<string>[];

    returnedOptions.splice(0, 0, ALL_SUBCATEGORIES_OPTION);
    return { data: returnedOptions, isLoading: false };
  },
);
///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// /////
// SELECTORS FOR SPENDING CALCULATIONS //
///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// /////
const selectRolledUpCategorySpending = createSelector(
  [selectFilteredTransactions],
  (
    transactionsData: FetchedData<Transaction[]>,
  ): FetchedData<
    InternMap<
      MonthYear,
      InternMap<string | undefined, InternMap<string | undefined, number>>
    >
  > => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      const spendingByMonthMap = rollup(
        transactions,
        (t: Transaction[]) => totalSpendingHelper(t),
        (t: Transaction) => t.month_year,
        (t: Transaction) => t.category_group?.id,
        (t: Transaction) => t.subcategory?.id,
      );
      return { data: spendingByMonthMap, isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);

// selectors for getting spending along the lines of category and category group
const selectConstructedSpendingMap = createSelector(
  [selectRolledUpCategorySpending, selectCategoryData],
  (spendingByMonthMapData, categoryDataResponse): FetchedData<MonthlySpendingMap> => {
    const { data: spendingByMonthMap } = spendingByMonthMapData;
    const { data: categoryData } = categoryDataResponse;
    if (spendingByMonthMap && categoryData) {
      const returnedMap: MonthlySpendingMap = new Map();
      // for each month and its inner maps...
      spendingByMonthMap.forEach(
        (
          categoryGroupToInnerMap: InternMap<
            string | undefined,
            InternMap<string | undefined, number>
          >,
          month: MonthYear,
        ) => {
          returnedMap.set(month, {
            [TOTAL_MONTHLY_SPENDING_KEY]: 0,
            [CATEGORY_GROUPS_MAP_KEY]: new Map(),
          });

          // iterate over each category groupId in the month map, as well as the subCategory map
          let monthlySum = 0;
          categoryGroupToInnerMap.forEach((subCategoryToSpendingMap, categoryGroupId) => {
            // build the CategoryGroupSpendingObject for each category group
            const categoryGroupName = categoryData.idToNameMap[categoryGroupId ?? ''];
            const monthlyMap = returnedMap.get(month) ?? {}; // nevr undefined
            const currentCategoryGroupsMap = monthlyMap[CATEGORY_GROUPS_MAP_KEY];

            // initialize the object for this categorygroup Id
            currentCategoryGroupsMap.set(categoryGroupId, {
              [CATEGORY_GROUP_NAME_KEY]: categoryGroupName,
              [CATEGORY_GROUP_TOTAL_KEY]: 0,
              [SUBCATEGORY_MAP_KEY]: new Map(),
            });

            // for each inner map, we store the information in our CategoryGroupSpendingObject object,
            // and use the value to calculate the total category group's spending value
            let totalCategorySpendingValue = 0;
            subCategoryToSpendingMap.forEach(
              (subcategorySpendingValue: number, subCategoryId: string | undefined) => {
                totalCategorySpendingValue += subcategorySpendingValue;

                // set the categoryGroupsMap's subcategories for this categoryGroupId
                const subCatName = categoryData.idToNameMap[subCategoryId ?? ''];
                currentCategoryGroupsMap
                  .get(categoryGroupId)
                  [SUBCATEGORY_MAP_KEY].set(subCategoryId ?? 'undefined', {
                    [SUB_CATEGORY_SPENDING_VALUE_KEY]: subcategorySpendingValue,
                    [SUB_CATEGORY_NAME_KEY]: subCatName,
                  });
              },
            );

            // after summing, apply the totalCategorySpending value, and add it to the total for
            // the month that we are iterating over in the outer loop
            currentCategoryGroupsMap.set(categoryGroupId, {
              ...currentCategoryGroupsMap.get(categoryGroupId),
              [CATEGORY_GROUP_TOTAL_KEY]: totalCategorySpendingValue,
            });
            monthlySum += totalCategorySpendingValue;
          });

          const currentMonthData = returnedMap.get(month) ?? {}; // never undefined
          returnedMap.set(month, {
            [CATEGORY_GROUPS_MAP_KEY]: currentMonthData[CATEGORY_GROUPS_MAP_KEY],
            [TOTAL_MONTHLY_SPENDING_KEY]: monthlySum,
          });
        },
      );

      return { data: returnedMap, isLoading: false };
    }
    return { data: undefined, isLoading: false };
  },
);

export const selectSpendingDataByCategoryDimension = createSelector(
  [selectConstructedSpendingMap, selectCategoryDimension],
  (constructedSpendingMapData) => {
    const { data: constructedSpendingMap } = constructedSpendingMapData;
    if (constructedSpendingMapData) {
      switch()
    }
  },
);

///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// /////
// Selectors for Plot Component's data //
///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// /////
export const selectTooltipType = (state: RootState): tooltipType | undefined =>
  state.spendingAnalysis.plotState.tooltipType;

export const selectTooltipData = (state: RootState): TooltipData =>
  state.spendingAnalysis.plotState.tooltipData;

export const selectHighlightedBarData = (
  state: RootState,
): HighlightedBarData | undefined => state.spendingAnalysis.plotState.highlightedBarData;

export const selectShowTooltip = (state: RootState): boolean =>
  state.spendingAnalysis.plotState.showTooltip;

///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// /////
// OTHER MISC SELECTORS RELATED TO THE SPENDING BY CATEGORY ANALYSIS PLOT //
///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// ///// /////
/**
 * Gets the subset of active months that are within range of the applied date filter
 */
export const selectFilteredActiveMonths = createSelector(
  [selectAppliedDateFilter, selectActiveMonths],
  ({ startDate, endDate }, activeMonthsData): FetchedData<MonthYear[]> => {
    const { data: activeMonths } = activeMonthsData;
    if (activeMonths) {
      return {
        data: activeMonths.filter((month) => {
          // if no date boundary date defined, let all through, else apply filter predicates
          const passStart = startDate ? new Date(month) >= new Date(startDate) : true;
          const passEnd = endDate ? new Date(month) <= new Date(endDate) : true;
          return passStart && passEnd;
        }),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);
