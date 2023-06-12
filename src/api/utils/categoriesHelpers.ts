import { CategoryData, CategoryGroup, SubCategory } from 'interfaces/Category';
import {
  YnabCategoryGroup,
  YnabCategory,
} from 'interfaces/externalDataInterfaces/ynabCategory';

/**
 * Conversion helper to convert a YnabCategoryGroup implementing object to a
 * CategoryGroup implementing object
 *
 * @param ynabCategoryGroup
 * @returns
 */
const convertYnabCategoryGroupToCategoryGroup = (
  ynabCategoryGroup: YnabCategoryGroup,
): CategoryGroup => {
  return {
    id: ynabCategoryGroup.id,
    name: ynabCategoryGroup.name,
    hidden: ynabCategoryGroup.hidden,
    deleted: ynabCategoryGroup.deleted,
    subCategories: ynabCategoryGroup.categories.map((subcategory: YnabCategory) => {
      return convertYnabCategoryToSubCategory(subcategory);
    }),
  };
};

/**
 * Conversion helper to convert a YnabCategory implementing object to a
 * SubCategory implementing object.
 *
 * @param ynabCategory
 * @returns
 */
const convertYnabCategoryToSubCategory = (ynabCategory: YnabCategory): SubCategory => {
  return {
    id: ynabCategory.id,
    category_group_id: ynabCategory.category_group_id,
    category_group_name: ynabCategory.category_group_name,
    name: ynabCategory.name,
    hidden: ynabCategory.hidden,
    note: ynabCategory.note,
    budgeted: ynabCategory.budgeted,
    activity: ynabCategory.activity,
    balance: ynabCategory.balance,
    goal_type: ynabCategory.goal_type,
    goal_day: ynabCategory.goal_day,
    goal_cadence: ynabCategory.goal_cadence,
    goal_cadence_frequency: ynabCategory.goal_cadence_frequency,
    goal_creation_month: ynabCategory.goal_creation_month,
    goal_target: ynabCategory.goal_target,
    goal_target_month: ynabCategory.goal_target_month,
    goal_percentage_complete: ynabCategory.goal_percentage_complete,
    goal_months_to_budget: ynabCategory.goal_months_to_budget,
    goal_under_funded: ynabCategory.goal_under_funded,
    goal_overall_funded: ynabCategory.goal_overall_funded,
    goal_overall_left: ynabCategory.goal_overall_left,
    deleted: ynabCategory.deleted,
  };
};

/**
 *
 * @param categories
 * @returns
 */
const filterCategories = (categories: YnabCategoryGroup[]): YnabCategoryGroup[] => {
  return categories.filter(
    (category: YnabCategoryGroup) => category.categories.length > 0,
  );
};

/**
 *
 * @param categoryGroups
 * @returns
 */
const createReverseMap = (
  categoryGroups: CategoryGroup[],
): { [subCategoryId: string]: CategoryGroup } => {
  const reverseMap: { [subCategoryId: string]: CategoryGroup } = {};
  // for each category group...
  categoryGroups.forEach((categoryGroup: CategoryGroup) => {
    // map each group's subcategories to its parent subcategory group
    categoryGroup.subCategories.forEach((subcategory: SubCategory) => {
      reverseMap[subcategory.id] = categoryGroup;
    });
  });
  return reverseMap;
};

const getSubcategories = (categoryGroups: CategoryGroup[]): SubCategory[] => {
  const returned: SubCategory[] = [];
  categoryGroups.forEach((categoryGroup: CategoryGroup) => {
    returned.push(...categoryGroup.subCategories);
  });
  return returned;
};

/**
 * Map the array of old YnabCategoryGroup implementing objects to a new array
 * of internal CategoryGroup implementing objects.
 *
 * @param categories
 * @returns
 */
const convertYnabCategoryData = (categories: YnabCategoryGroup[]): CategoryGroup[] => {
  return categories.map((ynabCategory: YnabCategoryGroup) => {
    // use utility function to do interface conversion
    const newCategoryGroup: CategoryGroup =
      convertYnabCategoryGroupToCategoryGroup(ynabCategory);
    return newCategoryGroup;
  });
};

/**
 * Transforms the categories response from YNAB to a CategoryData internal interface implementing
 * object.
 *
 * @param categories
 * @returns
 */
export const processCategories = (categories: YnabCategoryGroup[]): CategoryData => {
  // declare the CategoryData implementing object
  const categoryData: CategoryData = {
    categories: [],
    subCategoryReverseMap: {},
    subcategories: [],
  };
  // filter the incoming data
  const filteredCategories: YnabCategoryGroup[] = filterCategories(categories);
  // transform category data from YNAB into internal CategoryGroup type
  categoryData.categories = convertYnabCategoryData(filteredCategories);
  categoryData.subCategoryReverseMap = createReverseMap(categoryData.categories);
  categoryData.subcategories = getSubcategories(categoryData.categories);
  return categoryData;
};
