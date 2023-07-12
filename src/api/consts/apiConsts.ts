export const API_TOKEN: string | undefined = process.env.REACT_APP_API_KEY;
export const BUDGET_ID: string | undefined = process.env.REACT_APP_BUDGET_ID;

export const API_BASE = 'https://api.youneedabudget.com/v1';

// default headers for ynab api call
export const AUTHORIZATION_STRING = `Bearer ${process.env.REACT_APP_API_KEY}`;

// YNAB Service Paths
export const GET_TRANSACTIONS_PATH = `/budgets/${BUDGET_ID}/transactions`;
export const GET_CATEGORIES_PATH = `/budgets/${BUDGET_ID}/categories`;
export const GET_ACCOUNTS_PATH = `/budgets/${BUDGET_ID}/accounts`;
