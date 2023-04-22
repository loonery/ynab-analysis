export const selectAllCategories = (state) => {
  return state.categories.categories;
};

export const selectAllCategoryGroupNames = (state) => {
  return state.categories.categories.map(({ name, id }) => {
    return { name, id };
  });
};

export const selectAllCategoryNames = (state) => {
  return state.categories.categories.map((category) => {
    const subCategories = category.categories;
    return subCategories.map(({ name, id }) => {
      return { name, id };
    });
  });
};
