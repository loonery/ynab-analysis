import React, { Fragment, useState } from "react"
import { Checkbox } from 'libs/reuse/foundational/Checkbox';
import styled from "styled-components";

const ParentCheckboxContainer = styled.div`
    font-weight: 600;
`;

const ChildCheckboxContainer = styled.div`
  margin-left: 15px;
`;

const CategoryCheckBoxSection = ({categoryGroupName, categoryNames}) => {

    // all categories start checked
    const [checked, setChecked] = useState(true);
    const [categoryCheckBoxes, setCategoryCheckBoxes] = useState(categoryNames.sort().map((categoryName) => {
        return {
            categoryName, 
            checked: true
        }
    }));

    /* Handles event when a child checkbox is checked */
    const handleCheckChild = (childCheckbox) => {
        
        // change the checked checkbox's status
        const newObjects = categoryCheckBoxes.map((checkbox) => {
            if (checkbox.categoryName === childCheckbox.categoryName) {
                const checked = !childCheckbox.checked;
                return {...checkbox, checked}
            }
            return checkbox;
        })
        setCategoryCheckBoxes(newObjects);
    
        // possibly change parent's value depending on status of children checkboxes
        if (newObjects.every(object => !object.checked)) {
            setChecked(false);
        } else if (newObjects.every(object => object.checked)) {
            setChecked(true);
        }
    }

    return (
    <Fragment>
        <ParentCheckboxContainer>
            <Checkbox 
                labelText={categoryGroupName} 
                id={'parent-checkbox-' + categoryGroupName}
                checked={checked} 
                onChange={() => {
                    setChecked(!checked);

                    // checking the parent toggles all children in tandem
                    const newObjects = categoryCheckBoxes.map((childObject) => { 
                        return {
                            ...childObject, 
                            checked: !checked
                        }
                    });
                    setCategoryCheckBoxes(newObjects);
                }} 
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