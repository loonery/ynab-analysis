import fs from 'fs';

// path to read data from
const dataPath = "../assets";

const budgetMonths = fs.readFile(dataPath + 'budgetMonths.json', (err) => {if (err) throw err; console.log("budgetMonths written successfully.\n")} );
const transactionMonths = fs.readFile(dataPath + 'transactions.json', (err) => {if (err) throw err; console.log("transactions written successfully.\n")} );

console.log(budgetMonths)