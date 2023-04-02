import React, { Fragment, useState } from "react"
import { Checkbox } from "../../libs/reuse/Checkbox";
import CategoryCheckBoxChild from './CategoryCheckBoxChild'

const CategoryCheckBoxSection = ({parentName, childNames}) => {

    // all categories start un-checked
    const [checked, setChecked] = useState(true);
    const [childCheckboxes, setChildCheckboxes] = useState(childNames.sort().map((childName) => {return {childName, checked: true}}));

    const handleCheckChild = (childCheckbox) => {
        const newObjects = childCheckboxes.map((checkbox) => {
            if (checkbox.childName === childCheckbox.childName) {
                const checked = !childCheckbox.checked;
                return {...checkbox, checked}
            }
            return checkbox;
        })
        
        setChildCheckboxes(newObjects);
    
        if (newObjects.every((object) => !object.checked)) {
            setChecked(false);
        } else if (newObjects.every((object) => object.checked)) {
            setChecked(true);
        }
    }


    return (
    <Fragment>
        <Checkbox 
            labelText={parentName} 
            id={parentName + ' checkbox'} 
            onChange={() => {
                setChecked(!checked);
                const newObjects = childCheckboxes.map((childObject) => { return {...childObject, checked: !checked}});
                setChildCheckboxes(newObjects);
            }} 
            checked={checked} 
        />
        {/* children checkboxes */}
        {
            childCheckboxes.map((childCheckbox, index) => 
                <Checkbox
                    labelText={childCheckbox.childName}
                    checked={childCheckbox.checked}
                    onChange={() => handleCheckChild(childCheckbox)}
                />
            )
        }
    </Fragment>
    )
}
export default CategoryCheckBoxSection;