import React, { Fragment } from 'react';

import { NestedCheckboxListProps } from './interfaces/NestedCheckboxSection';
import { NestedCheckBoxSection } from './NestedCheckBoxSection';

const NestedCheckBoxList = ({
  checkboxSections,
  parentOnClick,
  childOnClick,
}: NestedCheckboxListProps) => (
  <Fragment>
    {checkboxSections.map((sectionObject, index) => (
      <NestedCheckBoxSection
        key={'nested-section-' + index}
        checkBoxSection={sectionObject}
        parentOnClick={parentOnClick}
        childOnClick={childOnClick}
      />
    ))}
  </Fragment>
);
export default NestedCheckBoxList;
