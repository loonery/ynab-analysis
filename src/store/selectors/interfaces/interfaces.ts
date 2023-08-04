import {
  SUB_CATEGORY_NAME_KEY,
  SUB_CATEGORY_SPENDING_VALUE_KEY,
  CATEGORY_GROUPS_MAP_KEY,
  CATEGORY_GROUP_NAME_KEY,
  CATEGORY_GROUP_TOTAL_KEY,
  SUBCATEGORY_MAP_KEY,
  TOTAL_MONTHLY_SPENDING_KEY,
} from 'store/consts/consts';
import { MonthYear } from 'store/interfaces/types/MonthYear';

// Interface for subcategory data
export interface SubCategorySpendingData {
  [SUB_CATEGORY_NAME_KEY]: string;
  [SUB_CATEGORY_SPENDING_VALUE_KEY]: number;
}

// Interface for category group data
export interface CategoryGroupSpendingData {
  [CATEGORY_GROUP_NAME_KEY]: string;
  [CATEGORY_GROUP_TOTAL_KEY]: number | string;
  [SUBCATEGORY_MAP_KEY]: Map<string, SubCategorySpendingData>;
}

// Interface for monthly data
export interface MonthlySpendingData {
  [TOTAL_MONTHLY_SPENDING_KEY]: number | string;
  [CATEGORY_GROUPS_MAP_KEY]: Map<string, CategoryGroupSpendingData>;
}

// parent data structure
export type MonthlySpendingMap = Map<MonthYear, MonthlySpendingData>;
