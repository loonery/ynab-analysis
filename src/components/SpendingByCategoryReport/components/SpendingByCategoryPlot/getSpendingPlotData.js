export const getSpendingPlotData = (
  categorySpendingData,
  totalSpendingData,
  dataKeys,
) => {
  // need an object per month in this case
  // const data = [
  // {
  //   month: 'month',
  //   categoryA: 4000,
  //   categoryB: 2400,
  //   categoryB: 2400,
  //   ...,
  // },
  // ];

  const activeMonths = Array.from(totalSpendingData.keys());
  const data = activeMonths.map((month) => {
    // add all of the keys for each category to the object for each month
    const monthlySpendingDataObject = { month };
    for (const dataKey of dataKeys) {
      const key = Object.keys(dataKey);
      monthlySpendingDataObject[key] = dataKey[key];
    }
    // get the inner spending hashmap
    const monthlySpendingData = categorySpendingData.get(month);

    // make an array of categories that appear in a month's spending
    const activeCategories = Array.from(monthlySpendingData.keys());

    // map each category to an object representing spending for this month
    for (const category of activeCategories) {
      const amount = monthlySpendingData.get(category);
      monthlySpendingDataObject[category] = amount;
    }
    return monthlySpendingDataObject;
  });
  return data;
};
