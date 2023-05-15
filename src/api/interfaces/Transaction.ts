interface Transaction {
  account_id: string;
  account_name: string;
  amount: number;
  approved: boolean;
  category_group_id: string;
  category_group_name: string;
  category_id: string;
  category_name: string;
  cleared: string;
  date: string;
  day: string;
  debt_transaction_type: string | null;
  deleted: false;
  flag_color: null;
  id: string;
  import_id: string;
  import_payee_name: string;
  import_payee_name_original: string;
  matched_transaction_id: string;
  memo: string;
  month: string;
  month_year: string;
  payee_id: string;
  payee_name: string;
  transfer_account_id: string | null;
  transfer_transaction_id: string | null;
  year: string;
}
