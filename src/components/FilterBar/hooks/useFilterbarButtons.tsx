import React from 'react';

import { useDispatch } from 'react-redux';

import { faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ButtonProps } from 'libs/reuse/components/interfaces/interfaces';
import { DropdownKey } from 'store/interfaces/FilterBarState';
import { setAllCheckboxes, cancelDropdownChanges } from 'store/slices/filterBarSlice';

import { getDropdownStateKeys } from '../utils/filterBarUtils';

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
      onClick: (): void => {
        return;
      },
      classString: BASIC_BUTTON_CLASSTRING,
    },
    {
      label: THREE_MONTHS_LABEL,
      onClick: (): void => {
        return;
      },
      classString: BASIC_BUTTON_CLASSTRING,
    },
    {
      label: THIS_YEAR_LABEL,
      onClick: (): void => {
        return;
      },
      classString: BASIC_BUTTON_CLASSTRING,
    },
    {
      label: LAST_YEAR_LABEL,
      onClick: (): void => {
        return;
      },
      classString: BASIC_BUTTON_CLASSTRING,
    },
    {
      label: ALL_TIME_LABEL,
      onClick: (): void => {
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
  // I don't understand why this predicate seems reversed, but it is working this way
  const getFooterButtons = (dropdownKey: DropdownKey): ButtonProps[] => {
    const { savedKey, tempKey } = getDropdownStateKeys(dropdownKey);

    // BUTTON FUNCTIONS
    const cancelChanges = (): void => {
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
        onClick: cancelChanges,
        classString: DENY_BUTTON_CLASSTRING,
      },
    ];
  };

  return {
    dateHeaderButtons,
    getCheckboxHeaderButtons,
    getFooterButtons,
  };
};
