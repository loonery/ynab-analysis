export const assembleCategoryCheckboxObjects = (checkboxHirearchy) => {
  // all checkboxes start checked
  const checked = true;

  // Create an object that looks like this for each parent category and return them
  // as an array
  // {
  //     parentName: String,
  //     checked: Boolean
  //     childObjects: [{checkboxObject}, {...}, {...}],
  // }
  const parentNames = Object.keys(checkboxHirearchy);
  const checkboxObjects = parentNames.map((parentName) => {
    const childNames = checkboxHirearchy[parentName];
    const childObjects = childNames.sort().map((childName) => {
      return {
        childName,
        checked,
      };
    });
    return {
      parentName,
      checked,
      childObjects,
    };
  });
  return checkboxObjects;
};
