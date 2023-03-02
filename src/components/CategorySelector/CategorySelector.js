import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { 
    getCategoryGroups, 
    getSubcategoriesOfSibling, 
    getSubcategoriesOfCategoryGroup, 
    getParentOfSubcategory
} from "../SpendingAnalysisDashboard/getData";

const CategorySelector = ({
    categoryDimension, 
    selectedCategoryItem, 
    handleSelect}) => {

    const transactions = useSelector(state => state.transactions);
    const categories = ["All", ...getCategoryGroups(transactions)];

    // subcategories mapped to drilldown buttons
    let subCategories; let parentOfSelected;
    if (categoryDimension === "category_name") {
        // get the 'child' subcategories of the selected category group
        subCategories = getSubcategoriesOfCategoryGroup(transactions, selectedCategoryItem);
    } else if (categoryDimension === "single_category") {
        // get the 'sibling' subcategories of the selected single category
        subCategories = getSubcategoriesOfSibling(transactions, selectedCategoryItem);
        parentOfSelected = getParentOfSubcategory(transactions, selectedCategoryItem);
    } else {
        subCategories = [];
    }

    return (
        <Fragment>
            <div className="d-flex justify-content-start">

                {/* houses the drowndown  */}
                <div className="input-group">
                    {/* prepend dialog */}
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="categoryDrilldownSelect">Showing...</label>
                    </div>

                    {/* select box */}
                    <select className="form-select form-select-sm" 
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
                            }
                            }
                            // value in the dropdown is the selected item, or the parent
                            // of the selected item if the selected item is a subcategory
                            value={(parentOfSelected ? parentOfSelected : selectedCategoryItem)}>
                            
                            {/* enumerate the choices */}
                            {categories.map((category) => {
                                return (
                                    <option className="btn dropdown-toggle">
                                        {category}
                                    </option>
                                )
                            })}
                    </select>

                {/* conditionally shown back button to the right of dropdown */}
                {categoryDimension !== "category_group_name" &&
                    <button 
                        className="btn btn-outline-dark ml-3"
                        onClick={() => handleSelect( // reset view to all category groups 
                                        categoryDimension="category_group_name", 
                                        selectedCategoryItem="All")
                                }>
                        <FontAwesomeIcon icon={faArrowUp}/>
                    </button>
                }
                </div>
            </div>

            {/* Conditionally rendered subcategory buttons */}
            {categoryDimension !== "category_group_name" &&
                <div className="btn-toolbar mt-3">
                    {subCategories.map((Subcategory) => {
                        return (
                            <button 
                                className="btn btn-sm btn-outline-dark mr-1 mb-1"
                                onClick={() => handleSelect(
                                    categoryDimension="single_category",
                                    selectedCategoryItem=Subcategory)
                                }>
                                {Subcategory}
                            </button>
                        )
                    })}
                </div>
            }
        </Fragment>
    );
}
export default CategorySelector;