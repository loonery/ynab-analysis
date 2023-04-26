import { ALL_CATEGORIES_DIMENSION, CATEGORY_GROUP_DIMENSION } from 'store/consts/consts';
import {
  selectFilteredTotalsByMonth,
  selectFilteredCategoryGroupTotalsByMonth,
  selectFilteredCategoryTotalsByMonth,
} from 'store/selectors/spendingAnalysisSelectors';

export const fetchTotalsSelector = (categoryDimension) => {
  if (categoryDimension === ALL_CATEGORIES_DIMENSION) {
    return selectFilteredTotalsByMonth;
  } else {
    return selectFilteredCategoryGroupTotalsByMonth;
  }
};

// returns the selector we need based on the current category dimension
export const fetchCategoryTotalsSelector = (categoryDimension) => {
  if (categoryDimension === ALL_CATEGORIES_DIMENSION) {
    return selectFilteredCategoryGroupTotalsByMonth;
  } else if (categoryDimension === CATEGORY_GROUP_DIMENSION) {
    return selectFilteredCategoryTotalsByMonth;
  }
};
