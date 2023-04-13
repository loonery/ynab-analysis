import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectTransactionCategories } from "../../../store/selectors/transactionSliceSelectors"
import { addCheckBoxSection, initCategoryCheckboxes } from "store/slices/filterBarSlice"
import CategoryCheckBoxSection from './CategoryCheckBoxSection'
import { assembleCategoryCheckboxObjects } from "../utils/filterBarUtils"

const CategoryCheckBoxList = () => {

    const dispatch = useDispatch();

    // get all transaction categories and store the parent categories in an array
    const transactionCategories = useSelector(state => selectTransactionCategories(state));

    // the checkboxes we render are the ones that the user is manipulating, 
    // the 'temp' checkboxes. Temp is a copy of saved checkboxes on open.
    const { tempCategoryCheckBoxes } = useSelector(state => state.filterBar.categoryDropdown);    

    useEffect(() => {
        const checkboxes = assembleCategoryCheckboxObjects(transactionCategories);
        dispatch(initCategoryCheckboxes(checkboxes));
    }, [transactionCategories]);

    return (
        tempCategoryCheckBoxes.map((sectionObject, index) => {
            return <CategoryCheckBoxSection checkBoxSection={sectionObject}/>
        })
    )
}
export default CategoryCheckBoxList;