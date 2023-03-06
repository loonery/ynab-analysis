import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonToolbar, ButtonGroup, Button, Row, InputGroup, Form, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { 
    getTransactionHirearchy,
    getSubcategories,
    getCategoryGroups,
    getParentOfSubcategory
} from "../SpendingAnalysisDashboard/getSpendingData";

const CategorySelector = ({
    categoryDimension, 
    selectedCategoryItem, 
    handleSelect}) => {

    const transactions = useSelector(state => state.transactions);
    const transactionHirearchy = getTransactionHirearchy(transactions);
    const categoryGroups = ["All", ...getCategoryGroups(transactionHirearchy)];

    // subcategories of the currently selected 
    // categoryGroup are mapped to drilldown buttons
    const subCategories = ["All", ...getSubcategories(transactionHirearchy, categoryDimension, selectedCategoryItem)]; 
    
    // need to show the parent of the selected item in the
    // dropdown if the selected item is a single-category level
    let parentOfSubcategory = categoryDimension === 'single_category' ? 
                                getParentOfSubcategory(transactionHirearchy, selectedCategoryItem) 
                                : 
                                undefined;

    return (
    <Form>
    <Row>
        <Col>
            <InputGroup>
                <InputGroup.Text>Category Group</InputGroup.Text>
                {/* Category Group select box */}
                <Form.Select 
                    className="form-select form-select-sm" 
                    id="categoryDrilldownSelect"
                    onChange={(event) => {
                        // if all is selected, set dimension as cat_group_name
                        if (event.target.value === "All") {
                            handleSelect(
                                categoryDimension="category_group_name",
                                selectedCategoryItem="All");
                        } else { // else set dimension as cat_name
                            handleSelect(
                                categoryDimension="category_name", 
                                selectedCategoryItem=event.target.value);
                        }
                    }}
                    // value in the dropdown is the selected item, or the parent
                    // of the selected item if the selected item is a subcategory
                    value={parentOfSubcategory ? parentOfSubcategory : selectedCategoryItem}>
                    
                    {/* enumerate the choices */}
                    {categoryGroups.map((category) => {
                        return (
                            <option className="btn dropdown-toggle">
                                {category}
                            </option>
                        )
                    })}
                </Form.Select>
            
                {/* conditionally shown back button to the right of dropdown */}
                {categoryDimension !== "category_group_name" &&
                <Button 
                    className="ml-3"
                    onClick={() => handleSelect( // reset view to all category groups 
                                    categoryDimension="category_group_name", 
                                    selectedCategoryItem="All")
                            }
                    variant='outline-dark'>
                    <FontAwesomeIcon icon={faArrowUp}/>
                </Button>
                }
            </InputGroup>

            {/* Conditionally rendered subcategory dropdown */}
            {categoryDimension !== "category_group_name" &&
            <InputGroup className="mt-3">
                <InputGroup.Text>Subcategory</InputGroup.Text>
                <Form.Select 
                    value={subCategories.includes(selectedCategoryItem) ? selectedCategoryItem : 'All'}
                    onChange={(event) => {
                        if (event.target.value === "All") {
                        handleSelect(
                            categoryDimension="category_name",
                            selectedCategoryItem=parentOfSubcategory);
                        } else { // else set dimension as cat_name
                        handleSelect(
                            categoryDimension="single_category", 
                            selectedCategoryItem=event.target.value);
                        }
                    }}>
                    
                    {/* subcategories appear as choices in the dropdown */}
                    {subCategories.map((Subcategory) => {
                    return (
                        <option className="btn btn-sm btn-outline-dark mr-1 mb-1">
                            {Subcategory}
                        </option>
                    );
                    })}
                </Form.Select>
            </InputGroup>
            }
        </Col>
    </Row>
    </Form>
    );
}
export default CategorySelector;