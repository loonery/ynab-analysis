import React, { Fragment, useState } from "react"
import { Checkbox } from "../../libs/reuse/Checkbox";
import CategoryCheckBoxChild from './CategoryCheckBoxChild'

const CategoryCheckBoxSection = ({parentName, childNames}) => {

    // all categories start un-checked
    const [checked, setChecked] = useState(true);
    const [childCheckboxes, setChildObjects] = useState(childNames.sort().map((childName) => {return {childName, checked: true}}));

    return (
    <Fragment>
        <Checkbox 
            labelText={parentName} 
            id={parentName + ' checkbox'} 
            onChange={() => {
                setChecked(!checked);
                const newObjects = childCheckboxes.map((childObject) => { return {...childObject, checked: !checked}});
                setChildObjects(newObjects);
            }} 
            checked={checked} 
        />
        {/* children checkboxes */}
        {
        childCheckboxes.map((childObject, index) => 
            <Checkbox
                labelText={childObject.childName}
                checked={childObject.checked}
                onChange={() => {

                    const newObjects = childCheckboxes.map((object) => {
                        if (object.childName === childObject.childName) {
                            const checked = !childObject.checked;
                            return {...object, checked}
                        }
                        return object;
                    })
                    
                    setChildObjects(newObjects);
                
                    if (newObjects.every((object) => !object.checked)) {
                        setChecked(false);
                    } else if (newObjects.every((object) => object.checked)) {
                        setChecked(true);
                    }
                    
                }}
            />
        )
        }
    </Fragment>
    )
}
export default CategoryCheckBoxSection;