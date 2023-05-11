import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { ALL_CATEGORIES_DIMENSION } from 'store/consts/consts';
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

const getBarTooltipValues = (payload, dataKey, categoryDimension, categoryGroup) => {
  // construct the values to be shown in the tooltip
  const { month } = payload;

  const dollarValue = payload[dataKey];
  const percentOfTotal = payload
    ? ((payload[dataKey] / payload.total) * 100).toFixed(2)
    : undefined;
  const percentString =
    categoryDimension === ALL_CATEGORIES_DIMENSION
      ? `${percentOfTotal}% of ${month} spending`
      : `${percentOfTotal}% of ${month} ${categoryGroup} spending`;

  const categoryName = dataKey;
  return { categoryName, dollarValue, percentString };
};

const BarTooltip = ({ payload, dataKey }) => {
  // need dimension and category group to get proper tooltip text
  const categoryDimension = useSelector((state) => selectCategoryDimension(state));
  const categoryGroup = useSelector((state) => selectSelectedCategoryGroup(state));

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
BarTooltip.propTypes = {
  payload: PropTypes.object.isRequired,
  dataKey: PropTypes.string.isRequired,
};

export default BarTooltip;
