import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesService } from 'api/services/categoriesServices';

const fetchCategoriesThunk = createAsyncThunk('categories/fetch', async () => {
  const categories = await getCategoriesService();
  console.log(categories);
  return categories;
});

export { fetchCategoriesThunk };
