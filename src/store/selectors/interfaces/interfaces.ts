import { MonthYear } from 'store/interfaces/types/MonthYear';

export const TOTAL_MONTHLY_SPENDING_KEY = 'totalMonthlySpending';
export const CATEGORY_GROUP_NAME_KEY = 'categoryGroupName';
export const CATEGORY_GROUP_TOTAL_KEY = 'categoryGroupTotal';
export const CATEGORY_GROUPS_MAP_KEY = 'categoryGroupSpendingMap';

export const SUB_CATEGORY_SPENDING_VALUE_KEY = 'subCategorySpendingValue';
export const SUB_CATEGORY_NAME_KEY = 'subCategoryName';
export const SUBCATEGORY_MAP_KEY = 'subCategorySpendingMap';
// Interface for subcategory data
export interface SubCategorySpendingData {
  [SUB_CATEGORY_NAME_KEY]: string;
  [SUB_CATEGORY_SPENDING_VALUE_KEY]: number;
}

// Interface for category group data
export interface CategoryGroupSpendingData {
  [CATEGORY_GROUP_NAME_KEY]: string;
  [CATEGORY_GROUP_TOTAL_KEY]: number;
  [SUBCATEGORY_MAP_KEY]: Map<string, SubCategorySpendingData>;
}

// Interface for monthly data
export interface MonthlySpendingData {
  [TOTAL_MONTHLY_SPENDING_KEY]: number;
  [CATEGORY_GROUPS_MAP_KEY]: Map<string, CategoryGroupSpendingData>;
}

// Main data structure
export type MonthlySpendingMap = Map<MonthYear, MonthlySpendingData>;

// export interface MonthlySpendingObject {
//   totalMonthlySpending: number;
//   categoryGroupSpendingMap: ;
// }

// export interface CategoryGroupSpendingObject {
//   [categoryGroupId: string]: {
//     totalCategorySpending: number;
//     [subCategoryId: string]: number;
//   };
//
