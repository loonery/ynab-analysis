import { sortJsonAlphabetically } from "./processing.js"
import { getFlattenedBudgetMonths, getFlattenedTransactions } from "./getYnabData.js"
import fs from 'fs';

const write = async () => {
    
    // path to write gathered data to
    const dataPath = "./assets/";
    
    // getting the data
    const flattenedBudgetMonths = await getFlattenedBudgetMonths().catch(error => console.log(error));
    const flattenedTransactions = await getFlattenedTransactions().catch(error => console.log(error));
    
    // converting the data to a sorted csv format
    const budgetMonthsData = JSON.stringify(sortJsonAlphabetically(flattenedBudgetMonths));
    const transactionsData = JSON.stringify(sortJsonAlphabetically(flattenedTransactions));
    
    // writing the csvs to the file system
    fs.writeFile(dataPath + 'budgetMonths.json', 
                 budgetMonthsData, 
                 (err) => {if (err) throw err; console.log("budgetMonths written successfully.\n")} 
                 );
    
    fs.writeFile(dataPath + 'transactions.json',
                 transactionsData, 
                 (err) => {if (err) throw err; console.log("transactions written successfully.\n")} 
                 );
}
write();