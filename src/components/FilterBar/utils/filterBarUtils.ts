import { Account, FormattedAccountType } from 'interfaces/Account';
import { SubCategory } from 'interfaces/Category';
import { CategoryGroup } from 'interfaces/Category';
import {
  NestedCheckBoxSection,
  ChildCheckboxObject,
} from 'libs/reuse/components/NestedCheckBoxList/interfaces/NestedCheckboxSection';

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
export const assembleAccountCheckboxes = (
  dataArray: Account[],
): NestedCheckBoxSection[] => {
  const accountTypes = Object.values(FormattedAccountType) as string[];

  const parents = accountTypes.map((accountType: string) => {
    const parentName = accountType;
    const parentId = accountType;
    const checked = true;

    const childObjects: ChildCheckboxObject[] = dataArray.map((account: Account) => {
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
