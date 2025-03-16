//ApplicationChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ApplicationChart = () => {
  const data = [
    { month: 'Jan', applications: 65 },
    { month: 'Feb', applications: 85 },
    { month: 'Mar', applications: 120 },
    { month: 'Apr', applications: 90 },
    { month: 'May', applications: 110 },
    { month: 'Jun', applications: 95 },
  ];


  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 40 }}
      >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis
          dataKey="month"
          tick={{ fill: '#6B7280', fontSize: 10 }}
          tickLine={{ stroke: '#6B7280' }}
          axisLine={{ stroke: '#E5E7EB' }}
          interval={0}
        />
        <YAxis
          tick={{ fill: '#6B7280', fontSize: 12 }}
          tickLine={{ stroke: '#6B7280' }}
          axisLine={{ stroke: '#E5E7EB' }}
          domain={[0, 'dataMax + 20']}
          width={40}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '8px',
          }}
          formatter={(value) => [`${value} applications`]}
        />
        <Line
          type="monotone"
          dataKey="applications"
          name="Applications"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: '#3B82F6', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: '10px',
          }}
        />
      </LineChart>

    </ResponsiveContainer>
  );
};

export default ApplicationChart;