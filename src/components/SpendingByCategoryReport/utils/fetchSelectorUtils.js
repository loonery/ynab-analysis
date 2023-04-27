import { ALL_CATEGORIES_DIMENSION, CATEGORY_GROUP_DIMENSION } from 'store/consts/consts';
import {
  selectFilteredTotalsForAllCategoryGroups,
  selectFilteredTotalsForSelectedCategoryGroup,
  selectFilteredTotalsForEachCategoryGroup,
  selectFilteredTotalsForEachCategory,
} from 'store/selectors/spendingAnalysisSelectors';

export const fetchTotalsSelector = (categoryDimension) => {
  if (categoryDimension === ALL_CATEGORIES_DIMENSION) {
    return selectFilteredTotalsForAllCategoryGroups;
  } else {
    return selectFilteredTotalsForSelectedCategoryGroup;
  }
};

// returns the selector we need based on the current category dimension
export const fetchCategoryTotalsSelector = (categoryDimension) => {
  if (categoryDimension === ALL_CATEGORIES_DIMENSION) {
    return selectFilteredTotalsForEachCategoryGroup;
  } else if (categoryDimension === CATEGORY_GROUP_DIMENSION) {
    return selectFilteredTotalsForEachCategory;
  }
};
