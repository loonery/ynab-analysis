import { CategoryGroup, SubCategory } from './Category';

export interface Transaction {
  account_id: string;
  account_name: string;
  amount: string;
  approved: boolean;
  category_group: CategoryGroup | undefined;
  subcategory: SubCategory | undefined;
  cleared: ['cleared', 'uncleared', 'reconciled'];
  debt_transaction_type: string | null;
  deleted: boolean;
  flag_color: string | null;
  id: string;
  import_id: string | null;
  import_payee_name: string | null;
  import_payee_name_original: string | null;
  matched_transaction_id: string | null;
  memo: string | null;
  payee_id: string | null;
  payee_name: string | null;
  transfer_account_id: string | null;
  transfer_transaction_id: string | null;
  date: string;
  day: string;
  month: string;
  year: string;
  month_year: string;
}
