const HIGHLIGHTED_BAR_OVERFLOW = 5;
const RECHARTS_SVG_CLASSNAME = 'recharts-layer recharts-bar-rectangle';
const RECHARTS_SVG_ROLE = 'img';

import React from 'react';

import PropTypes from 'prop-types';
import { Rectangle } from 'recharts';

export const HighlightedBarSection = ({ x, y, height, width, fill }) => {
  // shift x left by 10 pixels then widen the rectangle to show it's highlighted
  const leftX = x - HIGHLIGHTED_BAR_OVERFLOW;
  const rightX = x + width;
  return (
    <g className={RECHARTS_SVG_CLASSNAME} role={RECHARTS_SVG_ROLE}>
      <Rectangle
        x={leftX}
        y={y}
        height={height}
        width={HIGHLIGHTED_BAR_OVERFLOW}
        fill={fill}
      />
      <Rectangle
        x={rightX}
        y={y}
        height={height}
        width={HIGHLIGHTED_BAR_OVERFLOW}
        fill={fill}
      />
    </g>
  );
};
HighlightedBarSection.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};
