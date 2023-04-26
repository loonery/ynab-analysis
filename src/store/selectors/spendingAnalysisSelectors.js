import { createSelector } from '@reduxjs/toolkit';
import { InternMap, rollup, sum } from 'd3';
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

export const selectFilteredTransactionsByCategoryItem = createSelector(
  [
    selectFilteredTransactions,
    selectCategoryDimension,
    selectSelectedCategory,
    selectSelectedCategoryGroup,
  ],
  (transactions, categoryDimension, selectedCategory, selectedCategoryGroup) => {
    // if the selected category item is 'all', return everything
    if (categoryDimension === ALL_CATEGORIES_DIMENSION) {
      return transactions;
    } else if (categoryDimension === CATEGORY_GROUP_DIMENSION) {
      return transactions.filter(
        (transaction) => transaction.category_group_name === selectedCategoryGroup,
      );
    } else if (categoryDimension === SINGLE_CATEGORY_DIMENSION) {
      return transactions.filter(
        (transaction) => transaction.category_name === selectedCategory,
      );
    }
  },
);

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
    selectParentOfSelectedCategory,
    selectCategoryDimension,
    selectFilteredTransactionCategories,
  ],
  (
    categoryHirearchy,
    selectedCategoryGroup,
    selectedCategoryParent,
    categoryDimension,
    filteredCategories,
  ) => {
    // if there is no parent, we don't want any drilldown options
    let options;
    if (categoryDimension === ALL_CATEGORIES_DIMENSION) {
      return [];
      // drilldown options are the selected categories children
    } else if (categoryDimension === CATEGORY_GROUP_DIMENSION) {
      options = categoryHirearchy.find((el) => el.name === selectedCategoryGroup);
      // drilldown options are the selected category's siblings
    } else if (categoryDimension === SINGLE_CATEGORY_DIMENSION) {
      options = categoryHirearchy.find((el) => el.name === selectedCategoryParent);
    }

    const returnedOptions = options.categories
      .map(({ name }) => name)
      .filter((name) => filteredCategories.includes(name));

    returnedOptions.splice(0, 0, ALL_CATEGORIES_ITEM);
    return returnedOptions;
  },
);

export const selectFilteredTotalsByMonth = createSelector(
  [selectFilteredTransactions],
  (transactions) => {
    const spendingByMonthMap = rollup(
      transactions,
      (t) => sum(t, (t) => t.amount),
      (t) => t.month_year,
    );
    return spendingByMonthMap;
  },
);

export const selectFilteredCategoryGroupTotalsByMonth = createSelector(
  [selectFilteredTransactions],
  (transactions) => {
    const spendingByMonthMap = rollup(
      transactions,
      (t) => sum(t, (t) => t.amount),
      (t) => t.category_group_name,
      (t) => t.month_year,
    );
    return spendingByMonthMap;
  },
);

export const selectFilteredCategoryTotalsByMonth = createSelector(
  [selectFilteredTransactions, selectSelectedCategory],
  (transactions) => {
    const spendingByMonthMap = rollup(
      transactions,
      (t) => sum(t, (t) => t.amount),
      (t) => t.category_name,
      (t) => t.month_year,
    );
    return spendingByMonthMap;
  },
);
