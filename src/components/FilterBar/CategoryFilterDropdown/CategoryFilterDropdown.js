import { Dropdown } from 'libs/reuse/components/Dropdown';
import ButtonBar from 'libs/reuse/components/ButtonBar';
import { StyledHr } from 'libs/reuse/elements/StyledHr';
import CategoryCheckBoxesContainer from './CategoryCheckBoxesContainer'
import { HeaderButtons, FooterButtons } from './DropdownButtonConfig';
import { StyledHeader4 } from 'libs/reuse/elements/StyledHeader4';

const CategoryFilterDropdown = () => {
    return (
        <Dropdown dropdownLinkText={"Categories"}>
            <StyledHeader4>Categories</StyledHeader4>
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