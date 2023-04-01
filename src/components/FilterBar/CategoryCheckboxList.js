import React from "react"
import { useSelector } from "react-redux"
import { selectTransactionCategories } from "../../store/selectors/transactionSliceSelectors"

const CategoryCheckboxList = () => {

    const { transactionCategories } = useSelector(selectTransactionCategories(state));

    const parentCategories = Object.keys(transactionCategories);
    

    
}