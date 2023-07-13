import React, { Fragment } from 'react';

import { Checkbox } from 'libs/reuse/elements/form-controls/components/StyledCheckbox';

import { NestedCheckBoxSectionProps } from './interfaces/NestedCheckboxSection';
import { ParentCheckboxContainer, ChildCheckboxContainer } from './styles/styles';

// eslint-disable-next-line
export const NestedCheckBoxSection = ({
  index,
  checkBoxSection,
  parentOnClick,
  childOnClick,
}: NestedCheckBoxSectionProps) => {
  const { parentName, parentId, checked, childObjects } = checkBoxSection;

  return (
    <ParentCheckboxContainer id={`parent-checkbox-container-${parentId}-${index}`}>
      <Checkbox
        labelText={parentName}
        id={`parent-checkbox-${parentId}`}
        checked={checked}
        onChange={(): void => parentOnClick(parentId)}
      />

      {/* children checkboxes */}
      {childObjects.map(({ childName, childId, checked }, index) => (
        <ChildCheckboxContainer key={`child-checkbox-container-${parentId}-${index}`}>
          <Checkbox
            labelText={childName}
            id={`child-checkbox-${parentId}-${index}`}
            checked={checked}
            onChange={(): void => childOnClick(parentId, childId)}
          />
        </ChildCheckboxContainer>
      ))}
    </ParentCheckboxContainer>
  );
};
