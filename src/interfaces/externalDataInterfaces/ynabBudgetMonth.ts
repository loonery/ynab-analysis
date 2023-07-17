import { BUDGET_MONTH_GOAL_TYPES } from 'consts/consts';

export interface TruncatedBudgetMonth {
  month: string;
  note: string;
  income: number;
  budgeted: number;
  activity: number;
  to_be_budgeted: number;
  age_of_money: number;
  deleted: boolean;
}

export interface FullBudgetMonth extends TruncatedBudgetMonth {
  categories: BudgetCategory[];
}

export interface BudgetCategory {
  id: string;
  category_group_id: string;
  category_group_name: string;
  name: string;
  hidden: boolean;
  original_category_group_id: null;
  note: string;
  budgeted: number;
  activity: number;
  balance: number;
  goal_type: BudgetGoalType;
  goal_day: number;
  goal_cadence: number;
  goal_cadence_frequency: number;
  goal_creation_month: string;
  goal_target: number;
  goal_target_month: string;
  goal_percentage_complete: number;
  goal_months_to_budget: number;
  goal_under_funded: number;
  goal_overall_funded: number;
  goal_overall_left: number;
  deleted: boolean;
}

export type BudgetGoalType = (typeof BUDGET_MONTH_GOAL_TYPES)[number];

export interface YnabBudgetMonthsResponse {
  data: {
    months: TruncatedBudgetMonth[];
    server_knowledge: number;
  };
}
export interface YnabFullBudgetMonthResponse {
  data: {
    month: FullBudgetMonth;
    server_knowledge: number;
  };
}
