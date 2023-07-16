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
  ALL_CATEGORY_GROUPS_OPTION,
  ALL_SUBCATEGORIES_OPTION,
} from 'store/consts/consts';
import { FetchedData } from 'store/interfaces/FetchedData';
import {
  HighlightedBarData,
  TooltipData,
  CategoryDimensions,
  tooltipType,
} from 'store/interfaces/SpendingAnalysisState';
import { MonthYear } from 'store/interfaces/types/MonthYear';
import { totalSpendingHelper } from 'store/utils/selectorHelpers';

import { selectCategoryData } from '../dataSelectors/categorySelectors';
import {
  selectFilteredTransactions,
  selectFilteredTransactionSubCategories,
  selectFilteredTransactionCategoryGroups,
  selectFilteredTransactionDates,
} from '../dataSelectors/transactionSliceSelectors';

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

// selectors for selectFilteredTransactionsByCategoryDimension
const selectTransactionsForCategoryGroupDimension = createSelector(
  [selectFilteredTransactions, selectSelectedCategoryGroupId],
  (filteredTransactionsData, selectedCategoryGroup): FetchedData<Transaction[]> => {
    const { data: filteredTransactions } = filteredTransactionsData;
    if (filteredTransactions) {
      return {
        data: filteredTransactions.filter(
          (transaction) => transaction.category_group?.id === selectedCategoryGroup,
        ),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

// todo - debug id matching
const selectTransactionsForSingleCategoryDimension = createSelector(
  [selectFilteredTransactions, selectSelectedCategoryId],
  (filteredTransactionsData, selectedCategory): FetchedData<Transaction[]> => {
    const { data: filteredTransactions } = filteredTransactionsData;
    if (filteredTransactions) {
      return {
        data: filteredTransactions.filter(
          (transaction) => transaction.subcategory?.id === selectedCategory,
        ),
        isLoading: false,
      };
    }
    return { data: undefined, isLoading: true };
  },
);

const selectTransactionsForAllCategoryDimension = createSelector(
  [selectFilteredTransactions],
  (filteredTransactionsData): FetchedData<Transaction[]> => {
    const { data: filteredTransactions } = filteredTransactionsData;
    if (filteredTransactions) {
      return { data: filteredTransactions, isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectFilteredTransactionsByCategoryDimension = createSelector(
  [
    selectCategoryDimension,
    selectTransactionsForAllCategoryDimension,
    selectTransactionsForCategoryGroupDimension,
    selectTransactionsForSingleCategoryDimension,
  ],
  (
    categoryDimension,
    transactionsAllData,
    transactionsGroupData,
    transactionsSingleData,
  ): FetchedData<Transaction[]> => {
    const { data: transactionsAll } = transactionsAllData;
    const { data: transactionsGroup } = transactionsGroupData;
    const { data: transactionsSingle } = transactionsSingleData;
    if (transactionsAll && transactionsGroup && transactionsSingle) {
      let returnedData: Transaction[] = [];
      if (categoryDimension === CategoryDimensions.allCategoriesDimension) {
        returnedData = transactionsAll;
      } else if (categoryDimension === CategoryDimensions.categoryGroupDimension) {
        returnedData = transactionsGroup;
      } else if (categoryDimension === CategoryDimensions.singleCategoryDimension) {
        returnedData = transactionsSingle;
      }
      return { data: returnedData, isLoading: false };
    }
    return { data: undefined, isLoading: true };
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
      categoryDimension === CategoryDimensions.allCategoriesDimension &&
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

// selectors for getting spending along the lines of category and category group
const selectFilteredTotalsForAllCategoryDimension = createSelector(
  [selectTransactionsForAllCategoryDimension],
  (
    transactionsData,
  ): FetchedData<InternMap<MonthYear, InternMap<string | undefined, string>>> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      const spendingByMonthMap = rollup(
        transactions,
        (t: Transaction[]) => totalSpendingHelper(t),
        (t: Transaction) => t.month_year,
        (t: Transaction) => t.category_group?.name,
      );
      return { data: spendingByMonthMap, isLoading: true };
    }
    return { data: undefined, isLoading: true };
  },
);

const selectFilteredTotalsForCategoryGroupDimension = createSelector(
  [selectTransactionsForCategoryGroupDimension],
  (
    transactionsData,
  ): FetchedData<InternMap<MonthYear, InternMap<string | undefined, string>>> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      const spendingByMonthMap = rollup(
        transactions,
        (t: Transaction[]) => totalSpendingHelper(t),
        (t: Transaction) => t.month_year,
        (t: Transaction) => t.subcategory?.name,
      );
      return { data: spendingByMonthMap, isLoading: true };
    }
    return { data: undefined, isLoading: true };
  },
);

const selectFilteredTotalsForSingleCategoryDimension = createSelector(
  [selectTransactionsForSingleCategoryDimension, selectFilteredTransactionDates],
  (
    transactionsData,
    filteredTransactionDatesData,
  ): FetchedData<InternMap<MonthYear, InternMap<string | undefined, string>>> => {
    const { data: transactions } = transactionsData;
    const { data: filteredTransactionDates } = filteredTransactionDatesData;
    if (transactions && filteredTransactionDates) {
      // get the active dates for the transactions we are currently looking at
      const spendingByMonthMap = rollup(
        transactions,
        (t: Transaction[]) => totalSpendingHelper(t),
        (t: Transaction) => t.month_year,
        (t: Transaction) => t.subcategory?.name,
      );
      return { data: spendingByMonthMap, isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectCategorySpendingDataByDimension = createSelector(
  [
    selectCategoryDimension,
    selectFilteredTotalsForAllCategoryDimension,
    selectFilteredTotalsForCategoryGroupDimension,
    selectFilteredTotalsForSingleCategoryDimension,
  ],
  (
    categoryDimension,
    TotalsForAllCategoryDimension,
    TotalsForCategoryGroupDimension,
    TotalsForSingleCategoryDimension,
  ): FetchedData<InternMap<MonthYear, InternMap<string | undefined, string>>> => {
    const { data: all } = TotalsForAllCategoryDimension;
    const { data: group } = TotalsForCategoryGroupDimension;
    const { data: single } = TotalsForSingleCategoryDimension;

    switch (categoryDimension) {
      case CategoryDimensions.allCategoriesDimension:
        return { data: all, isLoading: false };
      case CategoryDimensions.categoryGroupDimension:
        return { data: group, isLoading: false };
      case CategoryDimensions.singleCategoryDimension:
        return { data: single, isLoading: false };
      default:
        return { data: undefined, isLoading: true };
    }
  },
);

// selectors for getting total spending
const selectFilteredTotalsForAllCategoryGroups = createSelector(
  [selectFilteredTransactions],
  (transactionsData): FetchedData<InternMap<MonthYear, string>> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      const spendingByMonthMap = rollup(
        transactions,
        (t: Transaction[]) => totalSpendingHelper(t),
        (t: Transaction) => t.month_year,
      );
      return { data: spendingByMonthMap, isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);

/**
 * todo Should factor some stuff out - other than the data that this selector is being fed, it is
 * exactly the same as the one above
 */
const selectFilteredTotalsForSelectedCategoryGroup = createSelector(
  [selectTransactionsForCategoryGroupDimension],
  (transactionsData): FetchedData<InternMap<MonthYear, string>> => {
    const { data: transactions } = transactionsData;
    if (transactions) {
      const spendingByMonthMap = rollup(
        transactions,
        (t: Transaction[]) => totalSpendingHelper(t),
        (t: Transaction) => t.month_year,
      );
      return { data: spendingByMonthMap, isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);

export const selectTotalSpendingDataByDimension = createSelector(
  [
    selectCategoryDimension,
    selectFilteredTotalsForAllCategoryGroups,
    selectFilteredTotalsForSelectedCategoryGroup,
  ],
  (categoryDimension, all, group): FetchedData<InternMap<MonthYear, string>> => {
    switch (categoryDimension) {
      case CategoryDimensions.allCategoriesDimension:
        return all;
      case CategoryDimensions.categoryGroupDimension:
      case CategoryDimensions.singleCategoryDimension:
        return group;
    }
  },
);

// selects the keys that will be used to represent the data in the graph
export const selectDataKeysByCategoryDimension = createSelector(
  [
    selectCategoryDimension,
    selectFilteredTransactionSubCategories,
    selectFilteredTransactionCategoryGroups,
  ],
  (categoryDimension, categoriesData, categoryGroupsData): FetchedData<string[]> => {
    const { data: categoryGroups } = categoryGroupsData;
    const { data: subCategories } = categoriesData;
    if (categoryGroups && subCategories) {
      if (categoryDimension === CategoryDimensions.allCategoriesDimension) {
        // todo - maybe use some constant here to take out the 'all categories' name
        const dataKeys = categoryGroups.map((e) => e.name);
        return { data: dataKeys, isLoading: false };
      }
      const dataKeys = subCategories.map((e) => e.name);
      return { data: dataKeys, isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);

/**
 * Selectors for Plot Component's data
 */
export const selectTooltipType = (state: RootState): tooltipType | undefined =>
  state.spendingAnalysis.plotState.tooltipType;

export const selectTooltipData = (state: RootState): TooltipData =>
  state.spendingAnalysis.plotState.tooltipData;

export const selectHighlightedBarData = (
  state: RootState,
): HighlightedBarData | undefined => state.spendingAnalysis.plotState.highlightedBarData;

export const selectShowTooltip = (state: RootState): boolean =>
  state.spendingAnalysis.plotState.showTooltip;
