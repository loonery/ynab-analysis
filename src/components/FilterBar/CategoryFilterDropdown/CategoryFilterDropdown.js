import { Dropdown } from "../../../libs/reuse/Dropdown";
import CategoryCheckBoxesContainer from './CategoryCheckBoxesContainer'
import ButtonBarFooter from "../../../libs/reuse/ButtonBarFooter"
import ButtonBarHr from "../../../libs/reuse/ButtonBarHr";

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
            <ButtonBarHr buttons={HeaderButtons}/>
            <CategoryCheckBoxesContainer />
            <ButtonBarFooter buttons={FooterButtons}/>
        </Dropdown>
    )
}
export default CategoryFilterDropdown;