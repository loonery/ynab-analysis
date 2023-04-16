/* 
 * Category Dropdown consts 
*/
export const CATEGORY_FILTER_DROPDOWN_ID = 'category-filter-dropdown';

export const CATEGORY_DROPDOWN_REDUCER_KEY = 'categoryDropdown';
export const CATEGORY_DROPDOWN_SAVED_STATE_REDUCER_KEY = 'savedCategoryCheckBoxes';
export const CATEGORY_DROPDOWN_TEMP_STATE_REDUCER_KEY = 'tempCategoryCheckBoxes';

// the keys allow the use of the same reducer action to access
// different keys in the state object. In this case we are 
// accessing keys related to the categoryCheckbox dropdown
export const CATEGORY_DROPDOWN_KEYS = {
    dropdownKey: CATEGORY_DROPDOWN_REDUCER_KEY,
    tempCheckboxKey: CATEGORY_DROPDOWN_TEMP_STATE_REDUCER_KEY,
    savedCheckboxKey: CATEGORY_DROPDOWN_SAVED_STATE_REDUCER_KEY
}