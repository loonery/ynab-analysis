import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  border: 0.75px solid #ccc;
  box-shadow: 0 0 5px #ccc;
  font-size: 14px;
`;

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

const getTooltipValues = (tooltipPayload) => {
  const dataKey = tooltipPayload.dataKey;
  const data = tooltipPayload.payload;
  const month = tooltipPayload.month;

  const dollarValue = data[dataKey];
  return { dollarValue, month };
};

const TotalTooltip = ({ show, tooltipPayload }) => {
  // if no data, return null
  if (!tooltipPayload || !show) return null;

  // get text values for tooltip and apply to component
  const { dollarValue, month } = getTooltipValues(tooltipPayload);
  return (
    <TooltipContainer>
      <StyledCategoryName>{month}</StyledCategoryName>
      <StyledDollarValue>${dollarValue}</StyledDollarValue>
      <StyledPercentage>Total Spending</StyledPercentage>
    </TooltipContainer>
  );
};
TotalTooltip.propTypes = {
  show: PropTypes.bool.isRequired,
  tooltipPayload: PropTypes.arrayOf(PropTypes.object),
};

export default TotalTooltip;
