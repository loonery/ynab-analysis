import { gql } from '@apollo/client'

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions(budgetId: $budgetId) 
        @rest(path: "/:budgetId/transactions", type: "transactions", endpoint: "budgets") {
            data 
        }
    }
`;
