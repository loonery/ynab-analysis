import { gql } from '@apollo/client'

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions 
        @rest(path: "", type: "transactions", endpoint: "transactions") {
            data 
        }
    }
`;

export const GET_TRANSACTION = gql`
    query GetTransaction {
        transaction(tid: $tid)
        @rest(path: "/:tid", type: "transaction", endpoint: "transactions") {
            data
        }
    }
`

export const GET_CATEGORY_GROUPS = gql`
    query GetCategoryGroups {
        categoryGroups
        @rest(path: "", type: "category_groups", endpoint: "categories")
    }
`