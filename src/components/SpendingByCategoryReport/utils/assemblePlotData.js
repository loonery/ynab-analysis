export const assembleSpendingPlotData = (categorySpendingData, totalSpendingData) => {
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

  // months are derived from the months in which category spending has happened
  const activeMonths = Array.from(categorySpendingData.keys());

  // for each month of active spending, assemble an object representing spending data for that month
  // to be fed to the Recharts composed chart
  const data = activeMonths.map((month) => {
    // get month and inverted total spending data for that month
    const monthlySpendingDataObject = { month, total: -totalSpendingData.get(month) };

    // get the inner spending hashmap
    const monthlySpendingData = categorySpendingData.get(month);

    // make an array of categories that appear in a month's spending
    const activeCategories = Array.from(monthlySpendingData.keys());

    // map each category to an object representing spending for this month
    for (const category of activeCategories) {
      const amount = monthlySpendingData.get(category);
      monthlySpendingDataObject[category] = -amount; // invert spending sign
    }
    return monthlySpendingDataObject;
  });
  return data;
};
