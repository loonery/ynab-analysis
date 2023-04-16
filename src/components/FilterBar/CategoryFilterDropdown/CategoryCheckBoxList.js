import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectTransactionCategories } from "../../../store/selectors/transactionSliceSelectors"
import { initCheckboxes } from "store/slices/filterBarSlice"
import CategoryCheckBoxSection from './CategoryCheckBoxSection'
import { assembleCategoryCheckboxObjects } from "../utils/filterBarUtils"
import { CATEGORY_DROPDOWN_KEYS } from "../consts/filterBarConsts"

const CategoryCheckBoxList = () => {

    const dispatch = useDispatch();

    // get all transaction categories and store the parent categories in an array
    const transactionCategories = useSelector(state => selectTransactionCategories(state));

    // the checkboxes we render are the ones that the user is manipulating, 
    // the 'temp' checkboxes. Temp is a copy of saved checkboxes on open.
    const { tempCategoryCheckBoxes } = useSelector(state => state.filterBar.categoryDropdown);    

    // assemble and initialize the category checkboxes on start
    useEffect(() => {
        const checkboxes = assembleCategoryCheckboxObjects(transactionCategories);
        dispatch(initCheckboxes({checkboxes, keys: CATEGORY_DROPDOWN_KEYS}));
    }, [transactionCategories]);

    return (
        tempCategoryCheckBoxes.map((sectionObject, index) => {
            return <CategoryCheckBoxSection 
                checkBoxSection={sectionObject} 
                keys={CATEGORY_DROPDOWN_KEYS}
            />
        })
    )
}
export default CategoryCheckBoxList;