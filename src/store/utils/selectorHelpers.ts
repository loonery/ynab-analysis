import { sum } from 'd3';
import { Transaction } from 'interfaces/Transaction';

/* SpendingAnalysisSelectors helpers */
export const totalSpendingHelper = (t: Transaction[]): string => {
  const value = sum(t, (t) => Number(t.amount));
  return value.toFixed(2);
};
