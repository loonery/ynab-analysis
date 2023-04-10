import { Dropdown } from 'libs/reuse/composite/Dropdown';
import CategoryCheckBoxesContainer from './CategoryCheckBoxesContainer'
import ButtonBar from 'libs/reuse/composite/ButtonBar';
import { HeaderButtons, FooterButtons } from './DropdownButtonConfig';

const CategoryFilterDropdown = () => {

    return (
        <Dropdown dropdownLinkText={"Categories"}>
            <h4>Categories</h4>
            <hr/>
            <ButtonBar 
                buttons={HeaderButtons}
            />
            <hr/>
            <CategoryCheckBoxesContainer />
            <ButtonBar 
                buttons={FooterButtons}
                className={'pt-3'} 
                justify={'flex-end'}/>
        </Dropdown>
    )
}
export default CategoryFilterDropdown;