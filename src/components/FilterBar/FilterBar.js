import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import {fetchTransactionsThunk} from '../../api/thunks/fetchTransactionsThunk'

const FilterBar = () => {
    
    // fetch transactions on 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTransactionsThunk());
    }, [dispatch]);

    const {transactions, loading, error} = useSelector(state => state.transactions);

    // maybe export this to a constant
    const defaultFilters = {
        dateFilter: {
            startDate: undefined, 
            endDate: undefined
        },
        categoryFilter: [],
        accountFilter: []
    }

    const [filter, setFilter] = useState(defaultFilters);


    if (loading) { return <div>Loading...</div>}
    if (error) { return <div>Error in Filter Bar</div>}

    return (
        <div>Filter Bar Component</div>
    )

}
export default FilterBar;