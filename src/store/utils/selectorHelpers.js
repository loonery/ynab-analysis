import { sum } from 'd3';

/* SpendingAnalysisSelectors helpers */
export const totalSpendingHelper = (t) => {
  const value = sum(t, (t) => t.amount);
  return value.toFixed(2);
};
