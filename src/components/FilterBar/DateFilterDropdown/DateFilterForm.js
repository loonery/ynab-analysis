import SelectElement from "libs/reuse/elements/Select";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactionDates } from "store/selectors/transactionSliceSelectors";
import { Fragment } from "react";

import { 
    DATE_DROPDOWN_FROM_ID, 
    DATE_DROPDOWN_FROM_LABEL,
    DATE_DROPDOWN_TO_ID,
    DATE_DROPDOWN_TO_LABEL
} from "../consts/filterBarConsts";
import { selectDatesAfterStartDate, selectTempStartDate } from "store/selectors/filterBarSelectors";


const DateFilterForm = () => {

    const dispatch = useDispatch();
    const fromOptions = useSelector(state => selectTransactionDates(state));
    const selectedFrom = useSelector(state => selectTempStartDate(state));

    // only should be allowed to select dates that occur after any selected start date
    const toOptions = useSelector(state => selectDatesAfterStartDate(state));

    const handleToChange = () => {
        
    }

    const handleFromChange = () => {

    }
    
    return (
        <Fragment>
            <SelectElement 
                options={fromOptions} 
                label={DATE_DROPDOWN_FROM_LABEL} 
                id={DATE_DROPDOWN_FROM_ID}
                onChange={handleToChange}
            />
            <SelectElement 
                options={toOptions} 
                label={DATE_DROPDOWN_TO_LABEL} 
                id={DATE_DROPDOWN_TO_ID}
                onChange={handleFromChange}
            />
        </Fragment>
    );


}
export default DateFilterForm;