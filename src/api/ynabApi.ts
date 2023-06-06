import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AUTHORIZATION_STRING } from './consts/apiConsts';
import { API_BASE, GET_CATEGORIES_PATH, GET_TRANSACTIONS_PATH } from './consts/apiConsts';
import { CategoryData } from './interfaces/Category';
import { YnabCategoriesResponse } from './interfaces/externalDataInterfaces/ynabCategory';
import {
  YnabTransaction,
  YnabTransactionsResponse,
} from './interfaces/externalDataInterfaces/ynabTransaction';
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
        return response.data.transactions;
      },
    }),
    getCategories: build.query<CategoryData, void>({
      query: () => GET_CATEGORIES_PATH,
      transformResponse: (response: YnabCategoriesResponse) => {
        return processCategories(response.data.category_groups);
      },
    }),
  }),
});

export const { useGetTransactionsQuery, useGetCategoriesQuery } = ynabApi;
