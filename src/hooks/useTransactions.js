import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../queries/queries";

export const useTransactions = () => {
    const budgetId = process.env.REACT_APP_BUDGET_ID;
    
    const { loading, error, data } = useQuery(
        GET_TRANSACTIONS, 
        {variables: {
            budgetId: budgetId
        }}
    );
    
    console.log('Loading: ', loading, "error: ", error, "Data: ", data);

}