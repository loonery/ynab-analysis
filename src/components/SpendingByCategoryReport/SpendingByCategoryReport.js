import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionsThunk } from "../../api/thunks/fetchTransactionsThunk";
import { selectFilteredTransactions } from "../../store/selectors/selectFilteredTransactions";

const SpendingByCategoryReport = () => {

    const { loading, error } = useSelector(state => state.transactions);
    const filteredTransactions = useSelector(state => selectFilteredTransactions(state));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTransactionsThunk());
    }, [dispatch]);
    
    if (loading) return <div>loading...</div>
    
    if (error) return <div>error</div>

    console.log(filteredTransactions);
    
    return (
        // the whole dashboard renders as a row within the container
        <div className="row mx-2 my-2 pt-3 border">
            <div className="col">
                Here is where we render the plot
                {/* House the category dropdown options */}
                {/* <CategorySelector /> */}

                {/* house the spending analysis plot */}
                {/* <SpendingAnalysisPlot   */}
                    {/* categoryDimension={categoryDimension} */}
                    {/* selectedCategoryItem={selectedCategoryItem}/> */}
            </div>
        </div>
    )
}
export default SpendingByCategoryReport;