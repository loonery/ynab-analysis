// converts Ynab amount encodings to a decimal base
export const convertAmount = (amount: number): string => {
  return (amount / 1000).toFixed(2);
};
