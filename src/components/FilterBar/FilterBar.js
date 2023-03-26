import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react'
import {fetchTransactionsThunk} from '../../api/thunks/fetchTransactionsThunk'

const FilterBar = () => {
    
    // fetch transactions on 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTransactionsThunk());
    }, [dispatch]);

    const {transactions, loading, error} = useSelector(state => state.transactions);

    if (error || loading) { return <div>something happenning</div>}

    return <div>ayyy</div> 

}
export default FilterBar;