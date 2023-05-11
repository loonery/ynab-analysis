import React from 'react';

import { useSelector } from 'react-redux';

import { BAR_TOOLTIP_TYPE, DOT_TOOLTIP_TYPE } from 'store/consts/consts';
import {
  selectShowTooltip,
  selectTooltipData,
  selectTooltipType,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import styled from 'styled-components';

import BarTooltip from './BarTooltip';
import DotTooltip from './DotTooltip';

const StyledTooltipContainer = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  border: 0.75px solid #ccc;
  box-shadow: 0 0 5px #ccc;
  font-size: 14px;
`;

export const CustomTooltip = () => {
  const showTooltip = useSelector((state) => selectShowTooltip(state));
  const tooltipData = useSelector((state) => selectTooltipData(state));
  const tooltipType = useSelector((state) => selectTooltipType(state));

  if (!showTooltip) return null;

  const barTooltip = tooltipType === BAR_TOOLTIP_TYPE;
  const dotTooltip = tooltipType === DOT_TOOLTIP_TYPE;
  return (
    <StyledTooltipContainer>
      {barTooltip && <BarTooltip {...tooltipData} />}
      {dotTooltip && <DotTooltip {...tooltipData} />}
    </StyledTooltipContainer>
  );
};
