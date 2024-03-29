import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';

export const COMPOSED_SPENDING_CHART_CONSTANT_PROPS: CategoricalChartProps = {
  stackOffset: 'sign',
  width: 500,
  height: 300,
  margin: {
    top: 20,
    right: 30,
    left: 20,
    bottom: 5,
  },
};

export const CARTESIAN_GRID_STROKE_DASH_ARRAY = '3 3';
export const CATEGORY_GROUP_SELECT_ID = 'category-group-select';
export const CATEGORY_GROUP_SELECT_LABEL = 'Category Group';
export const SUB_CATEGORY_SELECT_ID = 'subcategory-select';
export const SUB_CATEGORY_GROUP_SELECT_LABEL = 'Subcategory';
