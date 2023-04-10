import { Dropdown } from 'libs/reuse/composite/Dropdown';
import styled from 'styled-components';
import CategoryCheckBoxesContainer from './CategoryCheckBoxesContainer'
import ButtonBar from 'libs/reuse/composite/ButtonBar';

const CategoryFilterDropdown = () => {

    // header button definitions
    const HeaderButtons = [
        {
            label: "Select None",
            onClick: () => {},
            classString: 'btn btn-sm btn-outline-dark'
        },
        {
            label: "Select All",
            onClick: () => {},
            classString: 'btn btn-sm btn-outline-primary'
        },
    ];

    // footer button definitions
    const FooterButtons = [
        {
            label: "Done",
            onClick: () => {},
            classString: 'btn btn-sm btn-success'
        }
    ];

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