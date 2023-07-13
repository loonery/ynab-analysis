import React, { Fragment } from 'react';

import { NestedCheckboxListProps } from './interfaces/NestedCheckboxSection';
import { NestedCheckBoxSection } from './NestedCheckBoxSection';

// eslint-disable-next-line
const NestedCheckBoxList = ({
  checkboxSections,
  parentOnClick,
  childOnClick,
}: NestedCheckboxListProps) => (
  <Fragment>
    {checkboxSections.map((sectionObject, index) => (
      <NestedCheckBoxSection
        key={'nested-section-' + index}
        index={index}
        checkBoxSection={sectionObject}
        parentOnClick={parentOnClick}
        childOnClick={childOnClick}
      />
    ))}
  </Fragment>
);
export default NestedCheckBoxList;
