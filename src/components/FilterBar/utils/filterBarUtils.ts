import {
  NestedCheckBoxSection,
  ChildCheckboxObject,
} from 'components/FilterBar/components/NestedCheckboxDropdownContainer/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import { ACCOUNT_SUPER_TYPES, TRACKING_ACCOUNTS_STRING } from 'consts/consts';
import { Account, AccountSuperType } from 'interfaces/Account';
import { SubCategory } from 'interfaces/Category';
import { CategoryGroup } from 'interfaces/Category';
import {
  DATE_DROPDOWN_REDUCER_KEY,
  SAVED_DATE_RANGE_KEY,
  TEMP_CHECKBOX_KEY,
  SAVED_CHECKBOX_KEY,
  TEMP_DATE_RANGE_KEY,
} from 'store/consts/consts';
import {
  DropdownKey,
  SavedStateDropdownKey,
  TempStateDropdownKey,
} from 'store/interfaces/FilterBarState';

// todo - factor out common functionality here - these functions are too similar
/**
 *
 * @param dataArray
 * @returns
 */
export const assembleCategoryCheckboxObjects = (
  dataArray: CategoryGroup[],
): NestedCheckBoxSection[] => {
  return dataArray.map((categoryGroup: CategoryGroup) => {
    // processing parent
    const checked = true;
    const parentId = categoryGroup.id;
    const parentName = categoryGroup.name;

    // processing children
    const childObjects: ChildCheckboxObject[] = categoryGroup.subCategories.map(
      (subCategory: SubCategory) => {
        return {
          childName: subCategory.name,
          childId: subCategory.id,
          checked,
        };
      },
    );

    return {
      parentId,
      parentName,
      checked,
      childObjects,
    };
  });
};

/**
 *
 * @param dataArray
 * @returns
 */
// todo - simplify the logic in this function
export const assembleAccountCheckboxes = (
  dataArray: Account[],
): NestedCheckBoxSection[] => {
  const parents = ACCOUNT_SUPER_TYPES.map((accountType: AccountSuperType) => {
    const parentName = accountType;
    const parentId = accountType;
    const checked = true;

    const childObjects: ChildCheckboxObject[] = dataArray
      // if we are creating checkboxes for the tracking accounts, then we create a child for it if the account is not on budget, since that is
      // synonymous with being a tracking account
      .filter((account: Account) =>
        accountType === TRACKING_ACCOUNTS_STRING ? !account.on_budget : account.on_budget,
      )
      .map((account: Account) => {
        return {
          childName: account.name,
          childId: account.id,
          checked,
        };
      });
    return {
      parentId,
      parentName,
      checked,
      childObjects,
    };
  });
  return parents;
};

// helper function gets the correct state-accessor keys based on the dropdown key provided
export const getDropdownStateKeys = (
  dropdownKey: DropdownKey,
): { savedKey: SavedStateDropdownKey; tempKey: TempStateDropdownKey } => {
  switch (dropdownKey) {
    case DATE_DROPDOWN_REDUCER_KEY:
      return {
        tempKey: TEMP_DATE_RANGE_KEY,
        savedKey: SAVED_DATE_RANGE_KEY,
      };
    default:
      return {
        tempKey: TEMP_CHECKBOX_KEY,
        savedKey: SAVED_CHECKBOX_KEY,
      };
  }
};
