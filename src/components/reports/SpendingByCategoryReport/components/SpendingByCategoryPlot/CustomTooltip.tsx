import React, { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { TooltipData } from 'store/interfaces/SpendingAnalysisState';
import { tooltipType } from 'store/interfaces/SpendingAnalysisState';
import {
  selectShowTooltip,
  selectTooltipData,
  selectTooltipType,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import styled from 'styled-components';

import { BarTooltip } from './BarTooltip';
import { DotTooltip } from './DotTooltip';

const StyledTooltipContainer = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  border: 0.75px solid #ccc;
  box-shadow: 0 0 5px #ccc;
  font-size: 14px;
`;

// eslint-disable-next-line
export const CustomTooltip = () => {
  const showTooltip: boolean = useSelector((state: RootState): boolean =>
    selectShowTooltip(state),
  );
  const tooltipData: TooltipData = useSelector((state: RootState) =>
    selectTooltipData(state),
  );
  const activeTooltipType: tooltipType = useSelector((state: RootState) =>
    selectTooltipType(state),
  );

  if (!showTooltip) return null;

  const barTooltip = activeTooltipType === tooltipType.barTooltipType;
  const dotTooltip = activeTooltipType === tooltipType.dotTooltipType;
  return (
    <StyledTooltipContainer>
      {barTooltip && <BarTooltip {...tooltipData} />}
      {dotTooltip && <DotTooltip {...tooltipData} />}
    </StyledTooltipContainer>
  );
};
