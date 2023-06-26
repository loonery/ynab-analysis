import React from 'react';

import { useCheckboxState } from 'components/FilterBar/hooks/useCheckboxDispatch';
import NestedCheckBoxList from 'libs/reuse/components/NestedCheckboxDropdownContainer/NestedCheckBoxList/NestedCheckboxList';
import { ScrollableContentContainer } from 'libs/reuse/containers/ScrollableListContainer';
import { ACCOUNT_DROPDOWN_REDUCER_KEY } from 'store/consts/consts';
import { CheckBoxDropdownKey } from 'store/interfaces/FilterBarState';

// eslint-disable-next-line
const AccountCheckboxesContainer = () => {
  const accountDropdownKey: CheckBoxDropdownKey = ACCOUNT_DROPDOWN_REDUCER_KEY;

  const { tempCheckboxes, parentOnClick, childOnClick } =
    useCheckboxState(accountDropdownKey);

  return (
    <ScrollableContentContainer>
      <NestedCheckBoxList
        checkboxSections={tempCheckboxes}
        parentOnClick={parentOnClick}
        childOnClick={childOnClick}
      />
    </ScrollableContentContainer>
  );
};
export default AccountCheckboxesContainer;
