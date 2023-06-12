export interface YnabTransaction {
  id: string;
  date: string;
  amount: number;
  memo: string | null;
  cleared: ['cleared', 'uncleared', 'reconciled'];
  approved: boolean;
  flag_color: string | null;
  account_id: string;
  payee_id: string;
  category_id: string;
  transfer_account_id: string | null;
  transfer_transaction_id: string | null;
  matched_transaction_id: string | null;
  import_id: string | null;
  import_payee_name: string | null;
  import_payee_name_original: string | null;
  debt_transaction_type: string | null;
  deleted: boolean;
  account_name: string;
  payee_name: string;
  category_name: string | null;
  subtransactions: YnabSubtransaction[] | undefined;
}

export interface YnabSubtransaction {
  id: string;
  transaction_id: string;
  amount: number;
  memo: string | null;
  payee_id: string | null;
  payee_name: string | null;
  category_id: string;
  category_name: string | null;
  transfer_account_id: string | null;
  transfer_transaction_id: string | null;
  deleted: boolean;
}

export interface YnabTransactionsResponse {
  data: {
    transactions: YnabTransaction[];
    server_knowledge: number;
  };
}
