import fs from 'fs';
import { group } from 'd3';

// path to read data from
const dataPath = "./assets/";

let budgetMonths = fs.readFileSync(dataPath + 'budgetMonths.json', 'utf8', (err, data) => {if (err) throw err; console.log("budgetMonths read successfully.\n"); console.log(data)} );
let transactions = fs.readFileSync(dataPath + 'transactions.json', 'utf8', (err) => {if (err) throw err; console.log("transactions read successfully.\n")} );

// convert JSON files back to Json type from String
transactions = JSON.parse(transactions);
budgetMonths = JSON.parse(budgetMonths);

const groupTransactionsByCategory = (transactions) => {

    console.log(transactions)
    transactions = group(transactions, t=>t.month_year, t=>t.category_group_name);
    console.log(transactions);

}
groupTransactionsByCategory(transactions);