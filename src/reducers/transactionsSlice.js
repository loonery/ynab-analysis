import { getStoredTransactions } from "../api/loadData"
import "./assets"


const intialState = {
    transactions : getStoredTransactions()
}