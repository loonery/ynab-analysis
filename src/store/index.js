
import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "./slices/transactionsSlice";

const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
    }
});

export * from './apis/thunks/fetchTransactionsThunk'
export { store }