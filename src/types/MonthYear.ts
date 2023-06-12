const dateRegex = `${/^\d{4`}$/}`;
type YearFormat = `${string & typeof dateRegex}`;
export type MonthYear = `${
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec'} ${YearFormat}`;
