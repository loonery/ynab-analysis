import React from 'react';

import { NestedCheckBoxSection } from './NestedCheckBoxSection';

const NestedCheckBoxList = ({ checkboxSections, parentOnClick, childOnClick }) => {
  return checkboxSections.map((sectionObject, index) => {
    return (
      <NestedCheckBoxSection
        key={'nested-section-' + index}
        checkBoxSection={sectionObject}
        parentOnClick={parentOnClick}
        childOnClick={childOnClick}
      />
    );
  });
};
export default NestedCheckBoxList;
