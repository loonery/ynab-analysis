import { useQuery } from "@apollo/client";
import { GET_CATEGORY_GROUPS, GET_TRANSACTIONS } from "../../queries/queries";
import { getFlattenedTransactions } from "./useTransactionHelper";

export const useTransactions = () => {

    // create the query object to be returned
    const query = {loading: true, error: undefined, transactions: undefined}
    
    // use the queries defined in the queries file to get the data 
    const { loading: cLoading, error: cError, data: categoryGroupsPayload} = useQuery(GET_CATEGORY_GROUPS);
    const { loading: tLoading, error: tError, data: transactionsPayload } = useQuery(GET_TRANSACTIONS);

    if (!cLoading && !tLoading) {
        query.loading = false;
        const transactions = transactionsPayload.transactions;
        const categoryGroups = categoryGroupsPayload.categoryGroups;
        query.transactions = getFlattenedTransactions(transactions, categoryGroups);
    } 
    else if (cError || tError) {
        query.error = (cError ? cError : tError)
    } 

    return query;
}
