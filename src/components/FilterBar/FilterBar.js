import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from 'react'
import { selectTransactionDateRange } from "../../store/selectors/transactionSliceSelectors";
import CategoryCheckBoxList from "./CategoryCheckBoxList";

const FilterBar = () => {

    const {earliest, latest} = useSelector(state => selectTransactionDateRange(state));
    const { appliedFilters } = useSelector(state => state.transactions);
    const [filters, setFilters] = useState(appliedFilters);
    
    return (
        <Fragment>
            <div>Filter Bar Component</div>
            <CategoryCheckBoxList/>
        </Fragment>
    )

}
export default FilterBar;