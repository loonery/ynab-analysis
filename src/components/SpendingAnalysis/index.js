
import React from "react";
import Plot from "react-plotly.js";

const SpendingAnalysis = () => {

    return (

        // Spending Analysis Page
        <div className="row mx-3 my-3 border rounded">
            <Plot className="mx-2 my-2"
                onClick={(event) => console.log(event)}
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                        {type: 'bar', 
                        x: [1, 2, 3], 
                        y: [2, 5, 3]
                    },
                ]}
                layout={ {width: 800, height: 800, title: 'Spending Analysis By Category Group'} }
            />
        </div>
    )
}
export default SpendingAnalysis;