import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import { selectTransactionDateRange } from "../../store/selectors/transactionSliceSelectors";

const FilterBar = () => {

    const {earliest, latest} = useSelector(state => selectTransactionDateRange(state));
    const { appliedFilters } = useSelector(state => state.transactions);
    const [filters, setFilters] = useState(appliedFilters);
    
    return (
        <div>Filter Bar Component</div>
    )

}
export default FilterBar;