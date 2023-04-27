import React from 'react';

import { SPENDING_CATEGORIES_COLORS } from 'components/SpendingByCategoryReport/consts/plotConsts';
console.log(SPENDING_CATEGORIES_COLORS);
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const ComposedSpendingChart = ({ data }) => {
  // remove the month key when generating keys
  const haveData = data.length > 0;
  const keys = haveData ? Object.keys(data[0]).slice(2) : [];

  return (
    <ResponsiveContainer width={'100%'} height={500}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={'month'} />
        <YAxis />
        {keys.map((key, index) => {
          return (
            <Bar
              key={index}
              stackId={'a'}
              dataKey={key}
              fill={SPENDING_CATEGORIES_COLORS[key]}
              onClick={(data) => {
                console.log(data);
              }}
            />
          );
        })}
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
};
ComposedSpendingChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      // Define the expected shape of each object in the array
      // For example, if each object has a 'name' and 'value' property:
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      // ...add other expected properties as needed...
    }),
  ).isRequired,
};
