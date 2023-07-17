import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Account } from 'interfaces/Account';
import { CategoryData } from 'interfaces/Category';
import { YnabAccountResponse } from 'interfaces/externalDataInterfaces/ynabAccount';
import {
  FullBudgetMonth,
  TruncatedBudgetMonth,
  YnabBudgetMonthsResponse,
  YnabFullBudgetMonthResponse,
} from 'interfaces/externalDataInterfaces/ynabBudgetMonth';
import { YnabCategoriesResponse } from 'interfaces/externalDataInterfaces/ynabCategory';
import {
  YnabTransaction,
  YnabTransactionsResponse,
} from 'interfaces/externalDataInterfaces/ynabTransaction';

import {
  API_BASE,
  GET_BUDGET_MONTHS_PATH,
  GET_CATEGORIES_PATH,
  GET_TRANSACTIONS_PATH,
} from './consts/apiConsts';
import { AUTHORIZATION_STRING, GET_ACCOUNTS_PATH } from './consts/apiConsts';
import { processAccounts } from './utils/accountUtils';
import { processCategories } from './utils/categoriesUtils';

export const ynabApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers) => headers.set('authorization', AUTHORIZATION_STRING),
  }),
  reducerPath: 'ynabApi',
  endpoints: (build) => ({
    getTransactions: build.query<YnabTransaction[], void>({
      query: () => GET_TRANSACTIONS_PATH,
      transformResponse: (response: YnabTransactionsResponse) => {
        // we don't transform much here because we need the categories query to do the
        // transformation we really want
        return response.data.transactions;
      },
    }),
    getCategories: build.query<CategoryData, void>({
      query: () => GET_CATEGORIES_PATH,
      transformResponse: (response: YnabCategoriesResponse) => {
        return processCategories(response.data.category_groups);
      },
    }),
    getAccounts: build.query<Account[], void>({
      query: () => GET_ACCOUNTS_PATH,
      transformResponse: (response: YnabAccountResponse) => {
        return processAccounts(response.data.accounts);
      },
    }),
    getTruncatedBudgetMonths: build.query<TruncatedBudgetMonth[], void>({
      query: () => GET_BUDGET_MONTHS_PATH,
      transformResponse: (response: YnabBudgetMonthsResponse) => {
        return response.data.months;
      },
    }),
    getFullBudgetMonth: build.query<FullBudgetMonth, string>({
      query: (month) => `${GET_BUDGET_MONTHS_PATH}/${month}`,
      transformResponse: (response: YnabFullBudgetMonthResponse) => {
        return response.data.month;
      },
    }),
    getAllBudgetMonths: build.query<FullBudgetMonth[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get all budget months
        const truncatedBudgetMonthsResponse = await fetchWithBQ(
          `${GET_BUDGET_MONTHS_PATH}`,
        );

        // error handling
        if (truncatedBudgetMonthsResponse.error)
          return { error: truncatedBudgetMonthsResponse.error as FetchBaseQueryError };

        const budgetMonthsData =
          truncatedBudgetMonthsResponse.data as YnabBudgetMonthsResponse;
        const months: string[] = budgetMonthsData.data.months.map((month) => month.month);

        let error: FetchBaseQueryError | undefined = undefined;
        const budgetMonthsResponse = months.map(async (month) => {
          const budgetMonthResponse = await fetchWithBQ(
            `${GET_BUDGET_MONTHS_PATH}/${month}`,
          );
          if (budgetMonthResponse.error) {
            error = budgetMonthResponse.error;
          }
          const innerData = budgetMonthResponse.data as YnabFullBudgetMonthResponse;
          return innerData.data.month;
        });
        const resolvedBudgetMonths = (await Promise.all(
          budgetMonthsResponse,
        )) as FullBudgetMonth[];

        return error ? { error } : { data: resolvedBudgetMonths };
      },
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetCategoriesQuery,
  useGetAccountsQuery,
  useGetAllBudgetMonthsQuery,
} = ynabApi;
