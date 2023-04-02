import React from "react"
import { useSelector } from "react-redux"
import { selectTransactionCategories } from "../../store/selectors/transactionSliceSelectors"
import CategoryCheckBoxSection from './CategoryCheckBoxSection'

const CategoryCheckBoxList = () => {

    const transactionCategories = useSelector(state => selectTransactionCategories(state));

    // 'undefined check' the categories as we wait for the transactions to load
    const parentCategories = Object.keys(transactionCategories);

    return (
        parentCategories.sort().map((parentName) => {
            const childNames = transactionCategories[parentName];
            return <CategoryCheckBoxSection 
                parentName={parentName} 
                childNames={childNames}
            />
        })
    )

    
}
export default CategoryCheckBoxList;