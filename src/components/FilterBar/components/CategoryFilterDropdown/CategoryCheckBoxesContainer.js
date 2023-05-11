import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CATEGORY_DROPDOWN_KEYS } from 'components/FilterBar/consts/filterBarConsts';
import NestedCheckBoxList from 'libs/reuse/components/NestedCheckBoxList/NestedCheckboxList';
import { ScrollableContentContainer } from 'libs/reuse/containers/ScrollableListContainer';
import { selectAllCategories } from 'store/selectors/dataSelectors/categorySelectors';
import { selectDropdown } from 'store/selectors/componentSelectors/filterBarSelectors';
import {
  initCheckboxes,
  toggleChildCheckbox,
  toggleParentCheckbox,
} from 'store/slices/componentSlices/filterBarSlice';

import { assembleCategoryCheckboxObjects } from '../../utils/filterBarUtils';

const CategoryCheckboxesContainer = () => {
  const dispatch = useDispatch();
  const keys = CATEGORY_DROPDOWN_KEYS;

  // get all transaction categories and store the parent categories in an array
  const categories = useSelector((state) => selectAllCategories(state));

  // the checkboxes we render are the ones that the user is manipulating,
  // the 'temp' checkboxes. Temp is a copy of saved checkboxes on open.
  const { tempCategoryCheckBoxes } = useSelector((state) => selectDropdown(state, keys));

  // assemble and initialize the category checkboxes on start
  useEffect(() => {
    const checkboxes = assembleCategoryCheckboxObjects(categories);
    dispatch(initCheckboxes({ checkboxes, keys }));
  }, [categories]);

  const parentOnClick = (parentName) =>
    dispatch(
      toggleParentCheckbox({
        parentName,
        keys,
      }),
    );

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
        checkboxSections={tempCategoryCheckBoxes}
        parentOnClick={parentOnClick}
        childOnClick={childOnClick}
      />
    </ScrollableContentContainer>
  );
};
export default CategoryCheckboxesContainer;
