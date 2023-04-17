import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchTransactionsThunk} from '../../../../api/thunks/fetchTransactionsThunk';

const CategorySelector = () => {

    // fetch transactions on 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTransactionsThunk());
    }, [dispatch]);

    const {filteredTransactions, loading, error} = useSelector(state => state.transactions);

    if (error || loading) { return <div>something happenning</div>}
    
    return (
    <div className="row">
        <div className="col">
            <div className="d-flex">
                {/* wraps both select items */}
                <div>
                    {/* select input group */}
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label 
                                className="input-group-text" 
                                htmlFor="categoryGroupDrilldownSelect">
                                Category Group
                            </label>
                        </div>

                        {/* Category Group select box */}
                        <select 
                            className="custom-select"
                            id="categoryGroupDrilldownSelect"
                            onChange={() => {}}
                            // value in the dropdown is the selected item, or the parent
                            // of the selected item if the selected item is a subcategory
                            value={''}>
                            
                            {/* enumerate the choices */}
                            {['','',''].map(() => {
                            return (
                                <option 
                                    className="btn dropdown-toggle"
                                    value={'option'}>
                                    'option'
                                </option>
                            )
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
export default CategorySelector;