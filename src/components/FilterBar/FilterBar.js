import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import { filterTransactions } from '../../store/slices/transactionsSlice'
import { fetchTransactionsThunk } from "../../api/thunks/fetchTransactionsThunk";

const FilterBar = () => {

    // otherwise return 
    return (
        <div>Filter Bar Component</div>
    )

}
export default FilterBar;