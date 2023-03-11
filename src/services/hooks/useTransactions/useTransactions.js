import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../queries/queries";

export const useTransactions = () => {
    const budgetId = process.env.REACT_APP_BUDGET_ID;
    
    const { loading, error, data: transactions } = useQuery(
        GET_TRANSACTIONS, 
        {variables: {
            budgetId: budgetId
        }}
    );
    
    // once we have the data we process it 
    if (transactions) {
        
    // get category groups so that they can be matched with each child category in the flattened output
    let transactions = data;
    let categoryGroups = tr;

    let i = 0;
    while (i < transactions.length) {

        // get the transaction object
        let transaction = transactions[i];

        // if the transaction object is a split transaction...
        const subtransactions = transaction.subtransactions;
        if (subtransactions && subtransactions.length > 0) {

            // then process the subtransactions
            let newSubtransactions = subtransactions.map((subtransaction) => {
                
                // modify each subtransaction to have the same fields as its parent transaction
                const newTransaction = {...transaction, ...subtransaction};
                newTransaction.category_group_name = getCategoryGroupBySubcategoryId(categoryGroups, newTransaction.category_id);                 
                newTransaction.amount = newTransaction.amount / 1000;
                
                delete newTransaction.import_id
                delete newTransaction.transaction_id;   // deletes the parent transaction id
                delete newTransaction.subtransactions;
                delete newTransaction.import_payee_name;
                delete newTransaction.matched_transaction_id;
                delete newTransaction.import_payee_name_original;
                delete newTransaction.flag_color;

                formatTransactionDate(newTransaction);
                handleNullCategoryGroups(newTransaction);

                // return the subtransaction mutated to hold the same JSON format as the parent transaction
                return newTransaction;
            })

            // in the parent transaction's place, place its child transactions
            const parentTransactionIndex = transactions.indexOf(transaction);
            transactions.splice(parentTransactionIndex, 1, ...newSubtransactions);
            i += newSubtransactions.length; 

        } else {

            // if there are no subtransactions, just mutate the transaction's data
            transaction.category_group_name = getCategoryGroupBySubcategoryId(categoryGroups, transaction.category_id);
            transaction.amount = transaction.amount / 1000;
            
            delete transaction.import_id
            delete transaction.subtransactions;
            delete transaction.import_payee_name
            delete transaction.matched_transaction_id
            delete transaction.import_payee_name_original

            formatTransactionDate(transaction);
            handleNullCategoryGroups(transaction);

            // move to the next transaction
            i += 1;
        }
    }

        
        
    }




    return {loading, error, data}

}