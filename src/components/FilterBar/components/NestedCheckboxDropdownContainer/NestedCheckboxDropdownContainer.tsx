import React from 'react';

import { useCheckboxState } from 'components/FilterBar/hooks/useCheckboxState';
import { ScrollableContentContainer } from 'libs/reuse/containers/ScrollableListContainer';
import { CheckBoxDropdownKey } from 'store/interfaces/FilterBarState';

import NestedCheckBoxList from './NestedCheckBoxList/NestedCheckboxList';

// eslint-disable-next-line
const NestedCheckboxDropdownContainer = ({
  dropdownKey,
}: {
  dropdownKey: CheckBoxDropdownKey;
}) => {
  const { tempCheckboxes, parentOnClick, childOnClick } = useCheckboxState(dropdownKey);

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
export default NestedCheckboxDropdownContainer;
