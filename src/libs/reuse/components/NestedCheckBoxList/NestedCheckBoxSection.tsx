import React, { Fragment } from 'react';

import { Checkbox } from 'libs/reuse/elements/StyledCheckbox';

import { NestedCheckBoxSectionProps } from './interfaces/NestedCheckboxSection';
import { ParentCheckboxContainer, ChildCheckboxContainer } from './styles/styles';

// eslint-disable-next-line
export const NestedCheckBoxSection = ({
  checkBoxSection,
  parentOnClick,
  childOnClick,
}: NestedCheckBoxSectionProps) => {
  const { parentName, checked, childObjects } = checkBoxSection;

  return (
    <Fragment>
      <ParentCheckboxContainer>
        <Checkbox
          labelText={parentName}
          id={'parent-checkbox-' + parentName}
          checked={checked}
          onChange={(): void => parentOnClick(parentName)}
        />
      </ParentCheckboxContainer>

      {/* children checkboxes */}
      {childObjects.map(({ childName, checked }, index) => (
        <ChildCheckboxContainer key={'child-checkbox-' + childName + index}>
          <Checkbox
            labelText={childName}
            id={'child-checkbox-' + childName}
            checked={checked}
            onChange={(): void => childOnClick(parentName, childName)}
          />
        </ChildCheckboxContainer>
      ))}
    </Fragment>
  );
};
