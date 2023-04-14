import React, { Fragment, useCallback, useState } from "react"
import { Checkbox } from 'libs/reuse/elements/StyledCheckbox';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { 
    toggleParentCategory,
    toggleChildCategory
} from "store/slices/filterBarSlice";

const ParentCheckboxContainer = styled.div`
    font-weight: 600;
`;

const ChildCheckboxContainer = styled.div`
  margin-left: 15px;
`;

const CategoryCheckBoxSection = ({checkBoxSection}) => {

    const dispatch = useDispatch();
    const {categoryGroupName, checked, subCategoryObjects} = checkBoxSection;

    return (
    <Fragment>
        <ParentCheckboxContainer>
            <Checkbox 
                labelText={categoryGroupName} 
                id={'parent-checkbox-' + categoryGroupName}
                checked={checked} 
                onChange={() => dispatch(toggleParentCategory(categoryGroupName))} 
            />
        </ParentCheckboxContainer>
        {/* children checkboxes */}
        {subCategoryObjects.map((subCategoryCheckBox, index) => 
        <ChildCheckboxContainer>
            <Checkbox
                labelText={subCategoryCheckBox.subCategoryName}
                id={'child-checkbox-' + subCategoryCheckBox.subCategoryName}
                checked={subCategoryCheckBox.checked}
                onChange={() => dispatch(toggleChildCategory(
                    {
                        categoryGroupName, 
                        subCategoryName: subCategoryCheckBox.subCategoryName
                    }
                ))}
            />
        </ChildCheckboxContainer>
        )}
    </Fragment>
    )
}
export default CategoryCheckBoxSection;