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
const ALL_CATEGORY_GROUPS_OPTION_ID_AND_VALUE = '-1';
const ALL_SUBCATEGORIES_OPTION_ID_AND_VALUE = '-2';

export const ALL_SUBCATEGORIES_OPTION: OptionInterface<string> = {
  id: ALL_SUBCATEGORIES_OPTION_ID_AND_VALUE,
  label: ALL_SUBCATEGORIES_LABEL,
  value: ALL_SUBCATEGORIES_OPTION_ID_AND_VALUE,
};

export const ALL_CATEGORY_GROUPS_OPTION: OptionInterface<string> = {
  id: ALL_CATEGORY_GROUPS_OPTION_ID_AND_VALUE,
  label: ALL_CATEGORY_GROUPS_LABEL,
  value: ALL_CATEGORY_GROUPS_OPTION_ID_AND_VALUE,
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

// COLORS
export const PLOTLY_DARK_24 = [
  '#2E91E5',
  '#E15F99',
  '#1CA71C',
  '#FB0D0D',
  '#DA16FF',
  '#222A2A',
  '#B68100',
  '#750D86',
  '#EB663B',
  '#511CFB',
  '#00A08B',
  '#FB00D1',
  '#FC0080',
  '#B2828D',
  '#6C7C32',
  '#778AAE',
  '#862A16',
  '#A777F1',
  '#620042',
  '#1616A7',
  '#DA60CA',
  '#6C4516',
  '#0D2A63',
  '#AF0038',
];

export const PLOTLY_ALPHABET_SCALE = [
  '#AA0DFE',
  '#3283FE',
  '#85660D',
  '#782AB6',
  '#565656',
  '#1C8356',
  '#16FF32',
  '#F7E1A0',
  '#E2E2E2',
  '#1CBE4F',
  '#C4451C',
  '#DEA0FD',
  '#FE00FA',
  '#325A9B',
  '#FEAF16',
  '#F8A19F',
  '#90AD1C',
  '#F6222E',
  '#1CFFCE',
  '#2ED9FF',
  '#B10DA1',
  '#C075A6',
  '#FC1CBF',
  '#B00068',
  '#FBE426',
  '#FA0087',
];

export const PLOTLY_ANTIQUE_SCALE = [
  'rgb(133, 92, 117)',
  'rgb(217, 175, 107)',
  'rgb(175, 100, 88)',
  'rgb(115, 111, 76)',
  'rgb(82, 106, 131)',
  'rgb(98, 83, 119)',
  'rgb(104, 133, 92)',
  'rgb(156, 156, 94)',
  'rgb(160, 97, 119)',
  'rgb(140, 120, 93)',
  'rgb(124, 124, 124)',
];

export const PLOTLY_BOLD_SCALE = [
  'rgb(127, 60, 141)',
  'rgb(17, 165, 121)',
  'rgb(57, 105, 172)',
  'rgb(242, 183, 1)',
  'rgb(231, 63, 116)',
  'rgb(128, 186, 90)',
  'rgb(230, 131, 16)',
  'rgb(0, 134, 149)',
  'rgb(207, 28, 144)',
  'rgb(249, 123, 114)',
  'rgb(165, 170, 153)',
];

export const PLOTLY_VIVID_SCALE = [
  'rgb(229, 134, 6)',
  'rgb(93, 105, 177)',
  'rgb(82, 188, 163)',
  'rgb(153, 201, 69)',
  'rgb(204, 97, 176)',
  'rgb(36, 121, 108)',
  'rgb(218, 165, 27)',
  'rgb(47, 138, 196)',
  'rgb(118, 78, 159)',
  'rgb(237, 100, 90)',
  'rgb(165, 170, 153)',
];
