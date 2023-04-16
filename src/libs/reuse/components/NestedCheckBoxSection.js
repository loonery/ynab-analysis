import React, { Fragment, useCallback, useState } from "react"
import { Checkbox } from 'libs/reuse/elements/StyledCheckbox';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { 
    toggleParentCheckbox,
    toggleChildCheckbox
} from "store/slices/filterBarSlice";

const ParentCheckboxContainer = styled.div`
    font-weight: 600;
`;

const ChildCheckboxContainer = styled.div`
  margin-left: 15px;
`;

export const NestedCheckBoxSection = ({ checkBoxSection, keys }) => {

    const dispatch = useDispatch();
    const { parentName, checked, childObjects } = checkBoxSection;

    return (
    <Fragment>
        <ParentCheckboxContainer>
            <Checkbox 
                labelText={parentName} 
                id={'parent-checkbox-' + parentName}
                checked={checked} 
                onChange={() => dispatch(toggleParentCheckbox(
                    {
                        parentName,
                        keys
                    }
                ))} 
            />
        </ParentCheckboxContainer>
        {/* children checkboxes */}
        {childObjects.map(({ childName, checked }, index) => 
        <ChildCheckboxContainer>
            <Checkbox
                labelText={childName}
                id={'child-checkbox-' + childName}
                checked={checked}
                onChange={() => dispatch(toggleChildCheckbox(
                    {
                        parentName, 
                        childName,
                        keys
                    }
                ))}
            />
        </ChildCheckboxContainer>
        )}
    </Fragment>
    )
}