import { Dropdown } from 'libs/reuse/components/Dropdown';
import ButtonBar from 'libs/reuse/components/ButtonBar';
import { StyledHr } from 'libs/reuse/elements/StyledHr';
import CategoryCheckBoxesContainer from './CategoryCheckBoxesContainer'
import { StyledHeader4 } from 'libs/reuse/elements/StyledHeader4';
import { CATEGORY_FILTER_DROPDOWN_ID } from 'consts/consts';
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectAllCategories, selectNoCategories, setFilteredCategories, cancelFilteredCategoriesChanges} from '../../../store/slices/filterBarSlice'
import { useDispatch } from 'react-redux';
import { closeDropdown } from 'libs/utils/closeDropdown';



const CategoryFilterDropdown = () => {

    const dispatch = useDispatch();

    // header button definitions
    const HeaderButtons = [
        {
            label: "Select None",
            onClick: () => {
                dispatch(selectNoCategories());
            },
            classString: 'btn btn-sm btn-outline-dark'
        },
        {
            label: "Select All",
            onClick: () => {
                dispatch(selectAllCategories());
            },
            classString: 'btn btn-sm btn-outline-dark'
        },
    ];

    // footer button definitions
    const FooterButtons = [
        {

            label: <FontAwesomeIcon icon={faXmark} />,
            onClick: () => {
                closeDropdown(CATEGORY_FILTER_DROPDOWN_ID);
                dispatch(cancelFilteredCategoriesChanges())
            },
            classString: 'btn btn-sm btn-outline-danger'
        },
        {
            label: <FontAwesomeIcon icon={faFloppyDisk} />,
            onClick: () => {
                dispatch(setFilteredCategories());
            },
            classString: 'btn btn-sm btn-outline-success'
        }
    ];


    return (
        <Dropdown 
            dropdownLinkText={"Categories"} 
            id={CATEGORY_FILTER_DROPDOWN_ID}
        >
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