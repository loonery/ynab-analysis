import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {fetchTransactionsThunk} from '../../api/thunks/fetchTransactionsThunk';
import { 
    getTransactionHirearchy,
    getSubcategories,
    getCategoryGroups,
    getParentOfSubcategory
} from "../SpendingAnalysisDashboard/utils/getSpendingData";
const CategorySelector = ({
    categoryDimension, 
    selectedCategoryItem, 
    handleSelect}) => {

    // fetch transactions on 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTransactionsThunk());
    }, [dispatch]);

    const {transactions, loading, error} = useSelector(state => state.filteredTransactions);

    if (error || loading) { return <div>something happenning</div>}
    
    const transactionHirearchy = getTransactionHirearchy(transactions);
    const categoryGroups = ["All", ...getCategoryGroups(transactionHirearchy)];

    // subcategories of the currently selected 
    // categoryGroup are mapped to drilldown buttons
    const subCategories = ["All", ...getSubcategories(transactionHirearchy, categoryDimension, selectedCategoryItem)]; 
    
    // need to show the parent of the selected item in the
    // dropdown if the selected item is a single-category level
    let parentOfSubcategory = categoryDimension === 'single_category' ? 
                                getParentOfSubcategory(transactionHirearchy, selectedCategoryItem) 
                                : undefined;

    return (
    <div className="row">
        <div className="col">
            <div className="d-flex">
                {/* wraps both select items */}
                <div>
                    {/* select input group */}
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label 
                                className="input-group-text" 
                                htmlFor="categoryGroupDrilldownSelect">
                                Category Group
                            </label>
                        </div>

                        {/* Category Group select box */}
                        <select 
                            className="custom-select"
                            id="categoryGroupDrilldownSelect"
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
                                <option 
                                    className="btn dropdown-toggle"
                                    value={category}>
                                    {category}
                                </option>
                            )
                            })}
                        </select>
                    </div>

                    {/* Conditionally rendered subcategory dropdown */}
                    {categoryDimension !== "category_group_name" &&
                    // select input group
                    <div className="input-group mt-3">
                        <div className="input-group-prepend">
                            <label 
                                className="input-group-text" 
                                htmlFor="subcategoryDrilldownSelect">
                                {"Subcategory"}
                            </label>
                        </div>

                        <select
                            className="custom-select"
                            id="subcategoryDrilldownSelect"
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
                        </select>
                    </div>
                    }
                </div>

                <div className="d-flex align-items-stretch">
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
                </div>
            </div>
        </div>
    </div>
    );
}
export default CategorySelector;