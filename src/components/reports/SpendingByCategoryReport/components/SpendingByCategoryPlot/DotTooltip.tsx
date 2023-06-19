import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';

import { CategoryGroup } from 'interfaces/Category';
import { RootState } from 'store';
import { categoryDimensions } from 'store/interfaces/SpendingAnalysisState';
import { MonthYear } from 'store/interfaces/types/MonthYear';
import {
  selectCategoryDimension,
  selectSelectedCategoryGroup,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import styled from 'styled-components';

export interface DotTooltipProps {
  month: MonthYear;
  total: number;
}

interface DotTooltipValues {
  monthString: string;
  totalString: string;
}

const StyledDollarValue = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const StyledMonth = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const getDotTooltipValues = (
  month: string,
  total: number,
  categoryDimension: categoryDimensions,
  categoryGroup: CategoryGroup | string,
): DotTooltipValues => {
  const monthString =
    categoryDimension === categoryDimensions.allCategoriesDimension
      ? `${month} total spending`
      : `${month} spending for ${categoryGroup}`;
  const totalString = `$${total}`;
  return { monthString, totalString };
};

// eslint-disable-next-line
export const DotTooltip = ({ month, total }: DotTooltipProps) => {
  const categoryDimension = useSelector((state: RootState) =>
    selectCategoryDimension(state),
  );
  const categoryGroup = useSelector((state: RootState) =>
    selectSelectedCategoryGroup(state),
  );

  const { monthString, totalString } = getDotTooltipValues(
    month,
    total,
    categoryDimension,
    categoryGroup,
  );
  return (
    <Fragment>
      <StyledMonth>{monthString}</StyledMonth>
      <StyledDollarValue>{totalString}</StyledDollarValue>
    </Fragment>
  );
};

export default DotTooltip;
