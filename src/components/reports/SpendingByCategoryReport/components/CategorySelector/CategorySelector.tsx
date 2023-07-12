import React from 'react';

import { useDispatch } from 'react-redux';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import Select from 'libs/reuse/elements/form-controls/components/Select';
import {
  CATEGORY_GROUP_DIMENSION,
  ALL_CATEGORIES_DIMENSION,
  SINGLE_CATEGORY_DIMENSION,
  ALL_CATEGORY_GROUPS_OPTION,
  ALL_SUBCATEGORIES_OPTION,
} from 'store/consts/consts';
import {
  setCategoryDimension,
  setSelectedCategory,
  setSelectedCategoryGroup,
} from 'store/slices/spendingAnalysisSlice';

import { GAP_BETWEEN_CATEGORY_SELECTORS } from '../../consts/consts';
import {
  CATEGORY_GROUP_SELECT_ID,
  CATEGORY_GROUP_SELECT_LABEL,
  SUB_CATEGORY_GROUP_SELECT_LABEL,
  SUB_CATEGORY_SELECT_ID,
} from '../consts/consts';

import { useCategoryData } from './hooks/useCategoryData';

// eslint-disable-next-line
const CategorySelector = () => {
  const dispatch = useDispatch();

  const {
    selectedSubCategoryId,
    selectedCategoryGroupId,
    categoryGroupOptions,
    categoryDrilldownOptions,
  } = useCategoryData();

  const selectCategoryGroup = (newCategoryGroupId: string): void => {
    dispatch(setSelectedCategoryGroup({ newCategoryGroupId }));

    // if we want to see all category groups
    if (newCategoryGroupId === ALL_CATEGORY_GROUPS_OPTION.id) {
      dispatch(setCategoryDimension(ALL_CATEGORIES_DIMENSION));
    } else {
      // otherwise we're starting to drill down to look at all subcategories of a category group
      dispatch(setCategoryDimension(CATEGORY_GROUP_DIMENSION));
    }
  };

  const selectCategory = (newSubCategoryId: string): void => {
    dispatch(setSelectedCategory({ newSubCategoryId }));

    // if we're drilling down to look at all subcategories of a category group
    if (newSubCategoryId === ALL_SUBCATEGORIES_OPTION.id) {
      dispatch(setCategoryDimension(CATEGORY_GROUP_DIMENSION));

      // if we're drilling down to look at 1 subcategory of a category group
    } else {
      dispatch(setCategoryDimension(SINGLE_CATEGORY_DIMENSION));
    }
  };

  return (
    <FlexContainer gap={GAP_BETWEEN_CATEGORY_SELECTORS}>
      <Select
        id={CATEGORY_GROUP_SELECT_ID}
        options={categoryGroupOptions}
        selectLabel={CATEGORY_GROUP_SELECT_LABEL}
        value={selectedCategoryGroupId}
        isFloatingSelect={true}
        onChange={selectCategoryGroup}
      />
      {categoryDrilldownOptions.length > 0 && (
        <Select
          id={SUB_CATEGORY_SELECT_ID}
          options={categoryDrilldownOptions}
          selectLabel={SUB_CATEGORY_GROUP_SELECT_LABEL}
          value={selectedSubCategoryId}
          isFloatingSelect={true}
          onChange={selectCategory}
        />
      )}
    </FlexContainer>
  );
};
export default CategorySelector;
