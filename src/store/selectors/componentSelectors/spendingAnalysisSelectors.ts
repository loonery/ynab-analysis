import { createSelector } from '@reduxjs/toolkit';
import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import {
  MONTH_DATA_KEY_NAME,
  TOTAL_DATA_KEY_NAME,
  UNDEFINED_AMOUNT_VALUE,
} from 'components/reports/SpendingByCategoryReport/consts/consts';
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
  CATEGORY_GROUP_DIMENSION,
  SINGLE_CATEGORY_DIMENSION,
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
export const selectConstructedSpendingMap = createSelector(
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

export const selectSpendingCharyDataByCategoryDimension = createSelector(
  [
    selectConstructedSpendingMap,
    selectCategoryDimension,
    selectFilteredActiveMonths,
    selectSelectedCategoryGroupId,
    selectSelectedCategoryId,
  ],
  (
    constructedSpendingMapData,
    categoryDimension,
    activeMonthsData,
    selectedCategoryGroupId,
    selectedCategoryId,
  ): FetchedData<SpendingChartData[]> => {
    const { data: constructedSpendingMap } = constructedSpendingMapData;
    const { data: activeMonths } = activeMonthsData;

    if (constructedSpendingMap && activeMonths) {
      const spendingChartData: SpendingChartData[] = [];

      switch (categoryDimension) {
        ////////////////////////////////////////////////////////
        case ALL_CATEGORIES_DIMENSION:
          activeMonths.forEach((month: MonthYear) => {
            const monthlySpendingData = constructedSpendingMap.get(month);

            const monthlyCategorySpendingData = monthlySpendingData?.[
              CATEGORY_GROUPS_MAP_KEY
            ] as Map<string, CategoryGroupSpendingData>;

            const total =
              monthlySpendingData?.[TOTAL_MONTHLY_SPENDING_KEY] ?? UNDEFINED_AMOUNT_VALUE;

            // initialize the data object with the total and the month
            const monthlySpendingDataObject: SpendingChartData = {
              [MONTH_DATA_KEY_NAME]: month,
              [TOTAL_DATA_KEY_NAME]: -total,
            };

            // loop over each entry in the map for category group spending and apply the
            // data to the monthlySpendingDataObject
            monthlyCategorySpendingData?.forEach(
              (categoryGroupSpendingData: CategoryGroupSpendingData, categoryGroupId) => {
                monthlySpendingDataObject[categoryGroupId] =
                  -categoryGroupSpendingData[CATEGORY_GROUP_TOTAL_KEY];
              },
            );
            spendingChartData.push(monthlySpendingDataObject);
          });
          break;
        ////////////////////////////////////////////////////////
        case CATEGORY_GROUP_DIMENSION:
          activeMonths.forEach((month: MonthYear) => {
            const monthlySpendingData = constructedSpendingMap.get(month);

            const monthlyCategorySpendingData = monthlySpendingData?.[
              CATEGORY_GROUPS_MAP_KEY
            ] as Map<string, CategoryGroupSpendingData>;

            const monthlySpendingMap = monthlyCategorySpendingData.get(
              selectedCategoryGroupId,
            ) as CategoryGroupSpendingData;

            // if no data for the selectedCategoryGroupId, create an empty map
            const subCategorySpendingMap = monthlySpendingMap
              ? monthlySpendingMap[SUBCATEGORY_MAP_KEY]
              : new Map();

            const total =
              constructedSpendingMap
                .get(month)
                ?.[CATEGORY_GROUPS_MAP_KEY]?.get(selectedCategoryGroupId)?.[
                CATEGORY_GROUP_TOTAL_KEY
              ] ?? UNDEFINED_AMOUNT_VALUE;

            // initialize the data object with the total for the category group and the month
            const monthlySpendingDataObject: SpendingChartData = {
              [MONTH_DATA_KEY_NAME]: month,
              [TOTAL_DATA_KEY_NAME]: -total,
            };

            // if there's no spending data for this category, we skip adding the subcategories
            if (subCategorySpendingMap) {
              subCategorySpendingMap?.forEach(
                (subCategorySpendingData: SubCategorySpendingData, subCategoryId) => {
                  monthlySpendingDataObject[subCategoryId] =
                    -subCategorySpendingData[SUB_CATEGORY_SPENDING_VALUE_KEY];
                },
              );
            }
            spendingChartData.push(monthlySpendingDataObject);
          });
          break;
        ////////////////////////////////////////////////////////
        case SINGLE_CATEGORY_DIMENSION:
          activeMonths.forEach((month: MonthYear) => {
            const monthlySpendingData = constructedSpendingMap.get(month);

            const monthlyCategorySpendingData = monthlySpendingData?.[
              CATEGORY_GROUPS_MAP_KEY
            ] as Map<string, CategoryGroupSpendingData>;

            const monthlySpendingMap = monthlyCategorySpendingData.get(
              selectedCategoryGroupId,
            ) as CategoryGroupSpendingData;

            // if no data for the selectedCategoryGroupId, create an empty map
            const subCategorySpendingMap = monthlySpendingMap
              ? monthlySpendingMap[SUBCATEGORY_MAP_KEY]
              : new Map();

            const subCategorySpendingData: SubCategorySpendingData =
              subCategorySpendingMap.get(selectedCategoryId);

            // initialize the data object with the total for the category group and the month
            const total =
              constructedSpendingMap
                .get(month)
                ?.[CATEGORY_GROUPS_MAP_KEY]?.get(selectedCategoryGroupId)?.[
                CATEGORY_GROUP_TOTAL_KEY
              ] ?? UNDEFINED_AMOUNT_VALUE;

            const monthlySpendingDataObject: SpendingChartData = {
              [MONTH_DATA_KEY_NAME]: month,
              [TOTAL_DATA_KEY_NAME]: -total,
            };

            // if there's no spending data for this category, we skip adding the subcategories
            if (subCategorySpendingData) {
              monthlySpendingDataObject[selectedCategoryId] =
                -subCategorySpendingData[SUB_CATEGORY_SPENDING_VALUE_KEY];
            }
            spendingChartData.push(monthlySpendingDataObject);
          });
      }
      return { data: spendingChartData, isLoading: false };
    }
    return { data: undefined, isLoading: true };
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
