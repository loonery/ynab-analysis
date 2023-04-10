import { Dropdown } from 'libs/reuse/composite/Dropdown';
import CategoryCheckBoxesContainer from './CategoryCheckBoxesContainer'
import ButtonBar from 'libs/reuse/composite/ButtonBar';
import { HeaderButtons, FooterButtons } from './DropdownButtonConfig';
import { StyledHr } from 'libs/reuse/foundational/StyledHr';

const CategoryFilterDropdown = () => {

    return (
        <Dropdown dropdownLinkText={"Categories"}>
            <h4>Categories</h4>
            <StyledHr/>
                <ButtonBar buttons={HeaderButtons}/>
            <StyledHr/>
            <CategoryCheckBoxesContainer />
            <ButtonBar 
                buttons={FooterButtons}
                padding={'10px 0px 0px 0px'}
                justify={'flex-end'}/>
        </Dropdown>
    )
}
export default CategoryFilterDropdown;