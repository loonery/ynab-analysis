import React, { Fragment } from 'react';

import { useTooltipState } from '../../../hooks/useTooltipState';
import { getBarTooltipValues } from '../../../utils/plotUtils';
import { BarTooltipProps } from '../interfaces/interfaces';
import {
  StyledCategoryName,
  StyledDollarValue,
  StyledPercentage,
} from '../styles/styles';
// eslint-disable-next-line
export const BarTooltip = ({ payload, dataKey }: BarTooltipProps) => {
  // need dimension and category group to get proper tooltip text
  const { selectedCategoryDimension, selectedCategoryGroupName } = useTooltipState();

  // get text values for tooltip and apply to component
  const { categoryName, dollarValue, percentString } = getBarTooltipValues(
    payload,
    dataKey,
    selectedCategoryDimension,
    selectedCategoryGroupName,
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
