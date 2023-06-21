import React, { Fragment } from 'react';

import { Checkbox } from 'libs/reuse/elements/StyledCheckbox';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ParentCheckboxContainer = styled.div`
  font-weight: 600;
`;

const ChildCheckboxContainer = styled.div`
  margin-left: 15px;
`;

export const NestedCheckBoxSection = ({
  checkBoxSection,
  parentOnClick,
  childOnClick,
}) => {
  const { parentName, checked, childObjects } = checkBoxSection;

  return (
    <Fragment>
      <ParentCheckboxContainer>
        <Checkbox
          labelText={parentName}
          id={'parent-checkbox-' + parentName}
          checked={checked}
          onChange={() => parentOnClick(parentName)}
        />
      </ParentCheckboxContainer>

      {/* children checkboxes */}
      {childObjects.map(({ childName, checked }, index) => (
        <ChildCheckboxContainer key={'child-checkbox-' + childName + index}>
          <Checkbox
            labelText={childName}
            id={'child-checkbox-' + childName}
            checked={checked}
            onChange={() => childOnClick(parentName, childName)}
          />
        </ChildCheckboxContainer>
      ))}
    </Fragment>
  );
};
NestedCheckBoxSection.propTypes = {
  checkBoxSection: PropTypes.shape({
    parentName: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    childObjects: PropTypes.arrayOf(
      PropTypes.shape({
        childName: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  parentOnClick: PropTypes.func.isRequired,
  childOnClick: PropTypes.func.isRequired,
};
