import React from 'react';

import { Rectangle } from 'recharts';

import {
  HIGHLIGHTED_BAR_OVERFLOW,
  RECHARTS_SVG_CLASSNAME,
  RECHARTS_SVG_ROLE,
} from '../../consts/consts';

import { HighlightedBarProps } from './interfaces/interfaces';

// eslint-disable-next-line
export const HighlightedBarSection = ({
  x,
  y,
  height,
  width,
  fill,
}: HighlightedBarProps) => {
  // determine the starting x coordinate for each rectangle
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
