import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';

import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { CategoryGroup } from 'interfaces/Category';
import { RootState } from 'store';
import { ALL_CATEGORIES_DIMENSION } from 'store/consts/consts';
import { CategoryDimensions } from 'store/interfaces/SpendingAnalysisState';
import {
  selectCategoryDimension,
  selectSelectedCategoryGroup,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';

import { BarTooltipValues, BarTooltipProps } from './interfaces/interfaces';
import { StyledCategoryName, StyledDollarValue, StyledPercentage } from './styles/styles';

const getBarTooltipValues = (
  payload: SpendingChartData,
  dataKey: string,
  categoryDimension: CategoryDimensions,
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
