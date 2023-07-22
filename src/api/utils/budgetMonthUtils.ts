import { BudgetMonth } from 'interfaces/BudgetMonth';
import {
  YnabBudgetCategory,
  YnabFullBudgetMonth,
} from 'interfaces/externalDataInterfaces/ynabBudgetMonth';

import { convertDateToMonthYear } from './generalUtils';
import { convertAmount } from './generalUtils';

export const processBudgetMonths = (
  budgetMonths: YnabFullBudgetMonth[],
): BudgetMonth[] => {
  return budgetMonths.map((budget): BudgetMonth => {
    const { day, month, year, month_year } = convertDateToMonthYear(budget.month);
    return {
      ...budget,
      income: convertAmount(budget.income),
      budgeted: convertAmount(budget.budgeted),
      activity: convertAmount(budget.activity),
      categories: budget.categories.map((category) => processBudgetCategory(category)),
      day,
      month,
      year,
      month_year,
    };
  });
};

const processBudgetCategory = (category: YnabBudgetCategory): YnabBudgetCategory => {
  const {
    budgeted,
    activity,
    balance,
    goal_target,
    goal_under_funded,
    goal_overall_funded,
    goal_overall_left,
  } = category;
  return {
    ...category,
    budgeted: convertAmount(budgeted),
    activity: convertAmount(activity),
    balance: convertAmount(balance),
    goal_overall_funded: goal_overall_funded ? convertAmount(goal_overall_funded) : null,
    goal_overall_left: goal_overall_left ? convertAmount(goal_overall_left) : null,
    goal_under_funded: goal_under_funded ? convertAmount(goal_under_funded) : null,
    goal_target: goal_target ? convertAmount(goal_target) : null,
  };
};
