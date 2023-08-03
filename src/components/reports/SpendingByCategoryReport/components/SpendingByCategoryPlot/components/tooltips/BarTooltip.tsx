import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { selectCategoryNameById } from 'store/selectors/dataSelectors/categorySelectors';

import { useTooltipState } from '../../../../hooks/useTooltipState';
import { getBarTooltipValues } from '../../../../utils/plotUtils';
import { BarTooltipProps } from '../../interfaces/interfaces';
import {
  StyledCategoryName,
  StyledDollarValue,
  StyledPercentage,
} from '../../styles/styles';
// eslint-disable-next-line
export const BarTooltip = ({ payload, dataKey }: BarTooltipProps) => {
  // need dimension and category group to get proper tooltip text
  const { selectedCategoryDimension, selectedCategoryGroupName } = useTooltipState();

  // datakey is a string id that needs to be matched with its meaningful category name
  const { data: categoryName } = useSelector((state: RootState) =>
    selectCategoryNameById(state, dataKey),
  );

  // get text values for tooltip and apply to component
  const { dollarValue, percentString } = getBarTooltipValues(
    payload,
    dataKey,
    selectedCategoryDimension,
    selectedCategoryGroupName,
  );
  return categoryName ? (
    <Fragment>
      <StyledCategoryName>{categoryName}</StyledCategoryName>
      <StyledDollarValue>${dollarValue}</StyledDollarValue>
      <StyledPercentage>{percentString}</StyledPercentage>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};

export default BarTooltip;
