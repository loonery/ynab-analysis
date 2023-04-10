import { Dropdown } from 'libs/reuse/components/Dropdown';
import ButtonBar from 'libs/reuse/components/ButtonBar';
import { StyledHr } from 'libs/reuse/elements/StyledHr';
import CategoryCheckBoxesContainer from './CategoryCheckBoxesContainer'
import { HeaderButtons, FooterButtons } from './DropdownButtonConfig';

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