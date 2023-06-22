import { DateRange } from './DateRange';

export enum DropdownKeys {
  categoryDropdown = 'categoryDropdown',
  dateDropdown = 'dateDropdown',
  accountDropdown = 'accountDropdown',
}
export type DropdownKey = DropdownKeys;

/**
 * Defines the state for the FilterBar
 */
export interface FilterBarState {
  [DropdownKeys.categoryDropdown]: CheckboxDropdownState;
  [DropdownKeys.dateDropdown]: DateDropdownState;
  [DropdownKeys.accountDropdown]: CheckboxDropdownState;
  appliedFilters: AppliedFilters;
}

export interface CheckboxDropdownState {
  savedCheckBoxes: string[];
  tempCheckBoxes: string[];
  show: boolean;
}
export interface DateDropdownState {
  savedDateRange: DateRange;
  tempDateRange: DateRange;
  show: boolean;
}
export interface AppliedFilters {
  startDate: string | undefined;
  endDate: string | undefined;
  filteredCategories: string[];
  filteredAccounts: string[];
}

export type FilterBarDropdown = DateDropdownState | CheckboxDropdownState;
