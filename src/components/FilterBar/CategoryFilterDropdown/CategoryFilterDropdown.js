import { Dropdown } from 'libs/reuse/composite/Dropdown';
import CategoryCheckBoxesContainer from './CategoryCheckBoxesContainer'
import ButtonBar from 'libs/reuse/composite/ButtonBar';

const CategoryFilterDropdown = () => {

    // header button definitions
    const HeaderButtons = [
        {
            label: "Select None",
            onClick: () => {},
            classString: 'btn btn-outline-dark'
        },
        {
            label: "Select All",
            onClick: () => {}
        },
    ];

    // footer button definitions
    const FooterButtons = [
        {
            label: "Done",
            onClick: () => {},
            classString: 'btn btn-success'
        }
    ];

    return (
        <Dropdown dropdownLinkText={"Categories"}>
            <h4>Categories</h4>
            <ButtonBar buttons={HeaderButtons}/>
            <CategoryCheckBoxesContainer />
            <ButtonBar buttons={FooterButtons}/>
        </Dropdown>
    )
}
export default CategoryFilterDropdown;