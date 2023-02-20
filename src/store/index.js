import {configureStore, createSlice } from '@reduxjs/toolkit'
import transactions from "../assets/transactions.json"

const transactionSlice = configureStore({
    name: 'transactions',
    initialState: transactions,
    reducers : {
        
    }
});

// configure the store 
const store = configureStore({
    reducer: {
        transactions: transactionSlice.reducer
    }
})

console.log(store);