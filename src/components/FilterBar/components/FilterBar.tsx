import React from 'react';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import {
  ACCOUNT_DROPDOWN_REDUCER_KEY,
  CATEGORY_DROPDOWN_REDUCER_KEY,
  DATE_DROPDOWN_REDUCER_KEY,
} from 'store/consts/consts';

import {
  ACCOUNT_DROPDOWN_ID,
  ACCOUNT_DROPDOWN_TOGGLE_LABEL,
  CATEGORY_DROPDOWN_ID,
  DATE_DROPDOWN_TOGGLE_LABEL,
  DATE_FILTER_DROPDOWN_ID,
  GAP_BETWEEN_FILTER_DROPDOWNS,
} from '../consts/filterBarConsts';
import { CATEGORY_DROPDOWN_TOGGLE_LABEL } from '../consts/filterBarConsts';
import { useButtons } from '../hooks/useCheckboxButtons';

import DateFilterFormContainer from './DateFilterDropdown/DateFilterForm';
import { FilterBarDropdown } from './FilterBarDropdown';
import NestedCheckboxDropdownContainer from './NestedCheckboxDropdownContainer/NestedCheckboxDropdownContainer';

// eslint-disable-next-line
const FilterBar = () => {
  const { getCheckboxHeaderButtons, getFooterButtons, dateHeaderButtons } = useButtons();
  return (
    <FlexContainer gap={GAP_BETWEEN_FILTER_DROPDOWNS}>
      <FilterBarDropdown
        id={CATEGORY_DROPDOWN_ID}
        dropdownKey={CATEGORY_DROPDOWN_REDUCER_KEY}
        headerText={CATEGORY_DROPDOWN_TOGGLE_LABEL}
        dropdownLinkText={CATEGORY_DROPDOWN_TOGGLE_LABEL}
        headerButtons={getCheckboxHeaderButtons(CATEGORY_DROPDOWN_REDUCER_KEY)}
        footerButtons={getFooterButtons(CATEGORY_DROPDOWN_REDUCER_KEY)}
      >
        <NestedCheckboxDropdownContainer dropdownKey={CATEGORY_DROPDOWN_REDUCER_KEY} />
      </FilterBarDropdown>
      <FilterBarDropdown
        id={DATE_FILTER_DROPDOWN_ID}
        dropdownKey={DATE_DROPDOWN_REDUCER_KEY}
        headerText={DATE_DROPDOWN_TOGGLE_LABEL}
        dropdownLinkText={DATE_DROPDOWN_TOGGLE_LABEL}
        headerButtons={dateHeaderButtons}
        footerButtons={getFooterButtons(DATE_DROPDOWN_REDUCER_KEY)}
      >
        <DateFilterFormContainer />
      </FilterBarDropdown>
      <FilterBarDropdown
        id={ACCOUNT_DROPDOWN_ID}
        dropdownKey={ACCOUNT_DROPDOWN_REDUCER_KEY}
        headerText={ACCOUNT_DROPDOWN_TOGGLE_LABEL}
        dropdownLinkText={ACCOUNT_DROPDOWN_TOGGLE_LABEL}
        headerButtons={getCheckboxHeaderButtons(ACCOUNT_DROPDOWN_REDUCER_KEY)}
        footerButtons={getFooterButtons(ACCOUNT_DROPDOWN_REDUCER_KEY)}
      >
        <NestedCheckboxDropdownContainer dropdownKey={ACCOUNT_DROPDOWN_REDUCER_KEY} />
      </FilterBarDropdown>
    </FlexContainer>
  );
};
export default FilterBar;
