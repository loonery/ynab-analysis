import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ButtonBar from 'libs/reuse/components/ButtonBar';
import { CustomDropdown } from 'libs/reuse/components/CustomDropdown';
import { StyledHeader4 } from 'libs/reuse/elements/StyledHeader4';
import { StyledHr } from 'libs/reuse/elements/StyledHr';
import { selectDropdown } from 'store/selectors/filterBarSelectors';
import {
  selectAllCheckboxes,
  selectNoCheckboxes,
  saveDropdownState,
  cancelDropdownChanges,
  setFiltersFromState,
  toggleDropdown,
} from 'store/slices/filterBarSlice';

import { ACCOUNT_DROPDOWN_TOGGLE_LABEL } from '../../consts/filterBarConsts';
import { ACCOUNT_DROPDOWN_KEYS, ACCOUNT_DROPDOWN_ID } from '../../consts/filterBarConsts';

import AccountCheckboxesContainer from './AccountCheckboxesContainer';

const AccountFilterDropdown = () => {
  const dispatch = useDispatch();

  const keys = ACCOUNT_DROPDOWN_KEYS;

  // header button definitions
  const headerButtons = [
    {
      label: 'Select None',
      onClick: () => {
        dispatch(selectNoCheckboxes(keys));
      },
      classString: 'btn btn-sm btn-outline-dark',
    },
    {
      label: 'Select All',
      onClick: () => {
        dispatch(selectAllCheckboxes(keys));
      },
      classString: 'btn btn-sm btn-outline-dark',
    },
  ];

  // footer button definitions
  const footerButtons = [
    {
      label: <FontAwesomeIcon icon={faXmark} />,
      onClick: () => {
        dispatch(toggleDropdown(keys));
        dispatch(cancelDropdownChanges(keys));
      },
      classString: 'btn btn-sm btn-outline-danger',
    },
    {
      label: <FontAwesomeIcon icon={faFloppyDisk} />,
      onClick: () => {
        dispatch(toggleDropdown(keys));
        dispatch(saveDropdownState(keys));
        dispatch(setFiltersFromState());
      },
      classString: 'btn btn-sm btn-outline-success',
    },
  ];
  const { show } = useSelector((state) => selectDropdown(state, keys));
  const onToggle = () => {
    // toggle the dropdown in state
    dispatch(toggleDropdown(keys));
    // revert temp state back to saved state if clicked away
    dispatch(cancelDropdownChanges(keys));
  };

  return (
    <CustomDropdown
      dropdownLinkText={ACCOUNT_DROPDOWN_TOGGLE_LABEL}
      show={show}
      id={ACCOUNT_DROPDOWN_ID}
      onToggle={onToggle}
    >
      <StyledHeader4>Categories</StyledHeader4>
      <StyledHr />
      <ButtonBar buttons={headerButtons} />
      <StyledHr />
      <AccountCheckboxesContainer />
      <ButtonBar
        buttons={footerButtons}
        padding={'30px 0px 0px 0px'}
        justify={'flex-end'}
      />
    </CustomDropdown>
  );
};
export default AccountFilterDropdown;