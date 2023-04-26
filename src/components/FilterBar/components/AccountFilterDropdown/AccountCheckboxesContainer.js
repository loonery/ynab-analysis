import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ACCOUNT_DROPDOWN_KEYS } from 'components/FilterBar/consts/filterBarConsts';
import NestedCheckBoxList from 'libs/reuse/components/NestedCheckBoxList/NestedCheckboxList';
import { ScrollableContentContainer } from 'libs/reuse/containers/ScrollableListContainer';
import { selectAccounts } from 'store/selectors/accountSelectors';
import { selectDropdown } from 'store/selectors/filterBarSelectors';
import {
  initCheckboxes,
  toggleChildCheckbox,
  toggleParentCheckbox,
} from 'store/slices/componentSlices/filterBarSlice';

import { assembleAccountCheckboxes } from '../../utils/filterBarUtils';

const AccountCheckboxesContainer = () => {
  const dispatch = useDispatch();
  const keys = ACCOUNT_DROPDOWN_KEYS;

  // get all transaction categories and store the parent categories in an array
  const accounts = useSelector((state) => selectAccounts(state));

  // the checkboxes we render are the ones that the user is manipulating,
  // the 'temp' checkboxes. Temp is a copy of saved checkboxes on open.
  const { tempAccountCheckBoxes } = useSelector((state) => selectDropdown(state, keys));

  // assemble and initialize the category checkboxes on start
  useEffect(() => {
    const checkboxes = assembleAccountCheckboxes(accounts);
    dispatch(initCheckboxes({ checkboxes, keys }));
  }, [accounts]);

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
        checkboxSections={tempAccountCheckBoxes}
        parentOnClick={parentOnClick}
        childOnClick={childOnClick}
      />
    </ScrollableContentContainer>
  );
};
export default AccountCheckboxesContainer;
