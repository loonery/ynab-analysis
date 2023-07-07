import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

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
import { RootState } from 'store';
import { BAR_TOOLTIP_TYPE } from 'store/consts/consts';
import { HighlightedBarData } from 'store/interfaces/SpendingAnalysisState';
import { selectHighlightedBarData } from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import {
  setTooltipData,
  setHighlightedBarData,
  setShowTooltip,
  setTooltipType,
} from 'store/slices/spendingAnalysisSlice';

import {
  MONTH_DATA_KEY_NAME,
  STACK_ID,
  PLOT_HEIGHT,
  SPENDING_CATEGORIES_COLORS,
  PLOT_WIDTH,
} from '../../consts/consts';
import {
  CARTESIAN_GRID_STROKE_DASH_ARRAY,
  COMPOSED_SPENDING_CHART_CONSTANT_PROPS,
} from '../consts/consts';

import { CustomDot } from './CustomDot';
import { CustomTooltip } from './CustomTooltip';
import { HighlightedBarSection } from './HighlightedBarSection';
import { ComposedSpendingChartProps } from './interfaces/interfaces';

// eslint-disable-next-line
export const ComposedSpendingChart = ({ data, dataKeys }: ComposedSpendingChartProps) => {
  const dispatch = useDispatch();

  const highlightedBarData: HighlightedBarData | undefined = useSelector(
    (state: RootState) => selectHighlightedBarData(state),
  );
  const { x, y, height, width, fill } = highlightedBarData ?? {};

  // todo - add parameter typing
  const handleMouseEnterBar = (data: any): void => {
    // mousing over any bar yields these variables
    const { x, y, height, width } = data;
    const barTooltipData = data.tooltipPayload[0];
    const { color: fill } = barTooltipData;

    dispatch(setHighlightedBarData({ x, y, height, width, fill }));
    dispatch(setTooltipData(barTooltipData));
    dispatch(setTooltipType(BAR_TOOLTIP_TYPE));
    dispatch(setShowTooltip(true));
  };

  const handleMouseLeaveBar = (): void => {
    dispatch(setShowTooltip(false));
    dispatch(setTooltipType(undefined));
    dispatch(setHighlightedBarData(undefined));
  };

  return (
    <ResponsiveContainer width={PLOT_WIDTH} height={PLOT_HEIGHT}>
      <ComposedChart {...COMPOSED_SPENDING_CHART_CONSTANT_PROPS} data={data}>
        <CartesianGrid strokeDasharray={CARTESIAN_GRID_STROKE_DASH_ARRAY} />
        <XAxis dataKey={MONTH_DATA_KEY_NAME} />
        <YAxis tickFormatter={(value: number): string => `$${value}`} />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        {dataKeys.map((key: string, index: number) => {
          return (
            <Bar
              key={index}
              stackId={STACK_ID}
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
          // assert types when we have highlighted bar data
          <g>
            <HighlightedBarSection
              x={x as number}
              y={y as number}
              width={width as number}
              height={height as number}
              fill={fill as string}
            />
          </g>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
