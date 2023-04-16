import SelectElement from "libs/reuse/elements/SelectElement";
import { useSelector } from "react-redux";
import { selectTransactionDates } from "store/selectors/transactionSliceSelectors";
import { Fragment } from "react";

import { 
    DATE_DROPDOWN_FROM_ID, 
    DATE_DROPDOWN_FROM_LABEL,
    DATE_DROPDOWN_TO_ID,
    DATE_DROPDOWN_TO_LABEL
} from "../consts/filterBarConsts";


const DateFilterForm = () => {

    const fromOptions = useSelector(state => selectTransactionDates(state));
    const toOptions = fromOptions.filter((date) => true);
    
    return (
        <Fragment>
            <SelectElement 
                options={fromOptions} 
                label={DATE_DROPDOWN_FROM_LABEL} 
                id={DATE_DROPDOWN_FROM_ID}
            />
            <SelectElement 
                options={toOptions} 
                label={DATE_DROPDOWN_TO_LABEL} 
                id={DATE_DROPDOWN_TO_ID}/>
        </Fragment>
    );


}
export default DateFilterForm;