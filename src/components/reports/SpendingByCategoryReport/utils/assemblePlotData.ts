import { SpendingChartData } from 'components/interfaces/chartObjects/SpendingChartData';
import { InternMap } from 'd3';
import { MonthYear } from 'store/interfaces/types/MonthYear';

import { UNDEFINED_CATEGORY_KEY, UNDEFINED_AMOUNT_VALUE } from '../consts/plotConsts';

export const assembleSpendingPlotData = (
  categorySpendingData: InternMap<MonthYear, InternMap<string | undefined, string>>,
  totalSpendingData: InternMap<MonthYear, string>,
): SpendingChartData[] => {
  const spendingChartData: SpendingChartData[] = [];

  // for each month of active spending, assemble an object representing spending data for that month
  // to be fed to the Recharts composed chart
  categorySpendingData.forEach((monthlySpendingData, month) => {
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
