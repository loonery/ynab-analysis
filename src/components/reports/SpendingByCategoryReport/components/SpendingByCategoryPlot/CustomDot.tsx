import React from 'react';

import { useDispatch } from 'react-redux';

import { DOT_TOOLTIP_TYPE } from 'store/consts/consts';
import {
  setTooltipData,
  setShowTooltip,
  setTooltipType,
} from 'store/slices/spendingAnalysisSlice';

import {
  INNER_DOT_FILL,
  INNER_DOT_RADIUS,
  OUTER_DOT_FILL,
  OUTER_DOT_RADIUS,
} from '../../consts/consts';

import { DotTooltipProps, CustomDotProps } from './interfaces/interfaces';

/** Custom dot is fed information from reChart's line component */

// eslint-disable-next-line
export const CustomDot = ({ active, cx, cy, payload }: CustomDotProps) => {
  const dispatch = useDispatch();
  // get the data for the custom dot tooltip
  const { month, total } = payload ?? { month: 'Jan 2020', total: 0 };
  const dotTooltipData: DotTooltipProps = { month, total };

  const onMouseOver = (): void => {
    dispatch(setShowTooltip(true));
    dispatch(setTooltipType(DOT_TOOLTIP_TYPE));
    dispatch(setTooltipData(dotTooltipData));
  };

  const onMouseOut = (): void => {
    dispatch(setShowTooltip(false));
    dispatch(setTooltipType(undefined));
    dispatch(setTooltipData(undefined));
  };

  return (
    <g onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {active ? (
        <circle cx={cx} cy={cy} r={OUTER_DOT_RADIUS} fill={OUTER_DOT_FILL} />
      ) : null}
      <circle cx={cx} cy={cy} r={INNER_DOT_RADIUS} fill={INNER_DOT_FILL} />
    </g>
  );
};
