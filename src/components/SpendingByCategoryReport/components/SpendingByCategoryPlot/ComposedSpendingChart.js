import React from 'react';

import {
  BarChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ComposedSpendingChart = () => {
  return (
    <ResponsiveContainer>
      <ComposedChart>
        <BarChart>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Bar />
          <Tooltip />
          <Legend />
        </BarChart>
      </ComposedChart>
    </ResponsiveContainer>
  );
};
