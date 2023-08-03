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
import { HighlightedBarData } from 'store/interfaces/SpendingAnalysis';
import { selectHighlightedBarData } from 'store/selectors/componentSelectors/spendingAnalysisSelectors';
import {
  selectCategoryColors,
  selectCategoryFillById,
} from 'store/selectors/dataSelectors/categorySelectors';
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

import { CustomTooltip } from './components/tooltips/CustomTooltip';
import { CustomDot } from './CustomDot';
import { HighlightedBarSection } from './HighlightedBarSection';
import { BarMouseOverData, ComposedSpendingChartProps } from './interfaces/interfaces';

// eslint-disable-next-line
export const ComposedSpendingChart = ({
  data,
  dataKeys,
  colorMap,
}: ComposedSpendingChartProps) => {
  const dispatch = useDispatch();

  const highlightedBarData: HighlightedBarData | undefined = useSelector(
    (state: RootState) => selectHighlightedBarData(state),
  );
  const { x, y, height, width, fill } = highlightedBarData ?? {};

  const handleMouseEnterBar = (data: BarMouseOverData): void => {
    // mousing over any bar yields these variables
    const { x, y, height, width } = data;
    const barTooltipData = data.tooltipPayload.at(0) ?? { fill: 'bad color' };
    const { fill } = barTooltipData;

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
        {dataKeys.map((dataKey: string, index: number) => {
          return (
            <Bar
              key={index}
              stackId={STACK_ID}
              isAnimationActive={true}
              dataKey={dataKey}
              fill={colorMap[dataKey]}
              onMouseEnter={handleMouseEnterBar}
              onMouseLeave={handleMouseLeaveBar}
            />
          );
        })}
        <Line
          dataKey={'total'}
          dot={<CustomDot active={false} />}
          activeDot={<CustomDot active={true} />}
          isAnimationActive={true}
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
