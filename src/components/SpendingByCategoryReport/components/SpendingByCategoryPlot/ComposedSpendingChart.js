import React, { Fragment } from 'react';
import { useState } from 'react';

import { SPENDING_CATEGORIES_COLORS } from 'components/SpendingByCategoryReport/consts/plotConsts';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Rectangle,
} from 'recharts';

import CustomTooltip from './CustomTooltip';

const HighlightedStackSection = ({ x, y, height, width, fill }) => {
  console.log('in highlighted section');
  // shift x left by 10 pixels then widen the rectangle to show it's highlighted
  const shiftedX = x - 10;
  const widerWidth = width + 20;
  return (
    <g>
      <Rectangle x={shiftedX} y={y} height={height} width={widerWidth} fill={fill} />
    </g>
  );
};
HighlightedStackSection.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export const ComposedSpendingChart = ({ data }) => {
  // remove the month key when generating keys
  const haveData = data.length > 0;
  const keys = haveData ? Object.keys(data[0]).slice(2) : [];

  // hold information for the custom tooltip in component state
  const [tooltipPayload, setTooltipPayload] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);
  const [highlightedData, setHighlightedData] = useState(undefined);

  const handleMouseOver = (data) => {
    // todo - abstract away necessary props generation once I am done proving the concept
    const { month, tooltipPayload, x, y, height, width } = data;
    const { payload } = tooltipPayload[0];
    const customPayload = {
      month,
      ...tooltipPayload[0],
      customPayload: payload,
    };
    const { color: fill } = customPayload;

    setHighlightedData({ x, y, height, width, fill });
    setTooltipPayload(customPayload);
    setShowTooltip(true);
  };

  const handleOnMouseLeave = () => {
    setShowTooltip(false);
    setHighlightedData(undefined);
  };

  return (
    <ResponsiveContainer width={'100%'} height={500}>
      <BarChart
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
        <YAxis />
        <Tooltip
          cursor={false}
          content={<CustomTooltip showTooltip={showTooltip} {...tooltipPayload} />}
        />
        {keys.map((key, index) => {
          return (
            <Fragment key={index}>
              <Bar
                key={index}
                stackId={'a'}
                dataKey={key}
                fill={SPENDING_CATEGORIES_COLORS[key]}
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleOnMouseLeave}
              />
            </Fragment>
          );
        })}
        {highlightedData && (
          <g className='recharts-layer recharts-bar-rectangle' role='img'>
            <Rectangle
              x={highlightedData.x - 5}
              y={highlightedData.y}
              height={highlightedData.height}
              width={highlightedData.width + 10}
            />
          </g>
        )}
      </BarChart>
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
};
