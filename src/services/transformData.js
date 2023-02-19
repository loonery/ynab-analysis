import fs from 'fs';

// path to read data from
const dataPath = "./assets/";

let budgetMonths = fs.readFileSync(dataPath + 'budgetMonths.json', 'utf8', (err, data) => {if (err) throw err; console.log("budgetMonths read successfully.\n"); console.log(data)} );
let transactionMonths = fs.readFileSync(dataPath + 'transactions.json', (err) => {if (err) throw err; console.log("transactions read successfully.\n")} );

// convert budget months to an array
budgetMonths = budgetMonths.split("")
console.log(budgetMonths)