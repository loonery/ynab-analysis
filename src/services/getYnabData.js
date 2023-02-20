import * as dotenv from 'dotenv'
import * as ynab from 'ynab';
dotenv.config("../../.env");

const accessToken = process.env.API_KEY;
const budgetId = process.env.BUDGET_ID;
const ynabAPI = new ynab.API(accessToken);

/**
 * 
 * @returns 
 */
export const getBudgetTransactions = async () => {
    const transactions = await ynabAPI.transactions.getTransactions(budgetId);
    return transactions.data.transactions;
}

/**
 * Gets 1 budget month encapsulated in a JSON object.
 * 
 * @param {string} month - the calendar month of the budget you are trying to get.
 * @returns a JSON object representing all information for that budget month.
 */
export const getBudgetMonth = async (month) => {
    const budgetMonth = await ynabAPI.months.getBudgetMonth(budgetId, month)
    return budgetMonth.data;
}


/**
 * 
 * @returns 
 */
export const getBudgetMonths = async () => {
    const budgetMonths = await ynabAPI.months.getBudgetMonths(budgetId);
    return budgetMonths;
}

/**
 * 
 * @returns 
 */
export const getCategoryGroups = async () => {
    const categories = await ynabAPI.categories.getCategories(budgetId);
    return categories.data.category_groups;
}
