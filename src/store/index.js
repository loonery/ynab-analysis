import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../reducers/transactionsReducer";

// configure the store 
const store = configureStore({
    reducer: {
        transactions: transactionsReducer
    }
})

export { store };