import { useMemo } from 'react';

import { Transaction } from 'api/interfaces/Transaction';
import { processTransactions } from 'api/utils/transactionHelpers';
import { useGetCategoriesQuery, useGetTransactionsQuery } from 'api/ynabApi';

export const useTransactionsWithCategories = (): {
  data: Transaction[] | undefined;
  isLoading: boolean;
} => {
  // query both categories and transactions
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: transactions, isLoading: transactionsLoading } =
    useGetTransactionsQuery();

  const isDataReady =
    !transactionsLoading && !categoriesLoading && transactions && categoryData;

  // processing of transactions is 'cached' via memoization. We can't
  // transform it using RTK query because we need the result of the
  // useGetCategories query to properly transform the transactions
  const memoizedTransactionTransformation = useMemo(() => {
    if (isDataReady) {
      return processTransactions(transactions, categoryData);
    }
    return [];
  }, [transactions, categoryData, isDataReady]);

  if (isDataReady) {
    return { data: memoizedTransactionTransformation, isLoading: false };
  }
  return { data: undefined, isLoading: true };
};
