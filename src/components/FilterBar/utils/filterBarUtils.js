// all checkboxes start checked
// Create an object that looks like this for each parent category and return them
// as an array
// {
//     parentName: String,
//     checked: Boolean
//     childObjects: [{checkboxObject}, {...}, {...}],
// }

export const assembleCategoryCheckboxObjects = (categoryObjectArray) => {
  const checkboxObjects = categoryObjectArray.map((parent) => {
    const checked = true;
    const parentId = parent.id;
    const parentName = parent.name;
    const childObjects = parent.categories.map((childName) => {
      return {
        childName: childName.name,
        childId: childName.id,
        checked,
      };
    });
    return {
      parentId,
      parentName,
      checked,
      childObjects,
    };
  });

  return checkboxObjects;
};

export const assembleAccountCheckboxes = (accountObjectArray) => {
  let accountTypes = new Set();
  for (let account of accountObjectArray) {
    accountTypes.add(account.type);
  }
  accountTypes = Array.from(accountTypes);

  const parents = accountTypes.map((type) => {
    const parentName = type;
    const checked = true;
    const childObjects = accountObjectArray
      .filter((account) => account.type === type)
      .map((account) => {
        return {
          childName: account.name,
          childId: account.id,
          checked,
        };
      });
    return {
      parentName,
      checked,
      childObjects,
    };
  });
  return parents;
};
