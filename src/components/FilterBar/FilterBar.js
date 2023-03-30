import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import { selectTransactionDateMargins } from "../../store/selectors/transactionSliceSelectors";

const FilterBar = () => {

    const { appliedFilters } = useSelector(state => state.transactions);
    const [filters, setFilters] = useState(appliedFilters);
    const {earliest, latest} = useSelector(selectTransactionDateMargins(state));

    return (
        <div>Filter Bar Component</div>
    )

}
export default FilterBar;