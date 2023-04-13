// Create an object that looks like this for each parent category and return them
// as an array
// {
//     categoryGroupName: String,
//     checked: Boolean
//     subCategoryObjects: [{checkboxObject}, {...}, {...}],
// }
export const assembleCategoryCheckboxObjects = (transactionCategories) => {

    const categoryGroups = Object.keys(transactionCategories);
    const categoryCheckboxObjects = categoryGroups.map((categoryGroupName) => {
        
        const subCategories = transactionCategories[categoryGroupName];
        const subCategoryObjects = subCategories.sort().map((subCategoryName) => {
            return {
                subCategoryName, 
                checked: true
            }
        });
        return {
            categoryGroupName,
            checked: true,
            subCategoryObjects
        }
    });
    return categoryCheckboxObjects;
}