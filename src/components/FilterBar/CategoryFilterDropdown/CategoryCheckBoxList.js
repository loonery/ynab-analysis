import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectTransactionCategories } from "../../../store/selectors/transactionSliceSelectors"
import { addCheckBoxSection } from "store/slices/filterBarSlice"
import CategoryCheckBoxSection from './CategoryCheckBoxSection'

const CategoryCheckBoxList = () => {

    const dispatch = useDispatch();

    // get all transaction categories and store the parent categories in an array
    const transactionCategories = useSelector(state => selectTransactionCategories(state));
    const categoryGroups = Object.keys(transactionCategories);

    useEffect(() => {
        // Create an object that looks like this for each parent category and 
        // store it in state.
        // {
        //     categoryGroupName: String,
        //     checked: Boolean
        //     subCategoryObjects: [{checkboxObject}, {...}, {...}],
        // }
        for (let categoryGroupName of categoryGroups) {
            const subCategories = transactionCategories[categoryGroupName];
            const subCategoryObjects = subCategories.sort().map((subCategoryName) => {
                return {
                    subCategoryName, 
                    checked: true
                }
            });
            const sectionObject = {
                categoryGroupName,
                checked: true,
                subCategoryObjects
            }
            dispatch(addCheckBoxSection(sectionObject));
        }
    }, [transactionCategories]);


    const { tempCategoryCheckBoxes } = useSelector(state => state.filterBar.categoryDropdown);    
    return (
        tempCategoryCheckBoxes.map((sectionObject, index) => {
            return <CategoryCheckBoxSection checkBoxSection={sectionObject}/>
        })
    )
}
export default CategoryCheckBoxList;