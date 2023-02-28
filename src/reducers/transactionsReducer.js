import {createSlice } from '@reduxjs/toolkit'
import transactions from "../assets/transactions.json"

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: transactions,
});
export default transactionSlice.reducer;