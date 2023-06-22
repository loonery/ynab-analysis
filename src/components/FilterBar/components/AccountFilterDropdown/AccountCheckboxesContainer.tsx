import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ACCOUNT_DROPDOWN_KEYS } from 'components/FilterBar/consts/filterBarConsts';
import NestedCheckBoxList from 'libs/reuse/components/NestedCheckBoxList/NestedCheckboxList';
import { ScrollableContentContainer } from 'libs/reuse/containers/ScrollableListContainer';
import { selectDropdown } from 'store/selectors/componentSelectors/filterBarSelectors';
import { selectAccounts } from 'store/selectors/dataSelectors/accountSelectors';
import {
  initCheckboxes,
  toggleChildCheckbox,
  toggleParentCheckbox,
} from 'store/slices/filterBarSlice';

import { assembleAccountCheckboxes } from '../../utils/filterBarUtils';

// eslint-disable-next-line
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

  // todo - factor this out
  const parentOnClick = (parentName) =>
    dispatch(
      toggleParentCheckbox({
        parentName,
        keys,
      }),
    );

  // todo - factor this out
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
