import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import {fetchTransactionsThunk} from '../../api/thunks/fetchTransactionsThunk'
import {filterTransactions} from '../../store/slices/transactionsSlice'

const FilterBar = () => {

    const dispatch = useDispatch();


    // maybe export this to a constant
    const defaultFilters = {
        startDate: undefined, 
        endDate: undefined,
        filteredCategories: [],
        filteredAccounts: []
    }
    const [filter, setFilter] = useState(defaultFilters);   // filter the transactions
 
    useEffect(() => {
        dispatch(fetchTransactionsThunk());
    });

    const {transactions, loading, error} = useSelector(state => state.transactions);


    // return a component in loading and error cases 
    if (loading) { return <div>Loading...</div>}
    if (error) { return <div>Error in Filter Bar</div>}


    return (
        <div>Filter Bar Component</div>
    )

}
export default FilterBar;