/* 
 * Category Dropdown consts 
*/
export const CATEGORY_DROPDOWN_ID = "category-filter-dropdown";
export const CATEGORY_DROPDOWN_TOGGLE_LABEL = "Categories";
export const CATEGORY_DROPDOWN_REDUCER_KEY = "categoryDropdown";
export const CATEGORY_DROPDOWN_SAVED_STATE_REDUCER_KEY = "savedCategoryCheckBoxes";
export const CATEGORY_DROPDOWN_TEMP_STATE_REDUCER_KEY = "tempCategoryCheckBoxes";

// the keys allow the use of the same reducer action to access
// different keys in the state object. In this case we are 
// accessing keys related to the categoryCheckbox dropdown
export const CATEGORY_DROPDOWN_KEYS = {
  dropdownKey: CATEGORY_DROPDOWN_REDUCER_KEY,
  tempCheckboxKey: CATEGORY_DROPDOWN_TEMP_STATE_REDUCER_KEY,
  savedCheckboxKey: CATEGORY_DROPDOWN_SAVED_STATE_REDUCER_KEY
};

/* 
 * Date Dropdown consts 
*/
export const DATE_FILTER_DROPDOWN_ID = "date-filter-dropdown";

export const DATE_DROPDOWN_REDUCER_KEY = "dateDropdown";
export const DATE_DROPDOWN_SAVED_STATE_REDUCER_KEY = "savedDateRange";
export const DATE_DROPDOWN_TEMP_STATE_REDUCER_KEY = "tempDateRange";

export const DATE_DROPDOWN_KEYS = {
  dropdownKey: DATE_DROPDOWN_REDUCER_KEY,
  tempCheckboxKey: DATE_DROPDOWN_TEMP_STATE_REDUCER_KEY,
  savedCheckboxKey: DATE_DROPDOWN_SAVED_STATE_REDUCER_KEY,
};

export const DATE_DROPDOWN_FROM_LABEL = "From";
export const DATE_DROPDOWN_FROM_ID = "from-date-dropdown";
export const DATE_DROPDOWN_TO_LABEL = "To";
export const DATE_DROPDOWN_TO_ID = "to-date-dropdown";

/* 
 * Account Dropdown consts 
*/
export const ACCOUNT_DROPDOWN_ID = "account-filter-dropdown";
export const ACCOUNT_DROPDOWN_TOGGLE_LABEL = "Accounts";
export const ACCOUNT_DROPDOWN_REDUCER_KEY = "accountDropdown";
export const ACCOUNT_DROPDOWN_SAVED_STATE_REDUCER_KEY = "savedAccountCheckBoxes";
export const ACCOUNT_DROPDOWN_TEMP_STATE_REDUCER_KEY = "tempAccountCheckBoxes";

// the keys allow the use of the same reducer action to access
// different keys in the state object. In this case we are 
// accessing keys related to the categoryCheckbox dropdown
export const ACCOUNT_DROPDOWN_KEYS = {
  dropdownKey: ACCOUNT_DROPDOWN_REDUCER_KEY,
  tempCheckboxKey: ACCOUNT_DROPDOWN_TEMP_STATE_REDUCER_KEY,
  savedCheckboxKey: ACCOUNT_DROPDOWN_SAVED_STATE_REDUCER_KEY
};