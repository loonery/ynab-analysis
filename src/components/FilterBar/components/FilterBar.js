import React from 'react';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import { Row } from 'react-bootstrap';

import AccountFilterDropdown from './AccountFilterDropdown/AccountFilterDropdown';
import CategoryFilterDropdown from './CategoryFilterDropdown/CategoryFilterDropdown';
import DateFilterDropdown from './DateFilterDropdown/DateFilterDropdown';

const FilterBar = () => {
  return (
    <Row className='border rounded p-3'>
      <FlexContainer gap={'20px'}>
        <CategoryFilterDropdown />
        <DateFilterDropdown />
        <AccountFilterDropdown />
      </FlexContainer>
    </Row>
  );
};
export default FilterBar;
