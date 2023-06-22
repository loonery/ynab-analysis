import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import NestedCheckBoxList from 'libs/reuse/components/NestedCheckBoxList/NestedCheckboxList';
import { ScrollableContentContainer } from 'libs/reuse/containers/ScrollableListContainer';
import { RootState } from 'store';
import {
  CheckboxDropdownState,
  DropdownKey,
  DropdownKeys,
  FilterBarDropdown,
} from 'store/interfaces/FilterBarState';
import { selectDropdown } from 'store/selectors/componentSelectors/filterBarSelectors';
import { selectCategoryData } from 'store/selectors/dataSelectors/categorySelectors';
import {
  initCheckboxes,
  toggleChildCheckbox,
  toggleParentCheckbox,
} from 'store/slices/filterBarSlice';

import { assembleCategoryCheckboxObjects } from '../../utils/filterBarUtils';

// eslint-disable-next-line
const CategoryCheckboxesContainer = () => {
  const dispatch = useDispatch();
  const categoryDropdownKey: DropdownKey = DropdownKeys.categoryDropdown;

  // get all transaction categories and store the parent categories in an array
  const { data: categoryData, isLoading } = useSelector((state: RootState) =>
    selectCategoryData(state),
  );

  // the checkboxes we render are the ones that the user is manipulating,
  // the 'temp' checkboxes. Temp is a copy of saved checkboxes on open.
  const { tempCheckBoxes } = useSelector(
    (state: RootState): CheckboxDropdownState =>
      selectDropdown(state, categoryDropdownKey) as CheckboxDropdownState,
  );

  // assemble and initialize the category checkboxes on start
  useEffect(() => {
    const checkboxes = assembleCategoryCheckboxObjects();
    dispatch(initCheckboxes({ checkboxes, keys }));
  }, [categories]);

  // todo - factor this out -accounts share it
  const parentOnClick = (parentName) =>
    dispatch(
      toggleParentCheckbox({
        parentName,
        keys,
      }),
    );

  // todo - factor this out -accounts share it
  const childOnClick = (parentName, childName) =>
    dispatch(
      toggleChildCheckbox({
        parentName,
        childName,
        keys,
      }),
    );

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
