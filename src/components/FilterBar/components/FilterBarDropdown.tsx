import React from 'react';
import { PropsWithChildren } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ButtonBar from 'libs/reuse/components/ButtonBar';
import { CustomDropdown } from 'libs/reuse/components/CustomDropdown';
import { StyledHeader4 } from 'libs/reuse/elements/StyledHeader4';
import { StyledHr } from 'libs/reuse/elements/StyledHr';
import { RootState } from 'store';
import { selectDropdown } from 'store/selectors/componentSelectors/filterBarSelectors';
import {
  saveDropdownChanges,
  setFiltersFromState,
  toggleShowDropdown,
} from 'store/slices/filterBarSlice';

import {
  BUTTON_BAR_GAP_BETWEEN_BUTTONS,
  BOTTOM_BUTTON_BAR_PADDING,
} from '../consts/filterBarConsts';
import { FilterBarDropdownProps } from '../interfaces/interfaces';
import { getDropdownStateKeys } from '../utils/filterBarUtils';
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
    // save user's changes without explicit need for save
    dispatch(
      saveDropdownChanges({
        dropdownKey,
        ...getDropdownStateKeys(dropdownKey),
      }),
    );
    dispatch(setFiltersFromState());
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
      <ButtonBar
        buttons={headerButtons}
        gapBetweenButtons={BUTTON_BAR_GAP_BETWEEN_BUTTONS}
      />
      <StyledHr />
      {children}
      <ButtonBar
        buttons={footerButtons}
        gapBetweenButtons={BUTTON_BAR_GAP_BETWEEN_BUTTONS}
        padding={BOTTOM_BUTTON_BAR_PADDING}
        justify={'flex-end'}
      />
    </CustomDropdown>
  );
};
