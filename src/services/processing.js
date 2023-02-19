/**
 * 
 * @param {*} jsonArray 
 * @returns 
 */
export const sortJsonAlphabetically = (jsonArray) => {
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
