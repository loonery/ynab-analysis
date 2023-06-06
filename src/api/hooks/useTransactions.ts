import { YnabTransaction } from 'api/interfaces/externalDataInterfaces/ynabTransaction';
import { useGetCategoriesQuery, useGetTransactionsQuery } from 'api/ynabApi';

export const useTransactionsWithCategories = (): {
  transactions: YnabTransaction[] | undefined;
  isLoading: boolean;
} => {
  // query both categories and transactions
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: transactions, isLoading: transactionsLoading } =
    useGetTransactionsQuery();

  // processing of transactions is 'cached' via memoization. We can't
  // transform it using RTK query because we need the result of the
  // useGetCategories query to properly transform the transaciotns
  const memoizedTransactionTransformation = useMemo(() => {
    return processTransactions(transactions, categoryData);
  }, [transactions, categoryData]);

  // both categories and transactions must be fulfilled to have category groups associated with
  // transactions
  if (!transactionsLoading && !categoriesLoading && transactions && categories) {
    return { transactions, isLoading: false };
  }
  return { transactions: undefined, isLoading: true };
};
