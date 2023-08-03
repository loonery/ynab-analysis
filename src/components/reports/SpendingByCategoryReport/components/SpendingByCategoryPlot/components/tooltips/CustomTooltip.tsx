import React from 'react';

import { useTooltipState } from 'components/reports/SpendingByCategoryReport/hooks/useTooltipState';
import { tooltipType } from 'store/interfaces/SpendingAnalysis';

import { DotTooltipProps, BarTooltipProps } from '../../interfaces/interfaces';
import { StyledTooltipContainer } from '../../styles/styles';

import { BarTooltip } from './BarTooltip';
import { DotTooltip } from './DotTooltip';

// eslint-disable-next-line
export const CustomTooltip = () => {
  const { showTooltip, tooltipData, activeTooltipType } = useTooltipState();

  if (!showTooltip || !tooltipData) return null;

  const barTooltip = activeTooltipType === tooltipType.barTooltipType;
  const dotTooltip = activeTooltipType === tooltipType.dotTooltipType;
  return (
    <StyledTooltipContainer>
      {barTooltip && <BarTooltip {...(tooltipData as BarTooltipProps)} />}
      {dotTooltip && <DotTooltip {...(tooltipData as DotTooltipProps)} />}
    </StyledTooltipContainer>
  );
};
