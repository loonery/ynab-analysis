export const processCategories = (categories) => {
  categories = categories.filter((category) => {
    return category.categories.length > 0;
  });
  return categories;
};
