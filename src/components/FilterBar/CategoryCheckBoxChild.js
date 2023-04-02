import { Fragment, useState } from "react";
import { Checkbox } from "../../libs/reuse/Checkbox";

const CategoryCheckBoxChild = ({childName, parentChecked}) => {

    const [checked, setChecked] = useState(parentChecked);

    return (
        <Checkbox 
            labelText={childName} 
            onChange={() => {setChecked(!checked)}}
            checked={parentChecked}
        >
            {childName}
        </Checkbox>
    )
}
export default CategoryCheckBoxChild;