import { convertAmount } from './generalHelpers';

// ##############################
// Helpers
// ##############################
const formatTransactionDate = (transaction) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const transactionDate = new Date(transaction.date);
  let stringDate = transactionDate.toLocaleString('default', options);
  stringDate = stringDate.replace(',', '');
  stringDate = stringDate.split(' ');

  transaction.day = stringDate[1];
  transaction.month = stringDate[0];
  transaction.year = stringDate[2];
  transaction.month_year = stringDate[0] + ' ' + stringDate[2];
};

/**
 *
 * @param {*} categoryGroups
 * @param {*} subCategoryId
 * @returns
 */
const getCategoryGroupBySubcategoryId = (categoryGroups, subCategoryId) => {
  // for each category group
  for (let categoryGroup of categoryGroups) {
    // get an array of its subcategory ids
    let subcategories = categoryGroup.categories.map((subcategory) => {
      return subcategory.id;
    });

    // if any of those ids match the queried id, return the name of the category group
    if (subcategories.includes(subCategoryId)) {
      return {
        categoryGroupName: categoryGroup.name,
        categoryGroupId: categoryGroup.id,
      };
    }
  }
  return {
    categoryGroupName: undefined,
    categoryGroupId: undefined,
  };
};

// ##############################
// Main Flattener
// ##############################
/**
 *
 * @returns
 */
export const processTransactions = (transactions, categoryGroups) => {
  // copy the data to allow for direct mutation in the helper functions
  let transactionsCopy = transactions.map((transaction) =>
    Object.assign({}, transaction),
  );

  let i = 0;
  while (i < transactionsCopy.length) {
    // get the transaction object
    let transaction = transactionsCopy[i];

    // if the transaction object is a split transaction...
    const subtransactions = transaction.subtransactions;
    if (subtransactions && subtransactions.length > 0) {
      // then process the subtransactions
      let newSubtransactions = subtransactions.map((subtransaction) => {
        // modify each subtransaction to have the same fields as its parent transaction
        const newTransaction = { ...transaction, ...subtransaction };
        const { categoryGroupName, categoryGroupId } = getCategoryGroupBySubcategoryId(
          categoryGroups,
          newTransaction.category_id,
        );
        newTransaction.category_group_name = categoryGroupName;
        newTransaction.category_group_id = categoryGroupId;

        newTransaction.amount = newTransaction.amount / 1000;

        delete newTransaction.transaction_id; // deletes the parent transaction id
        delete newTransaction.subtransactions; // delete the attatched subtransactions

        formatTransactionDate(newTransaction);

        // return the subtransaction mutated to hold the same JSON format as the parent transaction
        return newTransaction;
      });

      // in the parent transaction's place, place its child transactions
      const parentTransactionIndex = transactionsCopy.indexOf(transaction);
      transactionsCopy.splice(parentTransactionIndex, 1, ...newSubtransactions);
      i += newSubtransactions.length;
    } else {
      // if there are no subtransactions, just mutate the transaction's data
      const { categoryGroupName, categoryGroupId } = getCategoryGroupBySubcategoryId(
        categoryGroups,
        transaction.category_id,
      );
      transaction.category_group_name = categoryGroupName;
      transaction.category_group_id = categoryGroupId;

      transaction.amount = convertAmount(transaction.amount);

      delete transaction.subtransactions;

      formatTransactionDate(transaction);

      // move to the next transaction
      i += 1;
    }
  }

  return transactionsCopy;
};
