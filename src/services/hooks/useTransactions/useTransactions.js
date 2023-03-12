import { useQuery } from "@apollo/client";
import { GET_CATEGORY_GROUPS, GET_TRANSACTIONS } from "../../queries/queries";
import { getFlattenedTransactions } from "./useTransactionHelper";

export const useTransactions = () => {
    const budgetId = process.env.REACT_APP_BUDGET_ID;
    const query = {loading: true, error: undefined, data: undefined}
    
    // use the queries defined in the queries file to get the data 
    const { loading: tLoading, error: tError, data: transactions } = useQuery(
        GET_TRANSACTIONS, 
        {variables: {
            budgetId: budgetId
        }}
    );

    const { loading: cLoading, error: cError, data: categoryGroups } = useQuery(GET_CATEGORY_GROUPS);

    if (!cLoading && tLoading) {
        query.loading = false;
    } 
    else if (cError || tError) {
        query.error = (cError ? cError : tError)
    } 
    
    // if we have the data we can send it to be processed
    else if (transactions && categoryGroups) {
        query.data = getFlattenedTransactions(transactions, categoryGroups);
    }

    return query;
}
