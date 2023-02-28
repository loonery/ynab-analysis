import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { getCategoryGroups, getSubcategoriesOfParentCategory } from "../SpendingAnalysisDashboard/utils/dataManipulation";

const CategorySelector = ({selectedCategory, handleSelect}) => {

    const transactions = useSelector(state => state.transactions);
    const categories = ["All", ...getCategoryGroups(transactions)];
    const subCategories = selectedCategory !== "All" ? getSubcategoriesOfParentCategory(transactions, selectedCategory) : "";

    console.log(selectedCategory);

    return (
        <Fragment>
            <div className="d-flex justify-content-start">

                {/* houses the drowndown  */}
                <div class="input-group">
                    {/* prepend dialog */}
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="categoryDrilldownSelect">Showing...</label>
                    </div>

                    {/* select box */}
                    <select className="form-select form-select-sm" 
                            id="categoryDrilldownSelect"
                            onChange={(event) => handleSelect(event.target.value)}
                            value={selectedCategory}>
                            
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
                {selectedCategory !== "All" &&
                    <button 
                        className="btn btn-outline-dark ml-3"
                        onClick={() => handleSelect("All")}>
                        <FontAwesomeIcon icon={faArrowUp}/>
                    </button>
                }
                </div>
            </div>
            {/* Conditionally rendered drilldown */}
            {selectedCategory !== "All" &&
                <div className="btn-toolbar mt-3">
                    {subCategories.map((Subcategory) => {
                        return (
                            <button className="btn btn-sm btn-outline-dark mr-1 mb-1">{Subcategory}</button>
                        )
                    })}
                </div>
            }
        </Fragment>
    );
}
export default CategorySelector;