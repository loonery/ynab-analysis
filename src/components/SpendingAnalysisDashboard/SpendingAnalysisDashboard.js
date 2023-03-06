import React, {useState } from "react";
import SpendingAnalysisPlot from "../SpendingAnalysisPlot";
import CategorySelector from "../CategorySelector";
import { Row, Col } from "react-bootstrap";

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
        // the whole dashboard renders as a row within the container
        <Row className="mx-2 my-2 pt-3 border">
            <Col>
                {/* House the category dropdown options */}
                <CategorySelector 
                    categoryDimension={categoryDimension} 
                    selectedCategoryItem={selectedCategoryItem} 
                    handleSelect={handleSelect}/>

                {/* house the spending analysis plot */}
                <SpendingAnalysisPlot  
                    categoryDimension={categoryDimension}
                    selectedCategoryItem={selectedCategoryItem}/>
            </Col>
        </Row>
    )
}
export default SpendingAnalysisDashboard;