import React from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { TooltipData } from 'store/interfaces/SpendingAnalysisState';
import { tooltipType } from 'store/interfaces/SpendingAnalysisState';
import {
  selectShowTooltip,
  selectTooltipData,
  selectTooltipType,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';

import { BarTooltip } from './BarTooltip';
import { DotTooltip } from './DotTooltip';
import { DotTooltipProps, BarTooltipProps } from './interfaces/interfaces';
import { StyledTooltipContainer } from './styles/styles';

// eslint-disable-next-line
export const CustomTooltip = () => {
  const showTooltip: boolean = useSelector((state: RootState): boolean =>
    selectShowTooltip(state),
  );
  const tooltipData: TooltipData = useSelector((state: RootState) =>
    selectTooltipData(state),
  );
  const activeTooltipType: tooltipType | undefined = useSelector((state: RootState) =>
    selectTooltipType(state),
  );

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
