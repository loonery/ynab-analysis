import { NestedCheckBoxSection } from 'components/FilterBar/components/NestedCheckboxDropdownContainer/NestedCheckBoxList/interfaces/NestedCheckboxSection';
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

export type CheckBoxDropdownKey =
  | typeof CATEGORY_DROPDOWN_REDUCER_KEY
  | typeof ACCOUNT_DROPDOWN_REDUCER_KEY;

export type DateRangeDropdownKey = typeof DATE_DROPDOWN_REDUCER_KEY;

export type DropdownKey = CheckBoxDropdownKey | DateRangeDropdownKey;

export type SavedStateDropdownKey =
  | typeof SAVED_DATE_RANGE_KEY
  | typeof SAVED_CHECKBOX_KEY;

export type TempStateDropdownKey = typeof TEMP_CHECKBOX_KEY | typeof TEMP_DATE_RANGE_KEY;

/**
 * Defines the state for the FilterBar
 */
export interface FilterBarState {
  [CATEGORY_DROPDOWN_REDUCER_KEY]: CheckboxDropdownState;
  [DATE_DROPDOWN_REDUCER_KEY]: DateDropdownState;
  [ACCOUNT_DROPDOWN_REDUCER_KEY]: CheckboxDropdownState;
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

export type FilterBarDropdownState = DateDropdownState | CheckboxDropdownState;
