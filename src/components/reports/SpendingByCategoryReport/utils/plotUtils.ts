import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { InternMap } from 'd3';
import { CategoryDimensions } from 'store/interfaces/SpendingAnalysisState';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import {
  BarTooltipValues,
  DotTooltipValues,
} from '../components/SpendingByCategoryPlot/interfaces/interfaces';
import { UNDEFINED_CATEGORY_KEY, UNDEFINED_AMOUNT_VALUE } from '../consts/consts';

export const assembleSpendingPlotData = (
  categorySpendingData: InternMap<MonthYear, InternMap<string | undefined, string>>,
  totalSpendingData: InternMap<MonthYear, string>,
): SpendingChartData[] => {
  const spendingChartData: SpendingChartData[] = [];

  // for each month of active spending, assemble an object representing spending data for that month
  // to be fed to the Recharts composed chart
  categorySpendingData.forEach((monthlySpendingData, month) => {
    // initialize the data object with the total and the month
    const monthlySpendingDataObject: SpendingChartData = {
      month,
      total: -(totalSpendingData.get(month) ?? UNDEFINED_AMOUNT_VALUE),
    };
    // make an array of categories that appear in a month's spending
    monthlySpendingData.forEach((amount, category) => {
      monthlySpendingDataObject[category ?? UNDEFINED_CATEGORY_KEY] =
        -amount ?? UNDEFINED_AMOUNT_VALUE;
    });
    spendingChartData.push(monthlySpendingDataObject);
  });

  return spendingChartData;
};

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
    categoryDimension === CategoryDimensions.allCategoriesDimension
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
    categoryDimension === CategoryDimensions.allCategoriesDimension
      ? `${month} total spending`
      : `${month} spending on ${categoryGroupName}`;
  const totalString = `$${total}`;
  return { monthString, totalString };
};
