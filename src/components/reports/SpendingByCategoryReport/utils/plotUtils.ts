import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { ALL_CATEGORIES_DIMENSION } from 'store/consts/consts';
import { CategoryDimensions } from 'store/interfaces/SpendingAnalysis';

import {
  BarTooltipValues,
  DotTooltipValues,
} from '../components/SpendingByCategoryPlot/interfaces/interfaces';

// export const getCategoryColor = () => {};

export const getBarTooltipValues = (
  payload: SpendingChartData,
  dataKey: string,
  categoryDimension: CategoryDimensions,
  selectedCategoryGroupName: string,
): BarTooltipValues => {
  // construct the values to be shown in the tooltip
  const { month } = payload;

  const dollarValue: number = (payload[dataKey] as number) || 0;

  const percentOfTotal = payload
    ? ((dollarValue / payload.total) * 100).toFixed(2)
    : undefined;
  const percentString =
    categoryDimension === ALL_CATEGORIES_DIMENSION
      ? `${percentOfTotal}% of ${month} spending`
      : `${percentOfTotal}% of ${month} ${selectedCategoryGroupName} spending`;

  return { categoryName: dataKey, dollarValue, percentString };
};

export const getDotTooltipValues = (
  month: string,
  total: number,
  categoryDimension: CategoryDimensions,
  categoryGroupName: string,
): DotTooltipValues => {
  const monthString =
    categoryDimension === ALL_CATEGORIES_DIMENSION
      ? `${month} total spending`
      : `${month} spending on ${categoryGroupName}`;
  const totalString = `$${total}`;
  return { monthString, totalString };
};
