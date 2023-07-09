import React from 'react';

import { useDispatch } from 'react-redux';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import Select from 'libs/reuse/elements/form-controls/components/Select';
import {
  CATEGORY_GROUP_DIMENSION,
  ALL_CATEGORIES_DIMENSION,
  NO_PARENT,
  SINGLE_CATEGORY_DIMENSION,
  ALL_CATEGORY_GROUPS_OPTION,
  ALL_SUBCATEGORIES_OPTION,
} from 'store/consts/consts';
import {
  setCategoryDimension,
  setSelectedCategory,
  setParentOfSelected,
  setSelectedCategoryGroup,
} from 'store/slices/spendingAnalysisSlice';

import { CATEGORY_GROUP_SELECT_ID, SUB_CATEGORY_SELECT_ID } from '../consts/consts';

import { useCategoryData } from './hooks/useCategoryData';

// eslint-disable-next-line
const CategorySelector = () => {
  const dispatch = useDispatch();

  const {
    selectedSubCategoryId,
    selectedCategoryGroupId,
    categoryGroupOptions,
    categoryDrilldownOptions,
    isLoading,
  } = useCategoryData();

  const selectCategoryGroup = (e) => {
    const selected = e.target.value;
    dispatch(setSelectedCategoryGroup(selected));
    dispatch(setParentOfSelected(NO_PARENT));

    // if we want to see all category groups
    if (selected === ALL_CATEGORY_GROUPS_OPTION.id) {
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
    if (selected === ALL_SUBCATEGORIES_OPTION.id) {
      dispatch(setParentOfSelected(NO_PARENT));
      dispatch(setCategoryDimension(CATEGORY_GROUP_DIMENSION));

      // if we're drilling down to look at 1 subcategory of a category group
    } else {
      dispatch(setParentOfSelected(selectedCategoryGroupId));
      dispatch(setCategoryDimension(SINGLE_CATEGORY_DIMENSION));
    }
  };

  return (
    <FlexContainer gap={'10px'}>
      <Select
        id={CATEGORY_GROUP_SELECT_ID}
        options={categoryGroupOptions}
        selectLabel={'Category Group'}
        value={selectedCategoryGroupId}
        isFloatingSelect={true}
        onChange={selectCategoryGroup}
      />
      {categoryDrilldownOptions.length > 0 && (
        <Select
          id={SUB_CATEGORY_SELECT_ID}
          options={categoryDrilldownOptions}
          selectLabel={'Category'}
          value={selectedSubCategoryId}
          isFloatingSelect={true}
          onChange={selectCategory}
        />
      )}
    </FlexContainer>
  );
};
export default CategorySelector;
