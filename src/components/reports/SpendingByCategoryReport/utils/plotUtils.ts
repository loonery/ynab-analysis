import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { ALL_CATEGORIES_DIMENSION } from 'store/consts/consts';
import { CategoryDimensions } from 'store/interfaces/SpendingAnalysis';

import { DotTooltipValues } from '../components/SpendingByCategoryPlot/interfaces/interfaces';

// export const getCategoryColor = () => {};

export const getBarTooltipValues = (
  payload: SpendingChartData,
  dataKey: string,
  categoryDimension: CategoryDimensions,
  selectedCategoryGroupName: string,
): { dollarValue: number; percentString: string } => {
  // get dollar value
  const dollarValue: number = (payload[dataKey] as number) || 0;

  // get percent string
  const percentOfTotal = payload
    ? ((dollarValue / payload.total) * 100).toFixed(2)
    : undefined;
  const { month } = payload;
  const percentString =
    categoryDimension === ALL_CATEGORIES_DIMENSION
      ? `${percentOfTotal}% of ${month} spending`
      : `${percentOfTotal}% of ${month} ${selectedCategoryGroupName} spending`;

  return { dollarValue, percentString };
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
