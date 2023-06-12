import React from 'react';

import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { DOT_TOOLTIP_TYPE } from 'store/consts/consts';
import {
  setTooltipData,
  setShowTooltip,
  setTooltipType,
} from 'store/slices/spendingAnalysisSlice';

import { INNER_DOT_RADIUS, OUTER_DOT_RADIUS } from '../../consts/plotConsts';

/** Custom dot is fed information from reChart's line component */
export const CustomDot = ({ active, cx, cy, payload }) => {
  const dispatch = useDispatch();
  // get the data for the custom dot tooltip
  const { month, total } = payload;
  const dotTooltipData = { month, total };

  const onMouseOver = () => {
    dispatch(setShowTooltip(true));
    dispatch(setTooltipType(DOT_TOOLTIP_TYPE));
    dispatch(setTooltipData(dotTooltipData));
  };

  const onMouseOut = () => {
    dispatch(setShowTooltip(false));
    dispatch(setTooltipType(undefined));
    dispatch(setTooltipData(undefined));
  };

  return (
    <g onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {active ? <circle cx={cx} cy={cy} r={OUTER_DOT_RADIUS} fill='#4d79ff' /> : null}
      {!active ? <circle cx={cx} cy={cy} r={OUTER_DOT_RADIUS} fill='#fffff' /> : null}
      <circle cx={cx} cy={cy} r={INNER_DOT_RADIUS} fill='#D3D3D3' />
    </g>
  );
};
CustomDot.propTypes = {
  active: PropTypes.bool.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  payload: PropTypes.object.isRequired,
};
