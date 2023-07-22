import { sum } from 'd3';
import { Transaction } from 'interfaces/Transaction';

/* SpendingAnalysisSelectors helpers */
export const totalSpendingHelper = (t: Transaction[]): number => {
  const value = sum(t, (t) => Number(t.amount));
  return parseFloat(value.toFixed(2));
};
