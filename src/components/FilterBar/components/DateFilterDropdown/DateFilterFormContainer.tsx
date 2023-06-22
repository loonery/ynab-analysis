import React from 'react';

import { FlexContainer } from 'libs/reuse/containers/FlexContainer';

import DateFilterForm from './DateFilterForm';

// eslint-disable-next-line
const DateFilterFormContainer = () => {
  return (
    <FlexContainer className={'justify-content-around'}>
      <DateFilterForm />
    </FlexContainer>
  );
};
export default DateFilterFormContainer;
