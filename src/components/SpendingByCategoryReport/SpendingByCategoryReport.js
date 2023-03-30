import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionsThunk } from "../../api/thunks/fetchTransactionsThunk";
import { selectFilteredTransactions } from "../../store/selectors/transactionSliceSelectors";

const SpendingByCategoryReport = () => {

    // fetch the transactions
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTransactionsThunk());
    }, [dispatch]);
    
    // get the transactions and assess the state
    const { loading, error } = useSelector(state => state.transactions);
    const filteredTransactions = useSelector(state => selectFilteredTransactions(state));

    // return when we don't have transactions
    if (loading) return <div>loading...</div>
    if (error) return <div>error</div>

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