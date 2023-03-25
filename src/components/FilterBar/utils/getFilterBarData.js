
export const getLargestDateRange = (transactions) => {
    const minMonthYear = transactions.at(0).month_year;
    const maxMonthYear = transactions.at(-1).month_year;
    return {minMonthYear, maxMonthYear}
}