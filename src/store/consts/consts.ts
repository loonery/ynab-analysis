import { NestedCheckBoxSection } from 'libs/reuse/components/NestedCheckBoxList/interfaces/NestedCheckboxSection';

// TRANSACTION SLICE CONSTS
export const READY_TO_ASSIGN_CATEGORY_ID = '4d13ae18-b4c2-4ac8-b69b-cfe59ca7065b';

// SPENDING ANALYSIS SLICE CONSTS
export const ALL_CATEGORIES_DIMENSION = 'all-categories';
export const CATEGORY_GROUP_DIMENSION = 'category-group';
export const SINGLE_CATEGORY_DIMENSION = 'single-category';

export const ALL_CATEGORIES_ITEM = 'All Categories';
export const ALL_CATEGORY_GROUPS_ITEM = 'All Category Groups';
export const NO_PARENT = 'no parent';

export const DOT_TOOLTIP_TYPE = 'dot-tooltip';
export const BAR_TOOLTIP_TYPE = 'bar-tooltip';

/*
 * FILTER BAR SLICE CONSTS
 */
export const EMPTY_NESTED_CHECKBOX_SECTION: NestedCheckBoxSection = {
  parentId: 'blank',
  parentName: 'blank',
  checked: false,
  childObjects: [],
};

// General Dropdown Consts

export const TEMP_CHECKBOX_KEY = 'tempCheckboxes';
export const SAVED_CHECKBOX_KEY = 'savedCheckboxes';
export const DROPDOWN_SHOW_KEY = 'show';

// Category Dropdown consts
export const CATEGORY_DROPDOWN_REDUCER_KEY = 'categoryDropdown';

//Date Dropdown consts
export const DATE_DROPDOWN_REDUCER_KEY = 'dateDropdown';
export const TEMP_DATE_RANGE_KEY = 'tempDateRange';
export const SAVED_DATE_RANGE_KEY = 'savedDateRange';

// Account Dropdown consts
export const ACCOUNT_DROPDOWN_REDUCER_KEY = 'accountDropdown';
