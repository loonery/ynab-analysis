import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const API_TOKEN = process.env.REACT_APP_API_KEY;
export const BUDGET_ID = process.env.REACT_APP_BUDGET_ID;
export const API_BASE = 'https://api.youneedabudget.com/v1';
export const defaultHeaders = {authorization: `Bearer ${process.env.REACT_APP_API_KEY}`}

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.youneedabudget.com/v1',
    prepareHeaders: (headers) => {
        const token = (process.env.REACT_APP_API_KEY);
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
})