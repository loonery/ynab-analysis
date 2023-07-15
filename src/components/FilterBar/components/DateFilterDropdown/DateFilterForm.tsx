import React from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import Select from 'libs/reuse/elements/form-controls/components/Select';
import { OptionInterface } from 'libs/reuse/elements/form-controls/interfaces/interfaces';
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
    !toOptions ||
    toOptionsLoading ||
    !fromOptions ||
    fromOptionsLoading ||
    !startDate ||
    !endDate;

  let allowedFromOptions: OptionInterface<string>[] = [];
  let allowedToOptions: OptionInterface<string>[] = [];
  if (!dataLoading) {
    allowedFromOptions = getOptionsFromValues(fromOptions) as OptionInterface<string>[];
    allowedToOptions = getOptionsFromValues(toOptions) as OptionInterface<string>[];
  }

  return (
    <FlexContainer align={'stretch'} width={'100%'} justify={'space-evenly'}>
      {!dataLoading ? (
        <>
          <Select
            id={DATE_DROPDOWN_FROM_ID}
            options={allowedFromOptions}
            selectLabel={DATE_DROPDOWN_FROM_LABEL}
            value={startDate}
            isFloatingSelect={true}
            selectElementProps={{ flex: '1' }}
            onChange={(value): void => {
              dispatch(updateStartDate({ startDate: value }));
            }}
          />

          <Select
            id={DATE_DROPDOWN_TO_ID}
            options={allowedToOptions}
            selectLabel={DATE_DROPDOWN_TO_LABEL}
            value={endDate}
            isFloatingSelect={true}
            selectElementProps={{ flex: '1' }}
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
