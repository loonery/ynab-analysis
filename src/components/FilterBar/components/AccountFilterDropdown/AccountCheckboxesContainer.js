import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ACCOUNT_DROPDOWN_KEYS } from 'components/FilterBar/consts/filterBarConsts';
import NestedCheckBoxList from 'libs/reuse/components/NestedCheckBoxList/NestedCheckboxList';
import { ScrollableContentContainer } from 'libs/reuse/containers/ScrollableListContainer';
import { selectTransactionCategories } from 'store/selectors/transactionSliceSelectors';
import {
  initCheckboxes,
  toggleChildCheckbox,
  toggleParentCheckbox,
} from 'store/slices/filterBarSlice';

import { assembleCategoryCheckboxObjects } from '../../utils/filterBarUtils';

const AccountCheckboxesContainer = () => {
  const dispatch = useDispatch();
  const keys = ACCOUNT_DROPDOWN_KEYS;

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
    dispatch(initCheckboxes({ checkboxes, keys }));
  }, [transactionCategories]);

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
export default AccountCheckboxesContainer;
