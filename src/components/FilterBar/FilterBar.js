import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import {filterTransactions} from '../../store/slices/transactionsSlice'
import { fetchTransactionsThunk } from "../../api/thunks/fetchTransactionsThunk";

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

    const {filteredTransactions, loading, error} = useSelector(state => state.transactions);

    if (loading || error ) return <div>booo</div>
    // otherwise return 
    return (
        <div>Filter Bar Component</div>
    )

}
export default FilterBar;