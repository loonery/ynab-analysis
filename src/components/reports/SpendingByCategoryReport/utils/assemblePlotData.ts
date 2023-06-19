import { InternMap } from 'd3';
import { FetchedData } from 'store/interfaces/FetchedData';
import { MonthYear } from 'store/interfaces/types/MonthYear';

export const assembleSpendingPlotData = (
  categorySpendingData: InternMap<MonthYear, InternMap<string | undefined, string>>,
  totalSpendingData: InternMap<MonthYear, string>,
): any => {
  // need an object per month in this case
  // const data = [
  // {
  //   month: 'month',
  //   totalSpending
  //   categoryA: 4000,
  //   categoryB: 2400,
  //   categoryB: 2400,
  //   ...,
  // },
  // ];

  interface MonthlySpendingDataObject {
    month: MonthYear;
    total: number;
  }

  // months are derived from the months in which category spending has happened
  const activeMonths = Array.from(categorySpendingData.keys());

  // for each month of active spending, assemble an object representing spending data for that month
  // to be fed to the Recharts composed chart
  const data = activeMonths.map((month: MonthYear) => {
    // get month and inverted total spending data for that month
    const monthlySpendingDataObject: MonthlySpendingDataObject = {
      month,
      total: -(totalSpendingData.get(month) ?? 0),
    };

    // get the inner spending hashmap
    const monthlySpendingData = categorySpendingData.get(month) ? [];

    // make an array of categories that appear in a month's spending
    const activeCategories = Array.from(monthlySpendingData!.keys());

    // map each category to an object representing spending for this month
    for (const category of activeCategories) {
      const amount = monthlySpendingData.get(category);
      monthlySpendingDataObject[category] = -amount; // invert spending sign
    }
    return monthlySpendingDataObject;
  });
  return data;
};
