import React, { Fragment } from "react"
const CategoryCheckBoxParent = ({parent}) => {

    // all categories start checked
    const [checked, setChecked] = useState(true);
    
    // working with the parent object
    const parentName = Object().keys(parent).at(0);
    const children = parent[parentName];

    return (
    <Fragment>
        <li>{parentName}</li>
        {
            children.map(childName => 
                <CategoryCheckBoxChild 
                childName={childName} 
                parentChecked={checked}/>
            )
        }
    </Fragment>
    )

}