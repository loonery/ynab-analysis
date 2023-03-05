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
    const subCategories = getSubcategories(transactionHirearchy, categoryDimension, selectedCategoryItem); 
    
    // need to show the parent of the selected item in the
    // dropdown if the selected item is a single-category level
    let parentOfSubcategory = categoryDimension === 'single_category' ? 
                                getParentOfSubcategory(transactionHirearchy, selectedCategoryItem) 
                                : 
                                undefined;

    return (
    <Row>
        <Col>
            {/* houses the drowndown  */}
            <InputGroup className="input-group">

                {/* prepend dialog */}
                <InputGroup.Text>Showing...</InputGroup.Text>

                {/* select box */}
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

            {/* Conditionally rendered subcategory buttons */}
            {categoryDimension !== "category_group_name" &&
            <Row>
            <Col>
                <ButtonToolbar className="btn-toolbar mt-3">
                    <ButtonGroup>
                        {subCategories.map((Subcategory) => {
                            return (
                                <Button 
                                    className="btn btn-sm btn-outline-dark mr-1 mb-1"
                                    onClick={() => handleSelect(
                                        categoryDimension="single_category",
                                        selectedCategoryItem=Subcategory)
                                    }>
                                    {Subcategory}
                                </Button>
                            );
                        })}
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
            </Row>
            }
            <hr/>
        </Col>
    </Row>
    );
}
export default CategorySelector;