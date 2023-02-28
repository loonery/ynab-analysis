import React, {useState } from "react";
import SpendingAnalysisPlot from "../SpendingAnalysisPlot/SpendingAnalysisPlot";
import CategorySelector from "../CategorySelector";

const SpendingAnalysisDashboard = () => {

    // cat dimension can be ["category_group_name, category_name, single_category"]
    const [categoryDimension, setCategoryDimension] = useState("category_group_name");
    const [selectedCategory, setSelectedCategory] = useState("All");       
    
    // handle selecting of a category (ths function passed to category selector)
    const handleSelect = (selectedCategory) => {
        if (selectedCategory !== "All") {
            setCategoryDimension("category_name");
        } else {
            setCategoryDimension("category_group_name");
        }
        setSelectedCategory(selectedCategory);
    }

    return (
        <div className="border rounded mx-2 my-2">
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column">
                    <div className="mt-3 mr-3">
                        <CategorySelector selectedCategory={selectedCategory} handleSelect={handleSelect}/>
                    </div>
                    <SpendingAnalysisPlot  selectedCategory={selectedCategory} categoryDimension={categoryDimension}/>
                </div>
            </div>
        </div>
    )
}
export default SpendingAnalysisDashboard;