import React from 'react';

import CategorySelector from 'components/reports/SpendingByCategoryReport/components/CategorySelector/CategorySelector';
import SpendingByCategoryPlotContainer from 'components/reports/SpendingByCategoryReport/components/SpendingByCategoryPlot/SpendingByCategoryPlotContainer';
import { PageContainer } from 'libs/reuse/containers/PageContainer';

const SpendingAnalysisPage = () => {
  // dispatch to fetch the transactions

  return (
    <PageContainer>
      <CategorySelector />
      <SpendingByCategoryPlotContainer />
    </PageContainer>
  );
};
export default SpendingAnalysisPage;
