import { BUDGET_MONTH_GOAL_TYPES } from 'consts/consts';

export interface YnabTruncatedBudgetMonth {
  month: string;
  note: string;
  income: number;
  budgeted: number;
  activity: number;
  to_be_budgeted: number;
  age_of_money: number;
  deleted: boolean;
}

export interface YnabFullBudgetMonth extends YnabTruncatedBudgetMonth {
  categories: YnabBudgetCategory[];
}

export interface YnabBudgetCategory {
  id: string;
  category_group_id: string;
  category_group_name?: string;
  name: string;
  hidden: boolean;
  original_category_group_id?: null;
  note?: string;
  budgeted: number;
  activity: number;
  balance: number;
  goal_day?: number | null;
  goal_cadence?: number | null;
  goal_type?: BudgetGoalType | null;
  goal_cadence_frequency?: number | null;
  goal_creation_month?: string | null;
  goal_target?: number | null;
  goal_target_month?: string | null;
  goal_percentage_complete?: number | null;
  goal_months_to_budget?: number | null;
  goal_under_funded?: number | null;
  goal_overall_funded?: number | null;
  goal_overall_left?: number | null;
  deleted: boolean;
}

export type BudgetGoalType = (typeof BUDGET_MONTH_GOAL_TYPES)[number];

export interface YnabBudgetMonthsResponse {
  data: {
    months: YnabTruncatedBudgetMonth[];
    server_knowledge: number;
  };
}
export interface YnabFullBudgetMonthResponse {
  data: {
    month: YnabFullBudgetMonth;
    server_knowledge: number;
  };
}
