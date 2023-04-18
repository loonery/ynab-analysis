import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CATEGORY_DROPDOWN_KEYS } from 'components/FilterBar/consts/filterBarConsts';
import NestedCheckBoxList from 'libs/reuse/components/NestedCheckBoxList/NestedCheckboxList';
import { ScrollableContentContainer } from 'libs/reuse/containers/ScrollableListContainer';
import { selectTransactionCategories } from 'store/selectors/transactionSliceSelectors';
import {
  initCheckboxes,
  toggleChildCheckbox,
  toggleParentCheckbox,
} from 'store/slices/filterBarSlice';

import { assembleCategoryCheckboxObjects } from '../../utils/filterBarUtils';

const CategoryCheckboxesContainer = () => {
  const dispatch = useDispatch();

  // get all transaction categories and store the parent categories in an array
  const transactionCategories = useSelector((state) =>
    selectTransactionCategories(state),
  );

  // the checkboxes we render are the ones that the user is manipulating,
  // the 'temp' checkboxes. Temp is a copy of saved checkboxes on open.
  const { tempCategoryCheckBoxes } = useSelector(
    (state) => state.filterBar.categoryDropdown,
  );

  // assemble and initialize the category checkboxes on start
  useEffect(() => {
    const checkboxes = assembleCategoryCheckboxObjects(transactionCategories);
    dispatch(initCheckboxes({ checkboxes, keys: CATEGORY_DROPDOWN_KEYS }));
  }, [transactionCategories]);

  const parentOnClick = (parentName) =>
    dispatch(
      toggleParentCheckbox({
        parentName,
        keys: CATEGORY_DROPDOWN_KEYS,
      }),
    );

  const childOnClick = (parentName, childName) =>
    dispatch(
      toggleChildCheckbox({
        parentName,
        childName,
        keys: CATEGORY_DROPDOWN_KEYS,
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
