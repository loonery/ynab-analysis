import axios from 'axios';

import { API_BASE, BUDGET_ID, DEFAULT_HEADERS } from '../consts/apiConsts';
import { processCategories } from '../utils/categoriesHelpers';

export const getCategoriesService = async () => {
  const categoriesResponse = await axios.get(
    `${API_BASE}/budgets/${BUDGET_ID}/categories`,
    {
      headers: DEFAULT_HEADERS,
    },
  );
  let categories = categoriesResponse.data.data.category_groups;
  categories = processCategories(categories);
  return categories;
};
