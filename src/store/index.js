
import { configureStore } from "@reduxjs/toolkit";
import { filterBarReducer } from "./slices/filterBarSlice";
import { transactionsReducer } from "./slices/transactionsSlice";

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filterBar: filterBarReducer
  }
});

export * from "../api/thunks/fetchTransactionsThunk";
export { store };