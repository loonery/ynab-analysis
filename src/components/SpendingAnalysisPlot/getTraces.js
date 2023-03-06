import { 
    getCategories,
    getTransactionHirearchy,
    getActiveMonthsSums,
    getTotalSpending,
} from "../SpendingAnalysisDashboard/getSpendingData";

export const getTraces = (
    transactions, 
    categoryDimension, 
    selectedCategoryItem
    ) => {
        const traces = [];
        const barTraces = getBarTraces(transactions, categoryDimension, selectedCategoryItem);
        const lineTrace = getLineTrace(transactions, categoryDimension, selectedCategoryItem);

        traces.push(...barTraces);
        traces.push(lineTrace);
        return traces;
}

const getBarTraces = (
    transactions, 
    categoryDimension, 
    selectedCategoryItem
    ) => {
        const transactionHirearchy = getTransactionHirearchy(transactions, categoryDimension, selectedCategoryItem);
        
        // create a trace object for each category type item we're rendering
        const categories = getCategories(transactionHirearchy, categoryDimension, selectedCategoryItem);
        const traceData = categories.map((categoryItem) => {

            // get summed spending for each category group for the months that that category was active
            // also get total sum for each month or sum for category group for each month
            const categorySumMap = getActiveMonthsSums(transactionHirearchy, categoryDimension, categoryItem);
            let totalsMap = getTotalSpending(transactionHirearchy, categoryDimension, categoryItem);
            const activeMonths = Array.from(categorySumMap.keys());
            const categorySums = Array.from(categorySumMap.values());

            // construct an html string for hoverinfo for each bar in the trace
            let text = activeMonths.map((month) => {
                let categorySum = categorySumMap.get(month);
                let percentOfTotal = (categorySum / totalsMap.get(month)) * 100;

                categorySum = Math.abs(categorySum).toFixed(2);
                percentOfTotal = Math.abs(percentOfTotal).toFixed(2);

                let html = '<i>' + categoryItem + '</i><br>';
                html += '<b>$' + categorySum + '</b><br>';
                html += percentOfTotal + '% of Total';

                return html;
            });

            // return the compiled trace
            return {
                x: activeMonths,                // [month, month, month]
                y: categorySums,                // [sum, sum, sum]
                name: '',                       // Want blank trace-names in hoverinfo
                text: text,                     // [name, name, name];
                textposition: "none",           // only using category name as tooltip
                hovertemplate: '%{text}',
                type: "bar",
                width: 0.4,
            }
        })

        return traceData;
}

const getLineTrace = (
    transactions, 
    categoryDimension, 
    selectedCategoryItem
    ) => {
    
        const transactionHirearchy = getTransactionHirearchy(transactions, categoryDimension, selectedCategoryItem);
        const totalsMap = getTotalSpending(transactionHirearchy, categoryDimension, selectedCategoryItem);
        const activeMonths = Array.from(totalsMap.keys());
        const categorySums = Array.from(totalsMap.values());

        let text = activeMonths.map((month) => {
            const monthlyTotal = totalsMap.get(month).toFixed(2);
            
            let html = '<i>' + month + '</i><br>';
            html += '<b>$' + monthlyTotal + '</b><br>';
            html += 'Total Spending'
            return html;
        })

        const line = {
            shape: 'spline',
            dash: 'dashdot',
            width: 2
    }

        return {
            x: activeMonths,
            y: categorySums,
            name: '',
            text: text,
            textposition: "none",           // only using category name as tooltip
            hovertemplate: '%{text}',
            mode: 'lines+markers',
            line: line,
        }
}
