import React from 'react';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import { PageContainer } from 'libs/reuse/containers/PageContainer';

import AccountFilterDropdown from './AccountFilterDropdown/AccountFilterDropdown';
import CategoryFilterDropdown from './CategoryFilterDropdown/CategoryFilterDropdown';
import DateFilterDropdown from './DateFilterDropdown/DateFilterDropdown';

const FilterBar = () => {
  return (
    <PageContainer>
      <FlexContainer gap={'10px'}>
        <CategoryFilterDropdown />
        <DateFilterDropdown />
        <AccountFilterDropdown />
      </FlexContainer>
    </PageContainer>
  );
};
export default FilterBar;
