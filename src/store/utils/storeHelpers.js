export const getUniqueValues = (items, key) => {
  const uniqueValues = new Set();
  for (let item of items) {
    uniqueValues.add(item[key]);
  }
  return Array.from(uniqueValues.values());
};
