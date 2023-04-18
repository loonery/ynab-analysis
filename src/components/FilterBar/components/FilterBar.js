import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import { Row } from 'react-bootstrap';

import CategoryFilterDropdown from './CategoryFilterDropdown/CategoryFilterDropdown';
import DateFilterDropdown from './DateFilterDropdown/DateFilterDropdown';

const FilterBar = () => {
  return (
    <Row className='border rounded p-3'>
      <FlexContainer>
        <CategoryFilterDropdown />
        <DateFilterDropdown />
      </FlexContainer>
    </Row>
  );
};
export default FilterBar;
