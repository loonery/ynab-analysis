import React, {useState, useEffect} from "react";
import {useSelector} from 'react-redux'
import { rollup, sum } from "d3";
import Plot from "react-plotly.js";

const SpendingAnalysisPlot = () => {
    
    const [selectedCategory, setSelectedCategory] = useState("");
    const transactions = useSelector(state => state.transactions);

    const handleBarClick = (event) => {
        const selectedCategory = event.points[0].data.name
        setSelectedCategory(selectedCategory);
    }

    const getTraceData = () => {

        // rollup transactions on category group and month_year
        const spendingRollup = rollup(transactions, 
            t=> sum(t, i=>i.amount), 
            t=> t.category_group_name, 
            t=> t.month_year
        );

        // remove category groups that don't pertain to spending
        spendingRollup.delete("Starting Balance");
        spendingRollup.delete("Internal Master Category");
        spendingRollup.delete("Internal Master Category");

        // traceData holds data for all traces to be applied to this plotly 
        const categoryGroups = Array.from(spendingRollup.keys());
        const traceData = categoryGroups.map((categoryGroup) => {

            // get months that the category was active
            let activeMonths = Array.from(spendingRollup.get(categoryGroup).keys());
            
            // get sums per category per month
            let categorySums = activeMonths.map((activeMonth) => {
                let categorySum = spendingRollup.get(categoryGroup).get(activeMonth);
                categorySum = Math.abs(categorySum);
                return categorySum;
            });
            // get the name and the type for the trace
            let name = String(categoryGroup);
            let type = "bar";

            // return the compiled trace
            return {
                x: activeMonths,
                y: categorySums,
                name: name,
                type: type
            }
        })
        return traceData;
    }

    const getLayout = () => {

        const yaxis = {tickprefix: "$"}

        return {
            title: 'A Fancy Plot',
            barmode: 'stack',
            showlegend: false,
            width: 800, 
            height: 800,
            yaxis: yaxis,
        }
    }

    const getConfig = () => {
        return {
            displayModeBar: false,
        }
    }

    return (
        <Plot
            data={getTraceData()}
            layout={getLayout()}
            config={getConfig()}
            onClick={handleBarClick}
        />
    )
}
export default SpendingAnalysisPlot;