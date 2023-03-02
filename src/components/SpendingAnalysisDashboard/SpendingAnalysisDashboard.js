import React, {useState } from "react";
import SpendingAnalysisPlot from "../SpendingAnalysisPlot/SpendingAnalysisPlot";
import CategorySelector from "../categorySelector";

const SpendingAnalysisDashboard = () => {

    // categoryDimension can be ["category_group_name, category_name, single_category"]
    // selectedCategoryItem can be any category group or subcategory name
    const [categoryDimension, setCategoryDimension] = useState("category_group_name");
    const [selectedCategoryItem, setSelectedCategory] = useState("All");       
    
    // handle selecting of a category (this function passed to category selector)
    const handleSelect = (categoryDimension, selectedCategoryItem) => {
        setCategoryDimension(categoryDimension);
        setSelectedCategory(selectedCategoryItem);
    }

    return (
        <div className="border rounded mx-2 my-2">
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column">
                    
                    {/* House the category dropdown options */}
                    <div className="mt-3 mr-3">
                        <CategorySelector 
                            categoryDimension={categoryDimension} 
                            selectedCategoryItem={selectedCategoryItem} 
                            handleSelect={handleSelect}/>
                    </div>

                    {/* house the spending analysis plot */}
                    <div>
                        <SpendingAnalysisPlot  
                            categoryDimension={categoryDimension}
                            selectedCategoryItem={selectedCategoryItem} 
                            />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default SpendingAnalysisDashboard;