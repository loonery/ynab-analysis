import React from 'react';

import { useDispatch } from 'react-redux';

import { faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ButtonProps } from 'libs/reuse/components/interfaces/interfaces';
import { TEMP_CHECKBOX_KEY, SAVED_CHECKBOX_KEY } from 'store/consts/consts';
import { DropdownKey, DateRangeDropdownKey } from 'store/interfaces/FilterBarState';
import {
  setAllCheckboxes,
  cancelDropdownChanges,
  saveDropdownState,
  toggleShowDropdown,
  setFiltersFromState,
} from 'store/slices/filterBarSlice';

import {
  DATE_DROPDOWN_SAVED_STATE_REDUCER_KEY,
  DATE_DROPDOWN_TEMP_STATE_REDUCER_KEY,
} from '../consts/filterBarConsts';

export const useButtons = (): {
  dateHeaderButtons: ButtonProps[];
  getCheckboxHeaderButtons: (dropdownKey: DropdownKey) => ButtonProps[];
  getFooterButtons: (dropdownKey: DropdownKey) => ButtonProps[];
} => {
  const dispatch = useDispatch();

  // SAVE AND CANCEL LABELS
  const CANCEL_CHANGES_LABEL = <FontAwesomeIcon icon={faX} />;
  const SAVE_LABEL = <FontAwesomeIcon icon={faSave} />;

  // CHECKBOX LABELS
  const SELECT_ALL_LABEL = 'Select All';
  const SELECT_NONE_LABEL = 'Select None';

  // DATE BUTTON LABELS
  const THIS_MONTH_LABEL = 'This month';
  const THREE_MONTHS_LABEL = 'Last 3 months';
  const THIS_YEAR_LABEL = 'This year';
  const LAST_YEAR_LABEL = 'Last year';
  const ALL_TIME_LABEL = 'All dates';

  // BUTTON CLASSSTRINGS
  const BASIC_BUTTON_CLASSTRING = 'btn btn-sm btn-outline-dark';
  const CONFIRM_BUTTON_CLASSTRING = 'btn btn-sm btn-outline-success';
  const DENY_BUTTON_CLASSTRING = 'btn btn-sm btn-outline-danger';

  // date header button definitions
  const dateHeaderButtons = [
    {
      label: THIS_MONTH_LABEL,
      onClick: () => {
        return;
      },
      classString: BASIC_BUTTON_CLASSTRING,
    },
    {
      label: THREE_MONTHS_LABEL,
      onClick: () => {
        return;
      },
      classString: BASIC_BUTTON_CLASSTRING,
    },
    {
      label: THIS_YEAR_LABEL,
      onClick: () => {
        return;
      },
      classString: BASIC_BUTTON_CLASSTRING,
    },
    {
      label: LAST_YEAR_LABEL,
      onClick: () => {
        return;
      },
      classString: BASIC_BUTTON_CLASSTRING,
    },
    {
      label: ALL_TIME_LABEL,
      onClick: () => {
        return;
      },
      classString: BASIC_BUTTON_CLASSTRING,
    },
  ];

  // header button definitions
  const getCheckboxHeaderButtons = (dropdownKey: DropdownKey): ButtonProps[] => {
    const selectNoCheckboxes = (): void => {
      dispatch(setAllCheckboxes({ dropdownKey, value: false }));
    };

    const selectAllCheckboxes = (): void => {
      dispatch(setAllCheckboxes({ dropdownKey, value: true }));
    };
    return [
      {
        label: SELECT_NONE_LABEL,
        onClick: selectNoCheckboxes,
        classString: BASIC_BUTTON_CLASSTRING,
      },
      {
        label: SELECT_ALL_LABEL,
        onClick: selectAllCheckboxes,
        classString: BASIC_BUTTON_CLASSTRING,
      },
    ];
  };

  // footer button definitions
  const getFooterButtons = (dropdownKey: DropdownKey): ButtonProps[] => {
    const isDateDropdown = (
      dropdownKey: DropdownKey,
    ): dropdownKey is DateRangeDropdownKey => {
      return true;
    };

    const tempKey = isDateDropdown(dropdownKey)
      ? DATE_DROPDOWN_TEMP_STATE_REDUCER_KEY
      : TEMP_CHECKBOX_KEY;

    const savedKey = isDateDropdown(dropdownKey)
      ? DATE_DROPDOWN_SAVED_STATE_REDUCER_KEY
      : SAVED_CHECKBOX_KEY;

    // BUTTON FUNCTIONS
    const saveChanges = () => {
      dispatch(toggleShowDropdown({ dropdownKey }));
      dispatch(
        saveDropdownState({
          dropdownKey,
          tempKey,
          savedKey,
        }),
      );
      dispatch(setFiltersFromState());
    };

    const discardChanges = () => {
      dispatch(
        cancelDropdownChanges({
          dropdownKey,
          tempKey,
          savedKey,
        }),
      );
    };
    return [
      {
        label: CANCEL_CHANGES_LABEL,
        onClick: discardChanges,
        classString: DENY_BUTTON_CLASSTRING,
      },
      {
        label: SAVE_LABEL,
        onClick: saveChanges,
        classString: CONFIRM_BUTTON_CLASSTRING,
      },
    ];
  };

  return {
    dateHeaderButtons,
    getCheckboxHeaderButtons,
    getFooterButtons,
  };
};
