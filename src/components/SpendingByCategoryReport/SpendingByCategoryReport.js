import React, {useState } from "react";
import SpendingAnalysisPlot from "../SpendingAnalysisPlot";
import CategorySelector from "../CategorySelector";

const SpendingByCategoryReport = () => {

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
        // the whole dashboard renders as a row within the container
        <div className="row mx-2 my-2 pt-3 border">
            <div className="col">
                {/* House the category dropdown options */}
                <CategorySelector 
                    categoryDimension={categoryDimension} 
                    selectedCategoryItem={selectedCategoryItem} 
                    handleSelect={handleSelect}/>

                {/* house the spending analysis plot */}
                <SpendingAnalysisPlot  
                    categoryDimension={categoryDimension}
                    selectedCategoryItem={selectedCategoryItem}/>
            </div>
        </div>
    )
}
export default SpendingByCategoryReport;