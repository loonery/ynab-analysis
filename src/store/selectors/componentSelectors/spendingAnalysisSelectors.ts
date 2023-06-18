import { createSelector } from '@reduxjs/toolkit';
import { InternMap, rollup } from 'd3';
import { CategoryGroup, SubCategory } from 'interfaces/Category';
import { Transaction } from 'interfaces/Transaction';
import { RootState } from 'store';
import { ALL_CATEGORIES_ITEM } from 'store/consts/consts';
import { ALL_CATEGORY_GROUPS_ITEM } from 'store/consts/consts';
import { FetchedData } from 'store/interfaces/FetchedData';
import { categoryDimensions } from 'store/interfaces/SpendingAnalysisState';
import { MonthYear } from 'store/interfaces/types/MonthYear';
import { totalSpendingHelper } from 'store/utils/selectorHelpers';

import { selectCategoryData } from '../dataSelectors/categorySelectors';
import {
  selectFilteredTransactions,
  selectFilteredTransactionCategories,
  selectFilteredTransactionCategoryGroups,
} from '../dataSelectors/transactionSliceSelectors';

/**
 * atomic selectors
 */
export const selectSelectedCategory = (state: RootState): SubCategory | string => {
  return state.spendingAnalysis.selectedCategory;
};

export const selectSelectedCategoryGroup = (state: RootState): CategoryGroup | string => {
  return state.spendingAnalysis.selectedCategoryGroup;
};

export const selectCategoryDimension = (state: RootState): categoryDimensions => {
  return state.spendingAnalysis.categoryDimension;
};

export const selectParentOfSelectedCategory = (
  state: RootState,
): CategoryGroup | string => {
  return state.spendingAnalysis.parentOfSelected;
};

// selectors for selectFilteredTransactionsByCategoryDimension
// todo - debug id matching
const selectTransactionsForCategoryGroupDimension = createSelector(
  [selectFilteredTransactions, selectSelectedCategoryGroup],
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
  [selectFilteredTransactions, selectSelectedCategory],
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
      let returnedData;
      if (categoryDimension === categoryDimensions.allCategoriesDimension) {
        returnedData = transactionsAll;
      } else if (categoryDimension === categoryDimensions.categoryGroupDimension) {
        returnedData = transactionsGroup;
      } else if (categoryDimension === categoryDimensions.singleCategoryDimension) {
        returnedData = transactionsSingle;
      }
      return { data: returnedData, isLoading: false };
    }
    return { data: undefined, isLoading: true };
  },
);

// selectors for category selector component
export const selectCategorySelectorGroupOptions = createSelector(
  [selectFilteredTransactionCategoryGroups],
  (categoryGroupNames) => {
    const options = categoryGroupNames.sort();
    options.splice(0, 0, ALL_CATEGORY_GROUPS_ITEM);
    return options;
  },
);

export const selectCategorySelectorCategoryOptions = createSelector(
  [
    selectCategoryData,
    selectSelectedCategoryGroup,
    selectCategoryDimension,
    selectFilteredTransactionCategories,
  ],
  (
    fetchedCategoryData,
    selectedCategoryGroup,
    categoryDimension,
    filteredCategoriesData,
  ): FetchedData<string[]> => {
    // if there is no selected category group, we don't want any drilldown options
    if (
      categoryDimension === categoryDimensions.allCategoriesDimension &&
      typeof selectedCategoryGroup === 'string'
    ) {
      return { data: [] as string[], isLoading: false };
    }

    // drilldown options are the selected categories' children
    const { data: categoryData } = fetchedCategoryData;
    const { data: filteredCategories } = filteredCategoriesData;
    const categoryHirearchy = categoryData?.categories;

    if (categoryHirearchy && filteredCategories) {
      const options = categoryHirearchy.find(
        (el): el is CategoryGroup => el.id === selectedCategoryGroup.id,
      );

      // get names of all child categories and filter them based upon which are
      // included in the analysis
      const returnedOptions = options?.subCategories
        .map(({ name }) => name)
        .filter((name) => filteredCategories.includes(name))
        .splice(0, 0, ALL_CATEGORIES_ITEM);
      return { data: returnedOptions, isLoading: false };
    }
    return { data: undefined, isLoading: true };
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
  [selectTransactionsForSingleCategoryDimension],
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
      case categoryDimensions.allCategoriesDimension:
        return { data: all, isLoading: false };
      case categoryDimensions.categoryGroupDimension:
        return { data: group, isLoading: false };
      case categoryDimensions.singleCategoryDimension:
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
    return { data: undefined, isLoading: false };
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
    return { data: undefined, isLoading: false };
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
      case categoryDimensions.allCategoriesDimension:
        return all;
      case categoryDimensions.categoryGroupDimension:
      case categoryDimensions.singleCategoryDimension:
        return group;
    }
  },
);

// selects the keys that will be used to represent the data in the graph
export const selectDataKeysByCategoryDimension = createSelector(
  [
    selectCategoryDimension,
    selectFilteredTransactionCategories,
    selectFilteredTransactionCategoryGroups,
  ],
  (categoryDimension, categoriesData, categoryGroupsData): FetchedData<string[]> => {
    const { data: categoryGroups } = categoryGroupsData;
    const { data: categories } = categoriesData;
    if (categoryGroups && categories) {
      if (categoryDimension === categoryDimensions.allCategoriesDimension) {
        return { data: categoryGroups.slice(1), isLoading: false };
      }
      return { data: categories, isLoading: true };
    }
    return { data: undefined, isLoading: true };
  },
);

/**
 * Selectors for Plot Component's data
 */
export const selectTooltipType = (state: any): any =>
  state.spendingAnalysis.plotState.tooltipType;
export const selectTooltipData = (state: any): any =>
  state.spendingAnalysis.plotState.tooltipData;
export const selectHighlightedBarData = (state: any): any =>
  state.spendingAnalysis.plotState.highlightedBarData;
export const selectShowTooltip = (state: any): any =>
  state.spendingAnalysis.plotState.showTooltip;
