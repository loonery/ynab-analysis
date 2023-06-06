import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import FloatingSelect from 'libs/reuse/elements/FloatingSelect';
import {
  CATEGORY_GROUP_DIMENSION,
  ALL_CATEGORIES_DIMENSION,
  ALL_CATEGORIES_ITEM,
  NO_PARENT,
  ALL_CATEGORY_GROUPS_ITEM,
  SINGLE_CATEGORY_DIMENSION,
} from 'store/consts/consts';
import {
  selectCategorySelectorCategoryOptions,
  selectCategorySelectorGroupOptions,
  selectSelectedCategoryGroup,
  selectSelectedCategory,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import {
  setCategoryDimension,
  setSelectedCategory,
  setParentOfSelected,
  setSelectedCategoryGroup,
} from 'store/slices/SpendingAnalysisSlice';

const CategorySelector = () => {
  const dispatch = useDispatch();

  const categoryGroupOptions = useSelector((state) =>
    selectCategorySelectorGroupOptions(state),
  );
  const categoryDrilldownOptions = useSelector((state) =>
    selectCategorySelectorCategoryOptions(state),
  );

  const selectedCategoryGroup = useSelector((state) =>
    selectSelectedCategoryGroup(state),
  );
  const selectedCategory = useSelector((state) => selectSelectedCategory(state));

  return (
    <FlexContainer gap={'10px'}>
      <FloatingSelect
        options={categoryGroupOptions}
        label={'Category Group'}
        value={selectedCategoryGroup}
        onChange={(e) => {
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
        }}
      />
      {categoryDrilldownOptions.length > 0 && (
        <FloatingSelect
          options={categoryDrilldownOptions}
          label={'Category'}
          value={selectedCategory}
          onChange={(e) => {
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
          }}
        />
      )}
    </FlexContainer>
  );
};
export default CategorySelector;
