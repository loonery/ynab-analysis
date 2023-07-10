import React, { Fragment } from 'react';

import { Checkbox } from 'libs/reuse/elements/form-controls/components/StyledCheckbox';

import { NestedCheckBoxSectionProps } from './interfaces/NestedCheckboxSection';
import { ParentCheckboxContainer, ChildCheckboxContainer } from './styles/styles';

// eslint-disable-next-line
export const NestedCheckBoxSection = ({
  checkBoxSection,
  parentOnClick,
  childOnClick,
}: NestedCheckBoxSectionProps) => {
  const { parentName, parentId, checked, childObjects } = checkBoxSection;

  return (
    <Fragment>
      <ParentCheckboxContainer>
        <Checkbox
          labelText={parentName}
          id={'parent-checkbox-' + parentName}
          checked={checked}
          onChange={(): void => parentOnClick(parentId)}
        />
      </ParentCheckboxContainer>

      {/* children checkboxes */}
      {childObjects.map(({ childName, childId, checked }, index) => (
        <ChildCheckboxContainer key={'child-checkbox-container-' + index}>
          <Checkbox
            labelText={childName}
            id={'child-checkbox-' + index}
            checked={checked}
            onChange={(): void => childOnClick(parentId, childId)}
          />
        </ChildCheckboxContainer>
      ))}
    </Fragment>
  );
};
