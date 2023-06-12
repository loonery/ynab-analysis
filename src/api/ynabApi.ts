import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Account } from 'interfaces/Account';
import { CategoryData } from 'interfaces/Category';
import { YnabAccountResponse } from 'interfaces/externalDataInterfaces/ynabAccount';
import { YnabCategoriesResponse } from 'interfaces/externalDataInterfaces/ynabCategory';
import {
  YnabTransaction,
  YnabTransactionsResponse,
} from 'interfaces/externalDataInterfaces/ynabTransaction';

import { API_BASE, GET_CATEGORIES_PATH, GET_TRANSACTIONS_PATH } from './consts/apiConsts';
import { AUTHORIZATION_STRING, GET_ACCOUNTS_PATH } from './consts/apiConsts';
import { processAccounts } from './utils/accountHelpers';
import { processCategories } from './utils/categoriesHelpers';

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
  }),
});

export const { useGetTransactionsQuery, useGetCategoriesQuery, useGetAccountsQuery } =
  ynabApi;
