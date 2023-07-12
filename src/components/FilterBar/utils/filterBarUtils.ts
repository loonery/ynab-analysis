import {
  NestedCheckBoxSection,
  ChildCheckboxObject,
} from 'components/FilterBar/components/NestedCheckboxDropdownContainer/NestedCheckBoxList/interfaces/NestedCheckboxSection';
import { ACCOUNT_SUPER_TYPES, TRACKING_ACCOUNTS_STRING } from 'consts/consts';
import { Account, AccountSuperType } from 'interfaces/Account';
import { SubCategory } from 'interfaces/Category';
import { CategoryGroup } from 'interfaces/Category';

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
