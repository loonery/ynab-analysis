// todo - add generics here for the checkbox objects
export interface FilterBarState {
  categoryDropdown: CategoryDropdown;
  dateDropdown: DateDropdown;
  accountDropdown: AccountDropdown;
  appliedFilters: AppliedFilters;
}

export interface CategoryDropdown {
  savedCategoryCheckBoxes: string[];
  tempCategoryCheckBoxes: [];
  show: boolean;
}

export interface AccountDropdown {
  savedAccountCheckBoxes: string[];
  tempAccountCheckBoxes: string[];
  show: boolean;
}

export interface DateDropdown {
  savedDateRange: { startDate: string | undefined; endDate: string | undefined };
  tempDateRange: { startDate: string | undefined; endDate: string | undefined };
  show: boolean;
}

export interface AppliedFilters {
  startDate: string | undefined;
  endDate: string | undefined;
  filteredCategories: string[];
  filteredAccounts: string[];
}
