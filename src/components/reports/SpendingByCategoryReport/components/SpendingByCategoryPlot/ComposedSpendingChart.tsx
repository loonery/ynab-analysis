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
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';
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
} from '../../consts/consts';

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

  const composedSpendingChartProps: CategoricalChartProps = {
    stackOffset: 'sign',
    width: 500,
    height: 300,
    data,
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5,
    },
  };

  return (
    <ResponsiveContainer width={'100%'} height={PLOT_HEIGHT}>
      <ComposedChart {...composedSpendingChartProps}>
        <CartesianGrid strokeDasharray='3 3' />
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
