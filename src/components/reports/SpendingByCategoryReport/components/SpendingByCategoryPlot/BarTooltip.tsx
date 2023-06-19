import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';

import { CategoryGroup } from 'interfaces/Category';
import { RootState } from 'store';
import { ALL_CATEGORIES_DIMENSION } from 'store/consts/consts';
import { categoryDimensions } from 'store/interfaces/SpendingAnalysisState';
import { MonthYear } from 'store/interfaces/types/MonthYear';
import {
  selectCategoryDimension,
  selectSelectedCategoryGroup,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import styled from 'styled-components';

const StyledCategoryName = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const StyledDollarValue = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const StyledPercentage = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

interface BarTooltipValues {
  categoryName: string;
  dollarValue: number;
  percentString: string;
}

interface Payload {
  month: MonthYear;
  total: number;
  [dataKey: string]: number | MonthYear;
}

interface BarTooltipProps {
  payload: Payload;
  dataKey: string;
}

const getBarTooltipValues = (
  payload: Payload,
  dataKey: string,
  categoryDimension: categoryDimensions,
  categoryGroup: CategoryGroup | string,
): BarTooltipValues => {
  // construct the values to be shown in the tooltip
  const { month } = payload;

  const dollarValue: number = (payload[dataKey] as number) || 0;

  const percentOfTotal = payload
    ? ((dollarValue / payload.total) * 100).toFixed(2)
    : undefined;
  const percentString =
    categoryDimension === ALL_CATEGORIES_DIMENSION
      ? `${percentOfTotal}% of ${month} spending`
      : `${percentOfTotal}% of ${month} ${categoryGroup} spending`;

  return { categoryName: dataKey, dollarValue, percentString };
};

// eslint-disable-next-line
export const BarTooltip = ({ payload, dataKey }: BarTooltipProps) => {
  // need dimension and category group to get proper tooltip text
  const categoryDimension = useSelector((state: RootState) =>
    selectCategoryDimension(state),
  );
  const categoryGroup = useSelector((state: RootState) =>
    selectSelectedCategoryGroup(state),
  );

  // get text values for tooltip and apply to component
  const { categoryName, dollarValue, percentString } = getBarTooltipValues(
    payload,
    dataKey,
    categoryDimension,
    categoryGroup,
  );
  return (
    <Fragment>
      <StyledCategoryName>{categoryName}</StyledCategoryName>
      <StyledDollarValue>${dollarValue}</StyledDollarValue>
      <StyledPercentage>{percentString}</StyledPercentage>
    </Fragment>
  );
};

export default BarTooltip;
