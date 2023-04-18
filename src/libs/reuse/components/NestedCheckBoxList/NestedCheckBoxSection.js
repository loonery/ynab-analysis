import React, { Fragment } from "react";
import { Checkbox } from "libs/reuse/elements/StyledCheckbox";
import styled from "styled-components";

const ParentCheckboxContainer = styled.div`
    font-weight: 600;
`;

const ChildCheckboxContainer = styled.div`
  margin-left: 15px;
`;

export const NestedCheckBoxSection = ({ checkBoxSection, parentOnClick, childOnClick }) => {

  const { parentName, checked, childObjects } = checkBoxSection;

  return (
    <Fragment>
      <ParentCheckboxContainer>
        <Checkbox 
          labelText={parentName} 
          id={"parent-checkbox-" + parentName}
          checked={checked} 
          onChange={() => parentOnClick(parentName)}
        />
      </ParentCheckboxContainer>
      {/* children checkboxes */}
      {childObjects.map(({ childName, checked }, index) => 
        (<ChildCheckboxContainer>
          <Checkbox
            labelText={childName}
            id={"child-checkbox-" + childName}
            checked={checked}
            onChange={() => childOnClick(parentName, childName)}
          />
        </ChildCheckboxContainer>)
      )}
    </Fragment>
  );
};