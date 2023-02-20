
import { getBudgetTransactions, getCategoryGroups, getBudgetMonth, getBudgetMonths } from "./getYnabData";


// ##############################
// Budgets
// ##############################

/**
 * Returns an array of JSON objects that each represent the budget information for 1 category in each monthly budget. For example, 
 * if there are 4 months with active budgets, there will be 4 objects for each category in the whole array, each object representing
 * information about that category for each monthly budget that it belongs to.
 * 
 * @returns an array of JSON objects that each represent the budget information for 1 category in each monthly budget.
 */
export const getFlattenedBudgetMonths = async () => {

    // get category groups so that they can be matched with each child category in the flattened output
    const categoryGroups = await getCategoryGroups();

    // get a list of active budget months
    let activeMonths = await getBudgetMonths();
    activeMonths = activeMonths.data.months;
    activeMonths = activeMonths.filter((budget) => {return budget.budgeted !== 0})
    activeMonths = activeMonths.map((month) => month.month);

    // get each active month's data from the api
    let budgetMonths = [];
    for (let month of activeMonths) {
        const budgetMonth = await getBudgetMonth(month);
        budgetMonths.push(budgetMonth.month);
    }

    // for each month where there is an active budget...
    let categoriesByMonth = []
    for (let budget of budgetMonths) {
        
        // get the categories of each budget object
        const categories = budget.categories;
        
        // deleteing unnecessary attributes
        delete budget.note;
        delete budget.deleted;
        delete budget.categories;
        delete budget.to_be_budgeted;

        // renaming some attributes
        budget.total_income = budget.income; delete budget.income;
        budget.total_activity = budget.activity; delete budget.activity;
        budget.total_budgeted = budget.budgeted; delete budget.budgeted;

        // reformatting the amounts to be in usd
        budget.total_income = budget.total_income / 1000;
        budget.total_activity = budget.total_activity / 1000;
        budget.total_budgeted = budget.total_budgeted / 1000;

        // push to the csv each budget's category, along with information about the budget that category belongs to
        categoriesByMonth.push(categories.map((category) => {

            // renaming some attributes
            category.category_name = category.name; delete category.name;
            category.category_balance = category.balance; delete category.balance;
            category.category_budgeted = category.budgeted; delete category.budgeted;
            category.category_activity = category.activity; delete category.activity;
            
            // deleteing unnecessary attributes
            delete category.id;
            delete category.note;
            delete category.hidden;
            delete category.deleted;
            delete category.original_category_group_id;
            
            // reformatting the amounts to be in usd
            category.goal_target = category.goal_target / 1000;
            category.category_balance = category.category_balance / 1000;
            category.goal_under_funded = category.goal_under_funded / 1000;
            category.goal_overall_left = category.goal_overall_left / 1000;
            category.category_activity = category.category_activity / 1000;
            category.category_budgeted = category.category_budgeted / 1000;
            category.goal_overall_funded = category.goal_overall_funded / 1000;
            
            // create a field for the category group that the category belongs to
            category.category_group_name = getCategoryGroupById(categoryGroups, category.category_group_id); delete category.category_group_id

            // each row contains information about the month's total budget, and the specific amounts budgeted for each
            // category in that month 
            return {...budget, ...category}
        }))
    }

    // flatten the array
    categoriesByMonth = categoriesByMonth.flat();
    return categoriesByMonth;
}

/**
 * 
 * @param {*} categoryGroups 
 * @param {*} categoryGroupId 
 * @returns 
 */
const getCategoryGroupById = (categoryGroups, categoryGroupId) => {
    categoryGroups = categoryGroups.filter(categoryGroup => categoryGroup.id === categoryGroupId);
    return categoryGroups[0].name;
}

// ##############################
// Transactions
// ##############################

/**
 * 
 * @returns 
 */
export const getFlattenedTransactions = async () => {

    // get category groups so that they can be matched with each child category in the flattened output
    let transactions = await getBudgetTransactions().catch(error => console.log(error));
    let categoryGroups = await getCategoryGroups().catch(error => console.log(error));

    let i = 0;
    while (i < transactions.length) {

        // get the transaction object
        let transaction = transactions[i];

        // if the transaction object is a split transaction...
        const subtransactions = transaction.subtransactions;
        if (subtransactions && subtransactions.length > 0) {

            // then process the subtransactions
            let newSubtransactions = subtransactions.map((subtransaction) => {
                
                // modify each subtransaction to have the same fields as its parent transaction
                const newTransaction = {...transaction, ...subtransaction};
                newTransaction.category_group_name = getCategoryGroupBySubcategoryId(categoryGroups, newTransaction.category_id);                 
                newTransaction.amount = newTransaction.amount / 1000;
                
                delete newTransaction.import_id
                delete newTransaction.transaction_id;   // deletes the parent transaction id
                delete newTransaction.subtransactions;
                delete newTransaction.import_payee_name;
                delete newTransaction.matched_transaction_id;
                delete newTransaction.import_payee_name_original;
                delete newTransaction.flag_color;

                formatTransactionDate(newTransaction);

                // return the subtransaction mutated to hold the same JSON format as the parent transaction
                return newTransaction;
            })

            // in the parent transaction's place, place its child transactions
            const parentTransactionIndex = transactions.indexOf(transaction);
            transactions.splice(parentTransactionIndex, 1, ...newSubtransactions);
            i += newSubtransactions.length; 

        } else {

            // if there are no subtransactions, just mutate the transaction's data
            transaction.category_group_name = getCategoryGroupBySubcategoryId(categoryGroups, transaction.category_id);
            transaction.amount = transaction.amount / 1000;
            
            delete transaction.import_id
            delete transaction.subtransactions;
            delete transaction.import_payee_name
            delete transaction.matched_transaction_id
            delete transaction.import_payee_name_original

            formatTransactionDate(transaction);

            // move to the next transaction
            i += 1;
        }
    }

    return transactions;
} 

const getCategoryGroupBySubcategoryId = (categoryGroups, subCategoryId) => {

    // for each category group
    for (let categoryGroup of categoryGroups) {
        
        // get an array of its subcategory ids
        let subcategories = categoryGroup.categories.map((subcategory) => {
            return subcategory.id;
        });

        // if any of those ids match the queried id, return the name of the category group
        if (subcategories.includes(subCategoryId)) {
            return categoryGroup.name;
        }
    }
}

/**
 * 
 * @param {*} transaction 
 */
const formatTransactionDate = (transaction) => {

    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const transactionDate = new Date(transaction.date)
    let stringDate = transactionDate.toLocaleString('default', options);
    stringDate = stringDate.replace(",", "");
    stringDate = stringDate.split(" ");
    
    transaction.day = stringDate[1];
    transaction.month = stringDate[0];
    transaction.year = stringDate[2];
    transaction.month_year = stringDate[0] + ' ' + stringDate[2];
}