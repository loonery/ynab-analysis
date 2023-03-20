import { gql } from '@apollo/client'

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions 
        @rest(path: "", type: "transaction", endpoint: "transactions") {
            id
            date
            amount
            memo
            cleared
            approved
            account_id
            payee_id
            category_id
            transfer_account_id
            transfer_transaction_id
            deleted
            account_name
            payee_name
            category_name
            subtransactions
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
        @rest(path: "", type: "category_groups", endpoint: "categories") {
            id
            name
            hidden
            categories {
                id
                category_group_id
                name
            }
        }
    }
`