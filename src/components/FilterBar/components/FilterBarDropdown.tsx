import React from 'react';
import { PropsWithChildren } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ButtonBar from 'libs/reuse/components/ButtonBar';
import { CustomDropdown } from 'libs/reuse/components/CustomDropdown';
import { StyledHeader4 } from 'libs/reuse/elements/StyledHeader4';
import { StyledHr } from 'libs/reuse/elements/StyledHr';
import { RootState } from 'store';
import { selectDropdown } from 'store/selectors/componentSelectors/filterBarSelectors';
import { cancelDropdownChanges, toggleShowDropdown } from 'store/slices/filterBarSlice';

import { FilterBarDropdownProps } from '../interfaces/interfaces';
// eslint-disable-next-line
export const FilterBarDropdown = ({
  id,
  headerText,
  dropdownLinkText,
  dropdownKey,
  headerButtons,
  footerButtons,
  children,
}: PropsWithChildren<FilterBarDropdownProps>) => {
  const dispatch = useDispatch();
  const { show } = useSelector((state: RootState) => selectDropdown(state, dropdownKey));

  const onToggle = (): void => {
    // toggle the dropdown in state
    dispatch(toggleShowDropdown({ dropdownKey }));
    // revert temp state back to saved state if clicked away
    dispatch(cancelDropdownChanges({ dropdownKey }));
  };

  return (
    <CustomDropdown
      dropdownLinkText={dropdownLinkText}
      show={show}
      id={id}
      onToggle={onToggle}
    >
      <StyledHeader4>{headerText}</StyledHeader4>
      <StyledHr />
      <ButtonBar buttons={headerButtons} />
      <StyledHr />

      {children}
      <ButtonBar
        buttons={footerButtons}
        padding={'30px 0px 0px 0px'}
        justify={'flex-end'}
      />
    </CustomDropdown>
  );
};
