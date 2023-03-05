import React from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import { getBarTraces, getTraces } from "./getTraces";

const SpendingAnalysisPlot = ({ categoryDimension, selectedCategoryItem }) => {

    const transactions = useSelector(state => state.transactions);
    const traceObjects = getTraces(transactions, categoryDimension, selectedCategoryItem);

    /* Get the Layout for the Plot */
    const getLayout = () => {

        const yaxis = {tickprefix: "$"}
        const xaxis = {tickprefix: ""}

        return {
            title: 'Spending Analysis by Category',
            barmode: 'stack',
            showlegend: false,
            width: 800, 
            height: 800,
            yaxis: yaxis,
            xaxis: xaxis
        }
    }

    /* Get the Configuration for the Plot */
    const getConfig = () => {
        return {
            responsive: true,
            displayModeBar: false
        }
    }

    return (
        <Plot className="border rounded my-2"
            data={traceObjects}
            layout={getLayout()}
            config={getConfig()}
        />
    )
}
export default SpendingAnalysisPlot;