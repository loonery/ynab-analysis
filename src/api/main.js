import { JsonToCsv } from "./processing.js"
import { getFlattenedBudgetMonths, getFlattenedTransactions } from "./api.js"
import fs from 'fs';

const main = async () => {
    
    // path to write gathered data to
    const dataPath = "./data/";
    
    // getting the data
    const flattenedBudgetMonths = await getFlattenedBudgetMonths().catch(error => console.log(error));
    const flattenedTransactions = await getFlattenedTransactions().catch(error => console.log(error));
    
    // converting the data to a sorted csv format
    const bugetMonthsCsv = JsonToCsv(flattenedBudgetMonths);
    const transactionsCsv = JsonToCsv(flattenedTransactions);
    
    // writing the csvs to the file system
    fs.writeFile(dataPath + 'budgetMonths.csv', 
                 bugetMonthsCsv, 
                 (err) => {if (err) throw err; console.log("budgetMonths written successfully.\n")} 
                 );
    
    fs.writeFile(dataPath + 'transactions.csv',
                 transactionsCsv, 
                 (err) => {if (err) throw err; console.log("transactions written successfully.\n")} 
                 );
}
main()