export interface YnabCategoryGroup {
  id: string;
  // eslint-disable-next-line no-restricted-globals
  name: string;
  hidden: boolean;
  deleted: boolean;
  categories: YnabCategory[];
}

export interface YnabCategory {
  id: string;
  category_group_id: string;
  category_group_name: string;
  // eslint-disable-next-line no-restricted-globals
  name: string;
  hidden: boolean;
  original_category_group_id: string;
  note: string;
  budgeted: number;
  activity: number;
  balance: number;
  goal_type: string;
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

export interface YnabCategoriesResponse {
  data: {
    data: {
      category_groups: YnabCategoryGroup[];
      server_knowledge: number;
    };
  };
}
