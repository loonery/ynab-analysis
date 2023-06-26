import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useFilterBarDispatch as useFilterBarActions } from 'components/FilterBar/hooks/useCheckboxDispatch';
import NestedCheckBoxList from 'libs/reuse/components/NestedCheckBoxList/NestedCheckboxList';
import { ScrollableContentContainer } from 'libs/reuse/containers/ScrollableListContainer';
import { RootState } from 'store';
import { CATEGORY_DROPDOWN_REDUCER_KEY, TEMP_CHECKBOX_KEY } from 'store/consts/consts';
import {
  CheckBoxDropdownKey,
  CheckboxDropdownState,
  DropdownKey,
  DropdownKeys,
  FilterBarDropdownState,
} from 'store/interfaces/FilterBarState';
import { selectDropdown } from 'store/selectors/componentSelectors/filterBarSelectors';
import { selectCategoryData } from 'store/selectors/dataSelectors/categorySelectors';
import { initCheckboxes } from 'store/slices/filterBarSlice';

import { assembleCategoryCheckboxObjects } from '../../utils/filterBarUtils';

// eslint-disable-next-line
const CategoryCheckboxesContainer = () => {
  const dispatch = useDispatch();
  const categoryDropdownKey: CheckBoxDropdownKey = CATEGORY_DROPDOWN_REDUCER_KEY;

  // get all transaction categories and store the parent categories in an array
  const { data: categoryData, isLoading: isCategoryDataLoading } = useSelector(
    (state: RootState) => selectCategoryData(state),
  );

  // the checkboxes we render are the ones that the user is manipulating,
  // the 'temp' checkboxes. Temp is a copy of saved checkboxes on open.
  const { tempCheckboxes } = useSelector(
    (state: RootState): CheckboxDropdownState =>
      selectDropdown(state, categoryDropdownKey) as CheckboxDropdownState,
  );

  // assemble and initialize the category checkboxes on start
  useEffect(() => {
    if (categoryData) {
      const { categories } = categoryData;
      const checkboxes = assembleCategoryCheckboxObjects(categories);
      dispatch(initCheckboxes({ checkboxes, keys }));
    }
  }, [categoryData, isCategoryDataLoading]);

  const { parentOnClick, childOnClick } = useFilterBarActions();

  return (
    <ScrollableContentContainer>
      <NestedCheckBoxList
        checkboxSections={tempCheckBoxes}
        parentOnClick={parentOnClick}
        childOnClick={childOnClick}
      />
    </ScrollableContentContainer>
  );
};
export default CategoryCheckboxesContainer;
