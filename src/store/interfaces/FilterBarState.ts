import { DateRange } from './DateRange';

enum DropdownKeys {
  categoryDropdown = 'categoryDropdown',
  dateDropdown = 'dateDropdown',
  accountDropdown = 'accountDropdown',
}
export type DropdownKey = DropdownKeys;

/**
 * Defines the state for the FilterBar
 */
export interface FilterBarState {
  [DropdownKeys.categoryDropdown]: CategoryDropdown;
  [DropdownKeys.dateDropdown]: DateDropdown;
  [DropdownKeys.accountDropdown]: AccountDropdown;
  appliedFilters: AppliedFilters;
}

export interface CategoryDropdown {
  savedCategoryCheckBoxes: string[];
  tempCategoryCheckBoxes: string[];
  show: boolean;
}

export interface AccountDropdown {
  savedAccountCheckBoxes: string[];
  tempAccountCheckBoxes: string[];
  show: boolean;
}

export interface DateDropdown {
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

export type FilterBarDropdown = DateDropdown | CategoryDropdown | AccountDropdown;
