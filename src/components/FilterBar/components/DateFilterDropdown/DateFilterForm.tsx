import React from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import SelectElement from 'libs/reuse/elements/form-controls/components/Select';
import { getOptionsFromValues } from 'libs/utils/utils';
import { RootState } from 'store';
import {
  selectDatesAfterStartDate,
  selectTempDateRange,
} from 'store/selectors/componentSelectors/filterBarSelectors';
import {
  selectTransactionDateRange,
  selectTransactionDates,
} from 'store/selectors/dataSelectors/transactionSliceSelectors';
import {
  initDateDropdown,
  updateStartDate,
  updateEndDate,
} from 'store/slices/filterBarSlice';

import {
  DATE_DROPDOWN_FROM_ID,
  DATE_DROPDOWN_FROM_LABEL,
  DATE_DROPDOWN_TO_ID,
  DATE_DROPDOWN_TO_LABEL,
} from '../../consts/filterBarConsts';

// eslint-disable-next-line
const DateFilterForm = () => {
  const dispatch = useDispatch();

  const largestRange = useSelector((state: RootState) =>
    selectTransactionDateRange(state),
  );

  useEffect(() => {
    dispatch(initDateDropdown(largestRange));
  }, [largestRange]);

  // get the currently selected startDate and endDate from state
  const { startDate, endDate } = useSelector((state: RootState) =>
    selectTempDateRange(state),
  );

  // only should be allowed to select dates that occur after any selected start date
  const { data: fromOptions, isLoading: fromOptionsLoading } = useSelector(
    (state: RootState) => selectTransactionDates(state),
  );
  const { data: toOptions, isLoading: toOptionsLoading } = useSelector(
    (state: RootState) => selectDatesAfterStartDate(state),
  );

  const dataLoading =
    !toOptions || toOptionsLoading || !fromOptions || fromOptionsLoading;

  return (
    <FlexContainer className={'justify-content-around'}>
      {!dataLoading ? (
        <>
          <SelectElement
            options={getOptionsFromValues(fromOptions)}
            label={DATE_DROPDOWN_FROM_LABEL}
            id={DATE_DROPDOWN_FROM_ID}
            value={startDate}
            onChange={(value): void => {
              dispatch(updateStartDate(value));
            }}
          />
          <SelectElement
            options={getOptionsFromValues(toOptions)}
            label={DATE_DROPDOWN_TO_LABEL}
            id={DATE_DROPDOWN_TO_ID}
            value={endDate}
            onChange={(value): void => {
              dispatch(updateEndDate(value));
            }}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </FlexContainer>
  );
};
export default DateFilterForm;
