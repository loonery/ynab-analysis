import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import FloatingSelect from 'libs/reuse/elements/form-controls/components/FloatingSelect';
import Select from 'libs/reuse/elements/form-controls/components/Select';
import { getOptionsFromValues } from 'libs/utils/utils';
import {
  CATEGORY_GROUP_DIMENSION,
  ALL_CATEGORIES_DIMENSION,
  ALL_CATEGORIES_ITEM,
  NO_PARENT,
  ALL_CATEGORY_GROUPS_ITEM,
  SINGLE_CATEGORY_DIMENSION,
} from 'store/consts/consts';
import {
  setCategoryDimension,
  setSelectedCategory,
  setParentOfSelected,
  setSelectedCategoryGroup,
} from 'store/slices/spendingAnalysisSlice';

import { useCategoryData } from './hooks/useCategoryData';

// eslint-disable-next-line
const CategorySelector = () => {
  const dispatch = useDispatch();

  const {
    categoryGroupOptions,
    selectedCategoryGroup,
    categoryDrilldownOptions,
    selectedCategory,
    isLoading,
  } = useCategoryData();

  const selectCategoryGroup = (e) => {
    const selected = e.target.value;
    dispatch(setSelectedCategoryGroup(selected));
    dispatch(setParentOfSelected(NO_PARENT));

    // if we want to see all category groups
    if (selected === ALL_CATEGORY_GROUPS_ITEM) {
      dispatch(setCategoryDimension(ALL_CATEGORIES_DIMENSION));
      // if we're starting to drill down to look at all subcategories of a category group
    } else {
      dispatch(setCategoryDimension(CATEGORY_GROUP_DIMENSION));
    }
  };

  const selectCategory = (e) => {
    const selected = e.target.value;
    dispatch(setSelectedCategory(selected));

    // if we're drilling down to look at all subcategories of a category group
    if (selected === ALL_CATEGORIES_ITEM) {
      dispatch(setParentOfSelected(NO_PARENT));
      dispatch(setCategoryDimension(CATEGORY_GROUP_DIMENSION));

      // if we're drilling down to look at 1 subcategory of a category group
    } else {
      dispatch(setParentOfSelected(selectedCategoryGroup));
      dispatch(setCategoryDimension(SINGLE_CATEGORY_DIMENSION));
    }
  };

  return (
    <FlexContainer gap={'10px'}>
      <Select
        options={getOptionsFromValues(categoryGroupOptions)}
        selectLabel={'Category Group'}
        value={selectedCategoryGroup}
        isFloatingSelect={true}
        onChange={selectCategoryGroup}
      />
      {categoryDrilldownOptions.length > 0 && (
        <Select
          options={categoryDrilldownOptions}
          selectLabel={'Category'}
          value={selectedCategory}
          isFloatingSelect={true}
          onChange={selectCategory}
        />
      )}
    </FlexContainer>
  );
};
export default CategorySelector;