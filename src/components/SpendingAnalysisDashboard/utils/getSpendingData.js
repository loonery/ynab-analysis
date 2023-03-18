import {group, sort} from 'd3'

/**
 * 
 * @param {*} transaction 
 * @returns 
 */
const commonFilter = (transaction) => {
    if (transaction.category_group_name === "Starting Balance" || 
        transaction.category_group_name === "Internal Master Category" ||
        transaction.category_group_name === "-- INACTIVE & ARCHIVE --" ||
        transaction.category_group_name === "Reimbursements" || transaction.deleted) 
    {
        return false;
    } else {
        return true;
    }
}


/**
 * The 'constructor' for the data aggregation object
 */ 
export const getTransactionHirearchy = (transactions) => {
    const filteredTransactions = transactions.filter(commonFilter);
    const groupedTransactions = group(
        filteredTransactions, 
        t => t.category_group_name, 
        t => t.category_name,
        t => t.month_year
    );
    return groupedTransactions;
}

/**
 * 
 * @param {*} transactionHirearchy 
 * @param {*} categoryDimension 
 * @param {*} selectedCategoryItem 
 * @returns 
 */
export const getCategories = (transactionHirearchy, categoryDimension, selectedCategoryItem) => {
    if (categoryDimension === 'category_group_name') // when we want all categories
    {  
        return getCategoryGroups(transactionHirearchy);
    } 
    else if (categoryDimension === 'category_name') // when we want one set of subcategories
    { 
        return getSubcategories(transactionHirearchy, categoryDimension, selectedCategoryItem);
    } 
    else if (categoryDimension === 'single_category') // when we want a single category
    {
        return [selectedCategoryItem];
    }
}

/**
 * 
 * @param {*} transactionHirearchy 
 * @returns 
 */
export const getCategoryGroups = (transactionHirearchy) => {
    const categoryGroups = sort(Array.from(transactionHirearchy.keys()));
    return categoryGroups;
}

/**
 * 
 * @param {*} transactionHirearchy 
 * @param {*} categoryDimension 
 * @param {*} selectedCategoryItem 
 * @returns 
 */
export const getSubcategories = (transactionHirearchy, categoryDimension, selectedCategoryItem) => {
    if (categoryDimension === 'category_group_name') // when we want all categories
    {  
        return [];
    } 
    else if (categoryDimension === 'category_name') // when we want one set of subcategories
    { 
        const subcategories = sort(Array.from(transactionHirearchy.get(selectedCategoryItem).keys()));
        return subcategories;
    } 
    else if (categoryDimension === 'single_category') // when we want a single category
    {
        const parent = getParentOfSubcategory(transactionHirearchy, selectedCategoryItem);
        const subcategories = sort(Array.from(transactionHirearchy.get(parent).keys()));
        return subcategories;
    }
}

/**
 * 
 * @param {*} transactionHirearchy 
 * @param {*} categoryDimension 
 * @param {*} selectedCategoryItem 
 * @returns 
 */
export const getActiveMonthsSums = (transactionHirearchy, categoryDimension, selectedCategoryItem) => {

    const sumsByMonth = new Map();
    if (categoryDimension === 'category_group_name') // // when the selectedCategoryItem is a categoryGroup...
    {   
        // for each subcategory of the selected parentCategory...
        const categoryGroupMap = transactionHirearchy.get(selectedCategoryItem);
        categoryGroupMap.forEach((monthToTransactionMap) => {
            populateMonthlySumMap(monthToTransactionMap, sumsByMonth);
        })
    } 
    else // when the selectedCategoryItem is a subcategory
    { 
        const parent = getParentOfSubcategory(transactionHirearchy, selectedCategoryItem);
        const singleCategoryMap = transactionHirearchy.get(parent).get(selectedCategoryItem);   // the spending for just the subcategory
        // map that subcategory's activemonths to sums of each active month
        populateMonthlySumMap(singleCategoryMap, sumsByMonth);  
    } 

    return sumsByMonth;
}

/**
 * 
 * @param {*} transactionHirearchy 
 * @param {*} categoryDimension 
 * @param {*} categoryItem 
 * @returns 
 */
export const getTotalSpending = (transactionHirearchy, categoryDimension, categoryItem) => {
    
    // if we want total spending for all categories
    const totalsByMonth = new Map();
    if (categoryDimension === 'category_group_name') {
        transactionHirearchy.forEach(categoryGroupMap => {
            categoryGroupMap.forEach(subCategoryMap => {
                populateMonthlySumMap(subCategoryMap, totalsByMonth);
            });
        });
    } 
    else if (categoryDimension === 'category_name')  
    { // if we want total spending for some category group
        const parent = getParentOfSubcategory(transactionHirearchy, categoryItem);
        const parentCategoryGroupMap = parent ? transactionHirearchy.get(parent) : transactionHirearchy.get(categoryItem);
        parentCategoryGroupMap.forEach((monthToTransactionMap) => {
            populateMonthlySumMap(monthToTransactionMap, totalsByMonth);
        });
    } 
    else if (categoryDimension === 'single_category') 
    { // if we want total spending for some subcategory
        const parent = getParentOfSubcategory(transactionHirearchy, categoryItem);
        const monthToTransactionMap = transactionHirearchy.get(parent).get(categoryItem);
        populateMonthlySumMap(monthToTransactionMap, totalsByMonth);
    }
    return totalsByMonth;
}


/**
 * 
 * @param {*} transactionHirearchy 
 * @param {*} subcategory 
 * @returns 
 */
export const getParentOfSubcategory = (transactionHirearchy, subcategory) => {
    let returned;
    transactionHirearchy.forEach((_, key) => {
        if (transactionHirearchy.get(key).has(subcategory)){
            returned = key;
        }
    });
    return returned;
}

////////////////////////
// helper functions below
////////////////////////

// takes a map of a subcategory's active months to the transactions in that month
// and sums up the spending for each of those months
const populateMonthlySumMap = (subCategoryMap, sumsByMonth) => {
    // map a subcategory's activemonths to sums of each active month
    subCategoryMap.forEach((monthlyTransactions, month) => {
        const categoryValues = monthlyTransactions.map(transaction => transaction.amount);    // get just amounts from objects
        const monthlyCategorySum = Math.abs(categoryValues.reduce((acc, curr) => acc + curr));          // get sum of amounts for month
        
        if (sumsByMonth.has(month)) {
            const currentSum = sumsByMonth.get(month);
            sumsByMonth.set(month, currentSum + monthlyCategorySum)
        } else {
            sumsByMonth.set(month, monthlyCategorySum)
        }
    });
}