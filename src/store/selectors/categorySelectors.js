export const selectAllCategories = (state) => {
  return state.categories.categories;
};

export const selectAllCategoryGroupNames = (state) => {
  return state.categories.categories.map(({ name }) => {
    return name;
  });
};

export const selectAllCategoryNames = (state) => {
  return state.categories.categories.map((category) => {
    const subCategories = category.categories;
    return subCategories.map(({ name }) => {
      return name;
    });
  });
};
