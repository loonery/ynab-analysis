import { 
    getSpendingRollup,
    getSumsOfCategory,
    getSummedSpending,
    getActiveMonthsOfCategory,
} from "../SpendingAnalysisDashboard/utils/dataManipulation";

// selected for refactor 
// (maybe some of this data manipulation can be done in the d3 file)
export const getBarTraces = (transactions, categoryDimension, selectedCategory) => {

    const spendingMap = getSpendingRollup(transactions, categoryDimension, selectedCategory);
    
    // create a trace object for each category type item we're rendering
    const categories = Array.from(spendingMap.keys());
    const traceData = categories.map((categoryItem) => {

        // get summed spending for each category group for the months that that category was active
        let activeMonths = getActiveMonthsOfCategory(spendingMap, categoryItem);        
        let categorySums = getSumsOfCategory(spendingMap, categoryItem);

        // get total sum for each month or sum for category group for each month
        let summedSpending = getSummedSpending(spendingMap);

        // construct an html string for hoverinfo for each bar in the trace
        let text = activeMonths.map((month) => {
            
            let categorySum = spendingMap.get(categoryItem).get(month);
            let percentOfTotal = (categorySum / summedSpending.get(month)) * 100;

            categorySum = Math.abs(categorySum).toFixed(2);
            percentOfTotal = Math.abs(percentOfTotal).toFixed(2);

            let html = '<i>' + categoryItem + '</i><br>';
            html += '<b>$' + categorySum + '</b><br>';
            html += percentOfTotal + '% of Total';

            return html;
        })

        // return the compiled trace
        return {
            x: activeMonths,                // [month, month, month]
            y: categorySums,                // [sum, sum, sum]
            name: "",                       // Want blank trace-names in hoverinfo
            text: text,                     // [name, name, name];
            textposition: "none",           // only using category name as tooltip
            hovertemplate: '%{text}',
            type: "bar",
            width: 0.4,
        }
    })
    return traceData;
}
