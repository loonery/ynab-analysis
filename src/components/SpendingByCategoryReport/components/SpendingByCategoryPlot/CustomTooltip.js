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

const CustomTooltip = (props) => {
  const { active, dataKey, payload, customPayload, showTooltip } = props;
  return active && payload && payload.length && customPayload && showTooltip ? (
    <TooltipContainer>
      <StyledCategoryName>{dataKey}</StyledCategoryName>
      <StyledDollarValue>${customPayload[dataKey]}</StyledDollarValue>
    </TooltipContainer>
  ) : null;
};
CustomTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  payload: PropTypes.arrayOf(PropTypes.object),
  customPayload: PropTypes.arrayOf(PropTypes.object),
  showTooltip: PropTypes.bool,
  dataKey: PropTypes.string,
};

export default CustomTooltip;
