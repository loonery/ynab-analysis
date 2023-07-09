import {
  NestedCheckBoxSection,
  ChildCheckboxObject,
} from 'components/FilterBar/components/NestedCheckboxDropdownContainer/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import { OptionInterface } from 'libs/reuse/elements/form-controls/interfaces/interfaces';
import {
  CheckboxDropdownState,
  DateDropdownState,
} from 'store/interfaces/FilterBarState';

// TRANSACTION SLICE CONSTS
export const READY_TO_ASSIGN_CATEGORY_ID = '4d13ae18-b4c2-4ac8-b69b-cfe59ca7065b';

// SPENDING ANALYSIS SLICE CONSTS
// constant options
const ALL_SUBCATEGORIES_LABEL = 'All Categories';
const ALL_CATEGORY_GROUPS_LABEL = 'All Category Groups';
const ALL_CATEGORY_GROUPS_OPTION_ID = '-1';
const ALL_SUBCATEGORIES_OPTION_ID = '-2';

export const ALL_SUBCATEGORIES_OPTION: OptionInterface<string> = {
  id: String(ALL_SUBCATEGORIES_OPTION_ID),
  label: ALL_SUBCATEGORIES_LABEL,
  value: String(ALL_CATEGORY_GROUPS_OPTION_ID),
};

export const ALL_CATEGORY_GROUPS_OPTION: OptionInterface<string> = {
  id: String(ALL_CATEGORY_GROUPS_OPTION_ID),
  label: ALL_CATEGORY_GROUPS_LABEL,
  value: String(ALL_CATEGORY_GROUPS_OPTION_ID),
};

export const ALL_CATEGORIES_DIMENSION = 'all-categories';
export const CATEGORY_GROUP_DIMENSION = 'category-group';
export const SINGLE_CATEGORY_DIMENSION = 'single-category';

export const NO_PARENT = 'no parent';

export const DOT_TOOLTIP_TYPE = 'dot-tooltip';
export const BAR_TOOLTIP_TYPE = 'bar-tooltip';

/*
 * FILTER BAR SLICE CONSTS
 */
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

/**
 * Checkbox consts
 */
export const EMPTY_NESTED_CHECKBOX_SECTION: NestedCheckBoxSection = {
  parentId: 'blank',
  parentName: 'blank',
  checked: false,
  childObjects: [],
};

export const EMPTY_CHILD_CHECKBOX_SECTION: ChildCheckboxObject = {
  childId: 'blank',
  childName: 'blank',
  checked: false,
};

/**
 * Dropdown state consts
 */
export const INITIAL_CHECKBOX_DROPDOWN_STATE: CheckboxDropdownState = {
  [SAVED_CHECKBOX_KEY]: [],
  [TEMP_CHECKBOX_KEY]: [],
  [DROPDOWN_SHOW_KEY]: false,
};

export const INITIAL_DATE_DROPDOWN_STATE: DateDropdownState = {
  [SAVED_DATE_RANGE_KEY]: { startDate: undefined, endDate: undefined },
  [TEMP_DATE_RANGE_KEY]: { startDate: undefined, endDate: undefined },
  [DROPDOWN_SHOW_KEY]: false,
};
