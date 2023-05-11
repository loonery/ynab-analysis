import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ButtonBar from 'libs/reuse/components/ButtonBar';
import { CustomDropdown } from 'libs/reuse/components/CustomDropdown';
import { StyledHeader4 } from 'libs/reuse/elements/StyledHeader4';
import { StyledHr } from 'libs/reuse/elements/StyledHr';
import { selectDropdown } from 'store/selectors/componentSelectors/filterBarSelectors';
import {
  cancelDropdownChanges,
  saveDropdownState,
  toggleDropdown,
  setFiltersFromState,
} from 'store/slices/componentSlices/filterBarSlice';

import {
  DATE_DROPDOWN_KEYS,
  DATE_FILTER_DROPDOWN_ID,
} from '../../consts/filterBarConsts';

import DateFilterFormContainer from './DateFilterFormContainer';

const DateFilterDropdown = () => {
  const dispatch = useDispatch();

  // header button definitions
  const headerButtons = [
    {
      label: 'This month',
      onClick: () => {},
      classString: 'btn btn-sm btn-outline-dark',
    },
    {
      label: 'Last 3 months',
      onClick: () => {},
      classString: 'btn btn-sm btn-outline-dark',
    },
    {
      label: 'This year',
      onClick: () => {},
      classString: 'btn btn-sm btn-outline-dark',
    },
    {
      label: 'Last year',
      onClick: () => {},
      classString: 'btn btn-sm btn-outline-dark',
    },
    {
      label: 'All dates',
      onClick: () => {},
      classString: 'btn btn-sm btn-outline-dark',
    },
  ];

  // footer button definitions
  const footerButtons = [
    {
      label: <FontAwesomeIcon icon={faXmark} />,
      onClick: () => {
        dispatch(cancelDropdownChanges(DATE_DROPDOWN_KEYS));
      },
      classString: 'btn btn-sm btn-outline-danger',
    },
    {
      label: <FontAwesomeIcon icon={faFloppyDisk} />,
      onClick: () => {
        dispatch(toggleDropdown(DATE_DROPDOWN_KEYS));
        dispatch(saveDropdownState(DATE_DROPDOWN_KEYS));
        dispatch(setFiltersFromState());
      },
      classString: 'btn btn-sm btn-outline-success',
    },
  ];

  const { show } = useSelector((state) => selectDropdown(state, DATE_DROPDOWN_KEYS));
  const onToggle = () => {
    // toggle the dropdown in state
    dispatch(toggleDropdown(DATE_DROPDOWN_KEYS));
    dispatch(cancelDropdownChanges(DATE_DROPDOWN_KEYS));
  };

  return (
    <CustomDropdown
      dropdownLinkText={'Date Range'}
      show={show}
      id={DATE_FILTER_DROPDOWN_ID}
      onToggle={onToggle}
    >
      <StyledHeader4>Date Range</StyledHeader4>

      <StyledHr />
      <ButtonBar buttons={headerButtons} />
      <StyledHr />

      <DateFilterFormContainer />

      <ButtonBar
        buttons={footerButtons}
        padding={'25px 0px 0px 0px'}
        justify={'flex-end'}
      />
    </CustomDropdown>
  );
};
export default DateFilterDropdown;
