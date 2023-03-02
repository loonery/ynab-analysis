import {group, rollup, sum, sort} from 'd3'

/**
 * 
 * @param {*} transaction 
 * @returns 
 */
const commonFilter = (transaction) => {
    if (transaction.category_group_name === "Starting Balance" || 
        transaction.category_group_name === "Internal Master Category" ||
        transaction.category_group_name === "-- INACTIVE & ARCHIVE --" ||
        transaction.category_group_name === "Reimbursements")
    {
        return false;
    } else {
        return true;
    }
}

/**
 * 
 * @param {*} transactions 
 * @param {*} categoryDimension 
 * @param {*} selectedCategory 
 * @returns 
 */
export const getSpendingRollup = (transactions, categoryDimension, selectedCategory) => {
    if (categoryDimension === "category_group_name") {
        return rollupByCategoryGroup(transactions);
    } 
    else if (categoryDimension === "category_name") {
        return getRollupBySubcategory(transactions, selectedCategory);
    } 
    else if (categoryDimension === "single_category") {
        return getRollupBySingleSubcategory(transactions, selectedCategory);
    }
}

/**
 * Gets rolled up spending on the basis of category group. Returned map has structure
 * Subcategory => monthYear => spending in that period for that category.
 * 
 * @param {*} transactions - The transactions to be rolled up.
 * @returns A map of 1 chosen subcategory's spending, mapped to 
 *          their spending in each active budget period. 
 */
const getRollupBySingleSubcategory = (transactions, selectedCategory) => {

    // rollup transactions on subcategories of selected category group
    const filteredTransactions = transactions.filter(commonFilter);
    const spendingRollup = rollup(filteredTransactions, 
        t=> Math.abs(sum(t, i=>i.amount)),
        t=> t.category_name,
        t=> t.month_year
    );
    const returnedMap = new Map();
    returnedMap.set(selectedCategory, spendingRollup.get(selectedCategory))
    return returnedMap;
}

/**
 * Gets rolled up spending on the basis of category group. Returned map has structure
 * Subcategory => monthYear => spending in that period for that category.
 * 
 * @param {*} transactions - The transactions to be rolled up.
 * @returns A map of subcategories, specified by their parent category group, \
 *          mapped to their spending in each active budget period. 
 */
const getRollupBySubcategory = (transactions, parentCategory) => {

    // rollup transactions on subcategories of selected category group
    const filteredTransactions = transactions.filter(commonFilter);
    const spendingRollup = rollup(filteredTransactions, 
        t=> Math.abs(sum(t, i=>i.amount)),
        t=> t.category_group_name,
        t=> t.category_name,
        t=> t.month_year
    );
    return spendingRollup.get(parentCategory);
}

/**
 * Gets rolled up spending on the basis of category group. Returned map has structure
 * CategoryGroup => monthYear => spending in that period for that category.
 * 
 * @param {*} transactions - The transactions to be rolled up.
 * @returns A map of category groups to their spending in each active budget period. 
 */
export const rollupByCategoryGroup = (transactions) => {
    const filteredTransactions = transactions.filter(commonFilter);
    const spendingRollup = rollup(filteredTransactions, 
        t=> Math.abs(sum(t, i=>i.amount)), 
        t=> t.category_group_name,
        t=> t.month_year
    );
    return spendingRollup;
}

/**
 * Returns an array of unique CategoryGroups
 * 
 * @param {*} transactions - the transactions who's categories we are getting
 * @returns an array of unique CategoryGroups
 */
export const getCategoryGroups = (transactions) => {
    const filteredTransactions = transactions.filter(commonFilter);
    const categoryGroups = group(filteredTransactions, t => t.category_group_name);
    return sort(Array.from(categoryGroups.keys()));
}

/**
 * 
 * @param {*} transactions 
 * @returns Array of all unique category groups
 */
export const getSubcategories = (transactions) => {
    const filteredTransactions = transactions.filter(commonFilter);
    const categoryGroups = group(filteredTransactions, t => t.category_name);
    return sort(Array.from(categoryGroups.keys()));
}

/**
 * 
 * @param {*} transactions 
 * @returns Array of all unique category groups
 */
export const getSubcategoriesOfCategoryGroup = (transactions, categoryGroup) => {
    const filteredTransactions = transactions.filter(commonFilter);
    const categoryGroups = group(filteredTransactions, t => t.category_group_name, t => t.category_name);
    return sort(Array.from(categoryGroups.get(categoryGroup).keys()));
}

/**
 * 
 * @param {*} spendingMap 
 * @param {*} subcategory 
 */
export const getSubcategoriesOfSibling = (transactions, subcategory) => {
    const filteredTransactions = transactions.filter(commonFilter);
    const categoryGroups = group(filteredTransactions, t => t.category_group_name, t => t.category_name);
    let returned;
    categoryGroups.forEach((value, key) => {
        if (categoryGroups.get(key).has(subcategory)){
            returned = Array.from(categoryGroups.get(key).keys());
        }
    });
    return returned;
}

export const getParentOfSubcategory = (transactions, subcategory) => {
    const filteredTransactions = transactions.filter(commonFilter);
    const categoryGroups = group(filteredTransactions, t => t.category_group_name, t => t.category_name);
    let returned;
    categoryGroups.forEach((value, key) => {
        if (categoryGroups.get(key).has(subcategory)){
            returned = key;
        }
    });
    return returned;
}

/**
 * 
 * @param {*} transactions 
 * @returns 
 */
const getSummedSpendingByMonth = (spendingData) => {
    const spendingSums = new Map();
    spendingData = Array.from(spendingData.values());
    spendingData.forEach(categorySpendingMap => {
        categorySpendingMap.forEach((value, key) => {
            if (spendingSums.has(key)) {
                spendingSums.set(key, (value + spendingSums.get(key)));
            } else {
                spendingSums.set(key, value);
            }
        })
    })

    return spendingSums;
}

export const getSummedSpending = (spendingData) => {
    const summedSpending = getSummedSpendingByMonth(spendingData);
    return summedSpending;
}

export const getSumsOfCategory = (spendingMap, categoryItem) => {
   const sums = Array.from(spendingMap.get(categoryItem).values());
   return sums;
}

export const getActiveMonthsOfCategory = (spendingMap, categoryItem) => {
    return Array.from(spendingMap.get(categoryItem).keys());
}