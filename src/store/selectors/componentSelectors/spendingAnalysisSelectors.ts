import { createSelector } from '@reduxjs/toolkit';
import { rollup, sum } from 'd3';
import { CategoryGroup, SubCategory } from 'interfaces/Category';
import { RootState } from 'store';
import {
  ALL_CATEGORIES_DIMENSION,
  ALL_CATEGORIES_ITEM,
  ALL_CATEGORY_GROUPS_ITEM,
  CATEGORY_GROUP_DIMENSION,
  SINGLE_CATEGORY_DIMENSION,
} from 'store/consts/consts';
import { categoryDimensions } from 'store/interfaces/SpendingAnalysisState';
import { totalSpendingHelper } from 'store/utils/selectorHelpers';

import { selectCategoryData } from '../dataSelectors/categorySelectors';
import {
  selectFilteredTransactions,
  selectFilteredTransactionCategories,
  selectFilteredTransactionCategoryGroups,
} from '../dataSelectors/transactionSliceSelectors';

// atomic selectors
export const selectSelectedCategory = (state: RootState): SubCategory | string => {
  return state.spendingAnalysis.selectedCategory;
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
const selectTransactionsForCategoryGroupDimension = createSelector(
  [selectFilteredTransactions, selectSelectedCategoryGroup],
  (filteredTransactions, selectedCategoryGroup) => {
    return filteredTransactions.filter(
      (transaction) => transaction.category_group_name === selectedCategoryGroup,
    );
  },
);

const selectTransactionsForSingleCategoryDimension = createSelector(
  [selectFilteredTransactions, selectSelectedCategory],
  (filteredTransactions, selectedCategory) => {
    return filteredTransactions.filter(
      (transaction) => transaction.category_name === selectedCategory,
    );
  },
);

const selectTransactionsForAllCategoryDimension = createSelector(
  [selectFilteredTransactions],
  (filteredTransactions) => {
    return filteredTransactions;
  },
);

export const selectFilteredTransactionsByCategoryDimension = createSelector(
  [
    selectCategoryDimension,
    selectTransactionsForAllCategoryDimension,
    selectTransactionsForCategoryGroupDimension,
    selectTransactionsForSingleCategoryDimension,
  ],
  (categoryDimension, transactionsAll, transactionsGroup, transactionsSingle) => {
    if (categoryDimension === ALL_CATEGORIES_DIMENSION) {
      return transactionsAll;
    } else if (categoryDimension === CATEGORY_GROUP_DIMENSION) {
      return transactionsGroup;
    } else if (categoryDimension === SINGLE_CATEGORY_DIMENSION) {
      return transactionsSingle;
    }
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
  (categoryHirearchy, selectedCategoryGroup, categoryDimension, filteredCategories) => {
    // if there is no parent, we don't want any drilldown options
    if (categoryDimension === ALL_CATEGORIES_DIMENSION) return [];

    // drilldown options are the selected categories children
    const options = categoryHirearchy.find((el) => el.name === selectedCategoryGroup);

    // get names of all child categories and filter them based upon which are
    // included in the analysis
    const returnedOptions = options
      ? options.categories
          .map(({ name }) => name)
          .filter((name) => filteredCategories.includes(name))
      : [];

    returnedOptions.splice(0, 0, ALL_CATEGORIES_ITEM);
    return returnedOptions;
  },
);

// selectors for getting spending along the lines of category and category group
const selectFilteredTotalsForAllCategoryDimension = createSelector(
  [selectTransactionsForAllCategoryDimension],
  (transactions) => {
    const spendingByMonthMap = rollup(
      transactions,
      (t) => totalSpendingHelper(t),
      (t) => t.month_year,
      (t) => t.category_group_name,
    );
    return spendingByMonthMap;
  },
);

const selectFilteredTotalsForCategoryGroupDimension = createSelector(
  [selectTransactionsForCategoryGroupDimension],
  (transactions) => {
    const spendingByMonthMap = rollup(
      transactions,
      (t) => totalSpendingHelper(t),
      (t) => t.month_year,
      (t) => t.category_name,
    );
    return spendingByMonthMap;
  },
);

const selectFilteredTotalsForSingleCategoryDimension = createSelector(
  [selectTransactionsForSingleCategoryDimension],
  (transactions) => {
    const spendingByMonthMap = rollup(
      transactions,
      (t) => sum(t, (t) => t.amount),
      (t) => t.month_year,
      (t) => t.category_name,
    );
    return spendingByMonthMap;
  },
);

export const selectCategorySpendingDataByDimension = createSelector(
  [
    selectCategoryDimension,
    selectFilteredTotalsForAllCategoryDimension,
    selectFilteredTotalsForCategoryGroupDimension,
    selectFilteredTotalsForSingleCategoryDimension,
  ],
  (categoryDimension, all, group, single) => {
    switch (categoryDimension) {
      case ALL_CATEGORIES_DIMENSION:
        return all;
      case CATEGORY_GROUP_DIMENSION:
        return group;
      case SINGLE_CATEGORY_DIMENSION:
        return single;
    }
    return undefined;
  },
);

// selectors for getting total spending
const selectFilteredTotalsForAllCategoryGroups = createSelector(
  [selectFilteredTransactions],
  (transactions) => {
    const spendingByMonthMap = rollup(
      transactions,
      (t) => totalSpendingHelper(t),
      (t) => t.month_year,
    );
    return spendingByMonthMap;
  },
);

const selectFilteredTotalsForSelectedCategoryGroup = createSelector(
  [selectTransactionsForCategoryGroupDimension],
  (transactions) => {
    const spendingByMonthMap = rollup(
      transactions,
      (t) => totalSpendingHelper(t),
      (t) => t.month_year,
    );
    return spendingByMonthMap;
  },
);

export const selectTotalSpendingDataByDimension = createSelector(
  [
    selectCategoryDimension,
    selectFilteredTotalsForAllCategoryGroups,
    selectFilteredTotalsForSelectedCategoryGroup,
  ],
  (categoryDimension, all, group) => {
    switch (categoryDimension) {
      case ALL_CATEGORIES_DIMENSION:
        return all;
      case CATEGORY_GROUP_DIMENSION:
        return group;
      case SINGLE_CATEGORY_DIMENSION:
        return group;
    }
    return undefined;
  },
);

// selects the keys that will be used to represent the data in the graph
export const selectDataKeysByCategoryDimension = createSelector(
  [
    selectCategoryDimension,
    selectFilteredTransactionCategories,
    selectFilteredTransactionCategoryGroups,
  ],
  (categoryDimension, categories, categoryGroups) => {
    if (categoryDimension === ALL_CATEGORIES_DIMENSION) return categoryGroups.slice(1);
    return categories;
  },
);

/**
 * Selectors for Plot Component's data
 */
export const selectTooltipType = (state) => state.spendingAnalysis.plotState.tooltipType;
export const selectTooltipData = (state) => state.spendingAnalysis.plotState.tooltipData;
export const selectHighlightedBarData = (state) =>
  state.spendingAnalysis.plotState.highlightedBarData;
export const selectShowTooltip = (state) => state.spendingAnalysis.plotState.showTooltip;
