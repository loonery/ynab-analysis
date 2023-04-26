import React from 'react';
import { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SelectElement from 'libs/reuse/elements/Select';
import {
  selectDatesAfterStartDate,
  selectTempDateRange,
} from 'store/selectors/filterBarSelectors';
import {
  selectTransactionDateRange,
  selectTransactionDates,
} from 'store/selectors/transactionSliceSelectors';
import {
  initDateDropdown,
  updateStartDate,
  updateEndDate,
} from 'store/slices/componentSlices/filterBarSlice';

import {
  DATE_DROPDOWN_FROM_ID,
  DATE_DROPDOWN_FROM_LABEL,
  DATE_DROPDOWN_TO_ID,
  DATE_DROPDOWN_TO_LABEL,
} from '../../consts/filterBarConsts';

const DateFilterForm = () => {
  const dispatch = useDispatch();
  const largestRange = useSelector((state) => selectTransactionDateRange(state));
  useEffect(() => {
    dispatch(initDateDropdown(largestRange));
  }, [largestRange]);

  // get the currently selected startDate and endDate from state
  const { startDate, endDate } = useSelector((state) => selectTempDateRange(state));
  console.log({ startDate, endDate });

  // only should be allowed to select dates that occur after any selected start date
  const fromOptions = useSelector((state) => selectTransactionDates(state));
  const toOptions = useSelector((state) => selectDatesAfterStartDate(state));

  return (
    <Fragment>
      <SelectElement
        options={fromOptions}
        label={DATE_DROPDOWN_FROM_LABEL}
        id={DATE_DROPDOWN_FROM_ID}
        value={startDate}
        onChange={(e) => dispatch(updateStartDate(e.target.value))}
      />
      <SelectElement
        options={toOptions}
        label={DATE_DROPDOWN_TO_LABEL}
        id={DATE_DROPDOWN_TO_ID}
        value={endDate}
        onChange={(e) => dispatch(updateEndDate(e.target.value))}
      />
    </Fragment>
  );
};
export default DateFilterForm;
