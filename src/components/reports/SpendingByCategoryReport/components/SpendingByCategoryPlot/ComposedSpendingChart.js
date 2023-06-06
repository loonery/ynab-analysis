import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  PLOT_HEIGHT,
  SPENDING_CATEGORIES_COLORS,
} from 'components/SpendingByCategoryReport/consts/plotConsts';
import PropTypes, { string } from 'prop-types';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from 'recharts';
import { BAR_TOOLTIP_TYPE } from 'store/consts/consts';
import { selectHighlightedBarData } from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import {
  setTooltipData,
  setHighlightedBarData,
  setShowTooltip,
  setTooltipType,
} from 'store/slices/SpendingAnalysisSlice';

import { CustomDot } from './CustomDot';
import { CustomTooltip } from './CustomTooltip';
import { HighlightedBarSection } from './HighlightedBarSection';

export const ComposedSpendingChart = ({ data, dataKeys }) => {
  const dispatch = useDispatch();

  const highlightedBarData = useSelector((state) => selectHighlightedBarData(state));
  const { x, y, height, width, fill } = highlightedBarData || {};

  const handleMouseEnterBar = (data) => {
    // mousing over any bar yields these variables
    const { x, y, height, width } = data;
    const barTooltipData = data.tooltipPayload[0];
    const { color: fill } = barTooltipData;

    dispatch(setHighlightedBarData({ x, y, height, width, fill }));
    dispatch(setTooltipData(barTooltipData));
    dispatch(setTooltipType(BAR_TOOLTIP_TYPE));
    dispatch(setShowTooltip(true));
  };

  const handleMouseLeaveBar = () => {
    dispatch(setShowTooltip(false));
    dispatch(setTooltipType(undefined));
    dispatch(setHighlightedBarData(undefined));
  };

  return (
    <ResponsiveContainer width={'100%'} height={PLOT_HEIGHT}>
      <ComposedChart
        stackOffset='sign'
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={'month'} />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        {dataKeys.map((key, index) => {
          return (
            <Bar
              key={index}
              stackId={'a'}
              dataKey={key}
              fill={SPENDING_CATEGORIES_COLORS[key]}
              onMouseEnter={handleMouseEnterBar}
              onMouseLeave={handleMouseLeaveBar}
            />
          );
        })}
        <Line
          dataKey={'total'}
          dot={<CustomDot active={false} />}
          activeDot={<CustomDot active={true} />}
        />
        {highlightedBarData && (
          <g>
            <HighlightedBarSection
              x={x}
              y={y}
              width={width}
              height={height}
              fill={fill}
            />
          </g>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
ComposedSpendingChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  dataKeys: PropTypes.arrayOf(string),
};
