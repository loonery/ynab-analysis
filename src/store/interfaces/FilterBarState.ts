import { NestedCheckBoxSection } from 'libs/reuse/components/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import {
  CATEGORY_DROPDOWN_REDUCER_KEY,
  ACCOUNT_DROPDOWN_REDUCER_KEY,
  DATE_DROPDOWN_REDUCER_KEY,
  SAVED_CHECKBOX_KEY,
  TEMP_CHECKBOX_KEY,
  DROPDOWN_SHOW_KEY,
  SAVED_DATE_RANGE_KEY,
  TEMP_DATE_RANGE_KEY,
} from 'store/consts/consts';

import { DateRange } from './DateRange';

export type DropdownKey =
  | typeof CATEGORY_DROPDOWN_REDUCER_KEY
  | typeof ACCOUNT_DROPDOWN_REDUCER_KEY
  | typeof DATE_DROPDOWN_REDUCER_KEY;

export type CheckBoxDropdownKey =
  | typeof CATEGORY_DROPDOWN_REDUCER_KEY
  | typeof ACCOUNT_DROPDOWN_REDUCER_KEY;

export type DateRangeDropdownKey = typeof DATE_DROPDOWN_REDUCER_KEY;

/**
 * Defines the state for the FilterBar
 */
export interface FilterBarState {
  [CATEGORY_DROPDOWN_REDUCER_KEY]: CheckboxDropdownState;
  [ACCOUNT_DROPDOWN_REDUCER_KEY]: DateDropdownState;
  [DATE_DROPDOWN_REDUCER_KEY]: CheckboxDropdownState;
  appliedFilters: AppliedFilters;
}

export interface CheckboxDropdownState {
  [SAVED_CHECKBOX_KEY]: NestedCheckBoxSection[];
  [TEMP_CHECKBOX_KEY]: NestedCheckBoxSection[];
  [DROPDOWN_SHOW_KEY]: boolean;
}
export interface DateDropdownState {
  [SAVED_DATE_RANGE_KEY]: DateRange;
  [TEMP_DATE_RANGE_KEY]: DateRange;
  [DROPDOWN_SHOW_KEY]: boolean;
}
export interface AppliedFilters {
  startDate: string | undefined;
  endDate: string | undefined;
  filteredCategories: string[];
  filteredAccounts: string[];
}

export type FilterBarDropdown = DateDropdownState | CheckboxDropdownState;
