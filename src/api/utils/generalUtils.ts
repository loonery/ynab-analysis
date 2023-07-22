import { MonthYear } from 'store/interfaces/types/MonthYear';

// converts Ynab amount encodings to a decimal base
export const convertAmount = (amount: number): number => {
  const floatString: string = (amount / 1000).toFixed(2);
  return parseFloat(floatString);
};

/**
 *
 */
export const convertDateToMonthYear = (
  date: string,
): { day: string; month: string; year: string; month_year: MonthYear } => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  };

  // parse the date as a string array
  const timestamp: Date = new Date(date);
  let stringDate: string | string[] = timestamp.toLocaleString('default', options);
  stringDate = stringDate.replace(',', '');
  stringDate = stringDate.split(' ');

  // assign the different portions of the date to keys on the transaction
  const day = stringDate[1];
  const month = stringDate[0];
  const year = stringDate[2];
  const month_year: MonthYear = (stringDate[0] + ' ' + stringDate[2]) as MonthYear;
  return { day, month, year, month_year };
};
