import { createSelector } from '@reduxjs/toolkit';
import { rollup, sum } from 'd3';
import {
  ALL_CATEGORIES_DIMENSION,
  ALL_CATEGORIES_ITEM,
  ALL_CATEGORY_GROUPS_ITEM,
  CATEGORY_GROUP_DIMENSION,
  SINGLE_CATEGORY_DIMENSION,
} from 'store/consts/consts';

import { selectAllCategories } from './categorySelectors';
import {
  selectFilteredTransactions,
  selectFilteredTransactionCategories,
  selectFilteredTransactionCategoryGroups,
} from './transactionSliceSelectors';

// atomic selectors
export const selectSelectedCategory = (state) => {
  return state.spendingAnalysis.selectedCategory;
};

export const selectSelectedCategoryGroup = (state) => {
  return state.spendingAnalysis.selectedCategoryGroup;
};

export const selectCategoryDimension = (state) => {
  return state.spendingAnalysis.categoryDimension;
};

export const selectParentOfSelectedCategory = (state) => {
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
    selectAllCategories,
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
    const returnedOptions = options.categories
      .map(({ name }) => name)
      .filter((name) => filteredCategories.includes(name));

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
      (t) => Math.abs(sum(t, (t) => t.amount)).toFixed(2),
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
      (t) => Math.abs(sum(t, (t) => t.amount)).toFixed(2),
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
      (t) => Math.abs(sum(t, (t) => t.amount)).toFixed(2),
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
      (t) => Math.abs(sum(t, (t) => t.amount)).toFixed(2),
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
    if (categoryDimension === ALL_CATEGORIES_DIMENSION)
      return categoryGroups.map((e) => {
        return { [e]: 0 };
      });
    return categories.map((e) => {
      return { [e]: 0 };
    });
  },
);
