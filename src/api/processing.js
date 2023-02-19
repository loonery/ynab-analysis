/**
 * 
 * @param {*} jsonArray 
 * @returns 
 */
const sortJsonAlphabetically = (jsonArray) => {
    const sortedJson = jsonArray.map((row) => {
        const ordered = Object.keys(row).sort().reduce(
            (obj, key) => { 
              obj[key] = row[key]; 
              return obj;
            }, {});
        return ordered
    });

    return sortedJson;
}

/**
 * Converts an array of JSON objects into a csv representation.
 * 
 * @param {the array of json objects to be converted to a csv format} jsonArray 
 * @returns the csv as a String type
 */
export const JsonToCsv = (jsonArray) => {
    
    jsonArray = sortJsonAlphabetically(jsonArray);

    const fields = Object.keys(jsonArray[0]);
    const replacer = (key, value) => {return value === null ? '' : value;}

    let csv = jsonArray.map((object) => {
        return fields.map((field) => {
            const value = (object[field]);
            const csvValue = JSON.stringify(value, replacer);
            return csvValue;
        }).join(',')
    })

    csv.unshift(fields.join(','));
    csv = csv.join('\r\n');
    return csv;
}