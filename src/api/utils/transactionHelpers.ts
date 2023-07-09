import { CategoryData, CategoryGroup, SubCategory } from 'interfaces/Category';
import {
  YnabSubtransaction,
  YnabTransaction,
} from 'interfaces/externalDataInterfaces/ynabTransaction';
import { Transaction } from 'interfaces/Transaction';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import { convertAmount } from './generalHelpers';

const convertYnabTransactionToTransaction = (
  transaction: YnabTransaction,
  categoryData: CategoryData,
): Transaction => {
  const { day, month, year, month_year } = getTransactionDate(transaction);
  const subCategoryId: string = transaction.category_id;
  return {
    account_id: transaction.account_id,
    account_name: transaction.account_name,
    amount: convertAmount(transaction.amount),
    approved: transaction.approved,
    cleared: transaction.cleared,
    date: transaction.date,
    debt_transaction_type: transaction.debt_transaction_type,
    deleted: transaction.deleted,
    flag_color: transaction.flag_color,
    id: transaction.id,
    import_id: transaction.import_id,
    import_payee_name: transaction.import_payee_name,
    import_payee_name_original: transaction.import_payee_name_original,
    matched_transaction_id: transaction.matched_transaction_id,
    memo: transaction.memo,
    payee_id: transaction.payee_id,
    payee_name: transaction.payee_name,
    transfer_account_id: transaction.transfer_account_id,
    transfer_transaction_id: transaction.transfer_transaction_id,
    // initialize the keys that do not exist on YnabTransaction interface
    category_group: getCategoryGroupBySubcategoryId(categoryData, subCategoryId),
    subcategory: getSubcategoryBySubcategoryId(categoryData, subCategoryId),
    month,
    month_year,
    day,
    year,
  };
};

const convertYnabSubtransactionToTransaction = (
  categoryData: CategoryData,
  subtransaction: YnabSubtransaction,
  parentTransaction: YnabTransaction,
): Transaction => {
  const { day, month, year, month_year } = getTransactionDate(parentTransaction);
  const subCategoryId = subtransaction.category_id;
  return {
    account_id: parentTransaction.account_id,
    account_name: parentTransaction.account_name,
    approved: parentTransaction.approved,
    cleared: parentTransaction.cleared,
    date: parentTransaction.date,
    debt_transaction_type: parentTransaction.debt_transaction_type,
    flag_color: parentTransaction.flag_color,
    import_id: parentTransaction.import_id,
    import_payee_name: parentTransaction.import_payee_name,
    import_payee_name_original: parentTransaction.import_payee_name_original,
    matched_transaction_id: parentTransaction.matched_transaction_id,
    id: subtransaction.id,
    amount: convertAmount(subtransaction.amount),
    memo: subtransaction.memo,
    payee_id: subtransaction.payee_id,
    payee_name: subtransaction.payee_name,
    transfer_account_id: subtransaction.transfer_account_id,
    transfer_transaction_id: subtransaction.transfer_transaction_id,
    deleted: subtransaction.deleted,
    // initialize the keys that do not exist on YnabTransaction interface
    category_group: getCategoryGroupBySubcategoryId(categoryData, subCategoryId),
    subcategory: getSubcategoryBySubcategoryId(categoryData, subCategoryId),
    month,
    month_year,
    day,
    year,
  };
};

/**
 *
 * @param transaction
 */
const getTransactionDate = (
  transaction: YnabTransaction,
): { day: string; month: string; year: string; month_year: MonthYear } => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  };

  // parse the date as a string array
  const transactionDate: Date = new Date(transaction.date);
  let stringDate: string | string[] = transactionDate.toLocaleString('default', options);
  stringDate = stringDate.replace(',', '');
  stringDate = stringDate.split(' ');

  // assign the different portions of the date to keys on the transaction
  const day = stringDate[1];
  const month = stringDate[0];
  const year = stringDate[2];
  const month_year: MonthYear = (stringDate[0] + ' ' + stringDate[2]) as MonthYear;
  return { day, month, year, month_year };
};

/**
 *
 * @param categoryData
 * @param subCategoryId
 * @returns
 */
const getCategoryGroupBySubcategoryId = (
  categoryData: CategoryData,
  subCategoryId: string,
): CategoryGroup | undefined => {
  return categoryData.subCategoryReverseMap[subCategoryId];
};

const getSubcategoryBySubcategoryId = (
  categoryData: CategoryData,
  subCategoryId: string,
): SubCategory | undefined => {
  const categoryGroup = categoryData.subCategoryReverseMap[subCategoryId];
  return categoryGroup.subCategories.find(
    (subcategory) => subcategory.id === subCategoryId,
  );
};

/**
 *
 * @param transactions
 * @param categoryGroups
 * @returns
 */
export const processTransactions = (
  transactions: YnabTransaction[],
  categoryData: CategoryData,
): Transaction[] => {
  const newTransactionsArray: Transaction[] = [];

  transactions.forEach((transaction: YnabTransaction) => {
    // if the transaction object is a split transaction...
    const subtransactions: YnabSubtransaction[] | undefined = transaction.subtransactions;
    if (subtransactions && subtransactions.length > 0) {
      // modify each subtransaction to implement the Transaction interface
      const newSubtransactions = subtransactions.map(
        (subtransaction: YnabSubtransaction) => {
          const newTransaction: Transaction = convertYnabSubtransactionToTransaction(
            categoryData,
            subtransaction,
            transaction,
          );
          return newTransaction;
        },
      );
      newTransactionsArray.push(...newSubtransactions);
    } else {
      const newTransaction: Transaction = convertYnabTransactionToTransaction(
        transaction,
        categoryData,
      );
      newTransactionsArray.push(newTransaction);
    }
  });
  return newTransactionsArray;
};
