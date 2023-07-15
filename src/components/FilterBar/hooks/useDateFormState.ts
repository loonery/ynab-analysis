import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { OptionInterface } from 'libs/reuse/elements/form-controls/interfaces/interfaces';
import { getOptionsFromValues } from 'libs/utils/utils';
import { RootState } from 'store';
import { MonthYear } from 'store/interfaces/types/MonthYear';
import {
  selectDatesAfterStartDate,
  selectTempDateRange,
} from 'store/selectors/componentSelectors/filterBarSelectors';
import {
  selectTransactionDateRange,
  selectTransactionDates,
} from 'store/selectors/dataSelectors/transactionSliceSelectors';
import { initDateDropdown } from 'store/slices/filterBarSlice';

export const useDateFormState = (): {
  toOptions: OptionInterface<string>[];
  fromOptions: OptionInterface<string>[];
  startDate: MonthYear | undefined;
  endDate: MonthYear | undefined;
} => {
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
  const { data: fromOptions = [] } = useSelector((state: RootState) =>
    selectTransactionDates(state),
  );
  const { data: toOptions = [] } = useSelector((state: RootState) =>
    selectDatesAfterStartDate(state),
  );

  let allowedFromOptions: OptionInterface<string>[] = [];
  let allowedToOptions: OptionInterface<string>[] = [];
  if (toOptions && fromOptions) {
    allowedFromOptions = getOptionsFromValues(fromOptions) as OptionInterface<string>[];
    allowedToOptions = getOptionsFromValues(toOptions) as OptionInterface<string>[];
  }

  return {
    startDate,
    endDate,
    toOptions: allowedToOptions,
    fromOptions: allowedFromOptions,
  };
};
