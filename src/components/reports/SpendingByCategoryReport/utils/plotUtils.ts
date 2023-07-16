import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { InternMap } from 'd3';
import { CategoryDimensions } from 'store/interfaces/SpendingAnalysisState';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import {
  BarTooltipValues,
  DotTooltipValues,
} from '../components/SpendingByCategoryPlot/interfaces/interfaces';
import { UNDEFINED_AMOUNT_VALUE } from '../consts/consts';

/**
 * Assembles the array of objects that are fed into the spending chart
 *
 * @param activeMonths the MonthYear dates in the filtered range of dates
 * @param dataKeys the possible categories that exist in the filter
 * @param categorySpendingData the month-to-month spending data for each category for each month
 * @param totalSpendingData the month-to-month total spending data for each month
 * @returns an array of SpendingChart objects
 */
export const assembleSpendingPlotData = (
  activeMonths: MonthYear[],
  dataKeys: string[],
  categorySpendingData: InternMap<MonthYear, InternMap<string | undefined, string>>,
  totalSpendingData: InternMap<MonthYear, string>,
): SpendingChartData[] => {
  const spendingChartData: SpendingChartData[] = [];

  activeMonths.forEach((month) => {
    // initialize the data object with the total and the month
    const monthlySpendingDataObject: SpendingChartData = {
      month,
      total: -(totalSpendingData.get(month) ?? UNDEFINED_AMOUNT_VALUE),
    };
    // for each month, get the map of category -> value, then use it to assemble the
    // monthly spending object
    const monthlySpendingData = categorySpendingData.get(month);
    dataKeys.forEach((key) => {
      monthlySpendingDataObject[key] = -Number(
        monthlySpendingData?.get(key) ?? UNDEFINED_AMOUNT_VALUE,
      );
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
