import React from "react"
import { useSelector } from "react-redux"
import { selectTransactionCategories } from "../../../store/selectors/transactionSliceSelectors"
import CategoryCheckBoxSection from './CategoryCheckBoxSection'

const CategoryCheckBoxList = () => {

    const transactionCategories = useSelector(state => selectTransactionCategories(state));
    const parentCategories = Object.keys(transactionCategories);

    return (
        parentCategories.sort().map((categoryGroupName, index) => {
            const categoryNames = transactionCategories[categoryGroupName];
            return <CategoryCheckBoxSection 
                id={'parent-checkbox-'+index}
                categoryGroupName={categoryGroupName} 
                categoryNames={categoryNames}
            />
        })
    )
}
export default CategoryCheckBoxList;