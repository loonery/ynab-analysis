import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import { filterTransactions } from '../../store/slices/transactionsSlice'
import { fetchTransactionsThunk } from "../../api/thunks/fetchTransactionsThunk";

const FilterBar = () => {

    // maybe export this to a constant
    const defaultFilters = {
        startDate: undefined, 
        endDate: undefined,
        filteredCategories: [],
        filteredAccounts: []
    }
    const [filter, setFilter] = useState(defaultFilters);       // filter the transactions
    const {transactions, error, loading} = useSelector(state => state.transactions); // get loading status of state

    if (loading) {<div>loading</div>}

    if (error) {<div>Error loading transactions</div>}

    

    // otherwise return 
    return (
        <div>Filter Bar Component</div>
    )

}
export default FilterBar;