
import { NestedCheckBoxSection } from './NestedCheckBoxSection'

const NestedCheckBoxList = ({checkboxSections, parentOnClick, childOnClick}) => {

    return (
        checkboxSections.map((sectionObject, index) => {
            return <NestedCheckBoxSection 
                checkBoxSection={sectionObject} 
                parentOnClick={parentOnClick}
                childOnClick={childOnClick}
            />
        })
    )
}
export default NestedCheckBoxList;