import React, { Fragment, useCallback, useState } from "react"
import { Checkbox } from 'libs/reuse/elements/StyledCheckbox';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { 
    addToCategoryFilter, 
    removeFromCategoryFilter 
} from "store/slices/filterBarSlice";

const ParentCheckboxContainer = styled.div`
    font-weight: 600;
`;

const ChildCheckboxContainer = styled.div`
  margin-left: 15px;
`;

const CategoryCheckBoxSection = ({categoryGroupName, categoryNames}) => {
    const dispatch = useDispatch();    


    // all categories start checked
    const [checked, setChecked] = useState(true);
    // Assemble child checkbox objects
    const [categoryCheckBoxes, setCategoryCheckBoxes] = useState(
        categoryNames.sort().map((categoryName) => {
            return {
                categoryName, 
                checked: true
            }
        }
    ));
    

    /**
     * Handles event when a child checkbox is checked 
     */
    const handleCheckChild = useCallback((childCheckbox) => {
        // change the checked checkbox's status
        const newObjects = categoryCheckBoxes.map((checkbox) => {
            if (checkbox.categoryName === childCheckbox.categoryName) {
                
                // communicate the change to the reducer
                const checked = !childCheckbox.checked;
                if (checked) {
                    dispatch(addToCategoryFilter(childCheckbox.categoryName));
                } else {
                    dispatch(removeFromCategoryFilter(childCheckbox.categoryName))
                }
                // return the checkbox with its new checked value
                return {...checkbox, checked}
            }
            // otherwise return the original checkbox
            return checkbox;
        })
        setCategoryCheckBoxes(newObjects);
    
        // possibly change parent's value depending on status of children checkboxes
        if (newObjects.every(object => !object.checked)) {
            setChecked(false);
        } else if (newObjects.every(object => object.checked)) {
            setChecked(true);
        }
    }, [categoryCheckBoxes]);

    /**
     * Handle when a parent is checked
     */
    const handleParentChecked  = () => {
        setChecked(!checked);
        // checking the parent toggles all children in tandem
        const newObjects = categoryCheckBoxes.map((childObject) => { 
            return {
                ...childObject, 
                checked: !checked
            }
        });
        setCategoryCheckBoxes(newObjects);
    }

    return (
    <Fragment>
        <ParentCheckboxContainer>
            <Checkbox 
                labelText={categoryGroupName} 
                id={'parent-checkbox-' + categoryGroupName}
                checked={checked} 
                onChange={() => handleParentChecked()} 
            />
        </ParentCheckboxContainer>
        {/* children checkboxes */}
        {
        categoryCheckBoxes.map((categoryCheckBox, index) => 
        <ChildCheckboxContainer>
            <Checkbox
                labelText={categoryCheckBox.categoryName}
                id={'child-checkbox-' + index}
                checked={categoryCheckBox.checked}
                onChange={() => handleCheckChild(categoryCheckBox)}
            />
        </ChildCheckboxContainer>            
        )
        }
    </Fragment>
    )
}
export default CategoryCheckBoxSection;