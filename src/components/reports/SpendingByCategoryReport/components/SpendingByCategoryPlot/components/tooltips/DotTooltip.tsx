import React, { Fragment } from 'react';

import { useTooltipState } from '../../../../hooks/useTooltipState';
import { getDotTooltipValues } from '../../../../utils/plotUtils';
import { DotTooltipProps } from '../../interfaces/interfaces';
import { StyledMonth, StyledDollarValue } from '../../styles/styles';

// eslint-disable-next-line
export const DotTooltip = ({ month, total }: DotTooltipProps) => {
  const { selectedCategoryDimension, selectedCategoryGroupName } = useTooltipState();

  const { monthString, totalString } = getDotTooltipValues(
    month,
    total,
    selectedCategoryDimension,
    selectedCategoryGroupName,
  );
  return (
    <Fragment>
      <StyledMonth>{monthString}</StyledMonth>
      <StyledDollarValue>{totalString}</StyledDollarValue>
    </Fragment>
  );
};

export default DotTooltip;
