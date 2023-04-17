import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ButtonBar from 'libs/reuse/components/ButtonBar';
import { CustomDropdown } from 'libs/reuse/components/CustomDropdown';
import { StyledHr } from 'libs/reuse/elements/StyledHr';
import { StyledHeader4 } from 'libs/reuse/elements/StyledHeader4';
import CategoryCheckBoxesContainer from './CategoryCheckBoxesContainer'
import { CATEGORY_FILTER_DROPDOWN_ID } from '../consts/filterBarConsts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    selectAllCheckboxes, 
    selectNoCheckboxes, 
    saveCheckboxes,
    cancelCheckboxChanges,
    setFiltersFromState,
    toggleDropdown
} from '../../../store/slices/filterBarSlice'
import { useDispatch, useSelector } from 'react-redux';
import { selectDropdown } from 'store/selectors/filterBarSelectors';
import { CATEGORY_DROPDOWN_KEYS } from '../consts/filterBarConsts';

const CategoryFilterDropdown = () => {

    const dispatch = useDispatch();

    // header button definitions
    const headerButtons = [
        {
            label: "Select None",
            onClick: () => {
                dispatch(selectNoCheckboxes(CATEGORY_DROPDOWN_KEYS));
            },
            classString: 'btn btn-sm btn-outline-dark'
        },
        {
            label: "Select All",
            onClick: () => {
                dispatch(selectAllCheckboxes(CATEGORY_DROPDOWN_KEYS));
            },
            classString: 'btn btn-sm btn-outline-dark'
        },
    ];

    // footer button definitions
    const footerButtons = [
        {

            label: <FontAwesomeIcon icon={faXmark} />,
            onClick: () => {
                dispatch(toggleDropdown(CATEGORY_DROPDOWN_KEYS));
                dispatch(cancelCheckboxChanges(CATEGORY_DROPDOWN_KEYS))
            },
            classString: 'btn btn-sm btn-outline-danger'
        },
        {
            label: <FontAwesomeIcon icon={faFloppyDisk} />,
            onClick: () => {
                dispatch(toggleDropdown(CATEGORY_DROPDOWN_KEYS));
                dispatch(saveCheckboxes(CATEGORY_DROPDOWN_KEYS));
                dispatch(setFiltersFromState());
            },
            classString: 'btn btn-sm btn-outline-success'
        }
    ];

    const { show } = useSelector(state => selectDropdown(state, CATEGORY_DROPDOWN_KEYS));
    const onToggle = () => {
        // toggle the dropdown in state
        dispatch(toggleDropdown(CATEGORY_DROPDOWN_KEYS));
        // revert temp state back to saved state if clicked away
        dispatch(cancelCheckboxChanges(CATEGORY_DROPDOWN_KEYS));
    }

    return (
        <CustomDropdown 
            dropdownLinkText={"Categories"}
            onToggle={onToggle}
            show={show}
            id={CATEGORY_FILTER_DROPDOWN_ID}
        >
            <StyledHeader4>Categories</StyledHeader4>
            <StyledHr/>
                <ButtonBar buttons={headerButtons}/>
            <StyledHr/>
            <CategoryCheckBoxesContainer />
            <ButtonBar 
                buttons={footerButtons}
                padding={'30px 0px 0px 0px'}
                justify={'flex-end'}/>
        </CustomDropdown>
    );
}
export default CategoryFilterDropdown;