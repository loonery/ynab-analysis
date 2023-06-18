import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { ALL_CATEGORIES_DIMENSION } from 'store/consts/consts';
import {
  selectCategoryDimension,
  selectSelectedCategoryGroup,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import styled from 'styled-components';

const StyledDollarValue = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const StyledMonth = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const getDotTooltipValues = (month, total, categoryDimension, categoryGroup) => {
  const monthString =
    categoryDimension === ALL_CATEGORIES_DIMENSION
      ? `${month} total spending`
      : `${month} spending for ${categoryGroup}`;
  const totalString = `$${total}`;
  return { monthString, totalString };
};

export const DotTooltip = ({ month, total }) => {
  const categoryDimension = useSelector((state) => selectCategoryDimension(state));
  const categoryGroup = useSelector((state) => selectSelectedCategoryGroup(state));

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
DotTooltip.propTypes = {
  month: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
export default DotTooltip;
