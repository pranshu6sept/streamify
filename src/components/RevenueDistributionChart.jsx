import React from 'react';
import PieChart from './PieChart';
import data from '../data/data.json';

const RevenueDistributionChart = ({ onError }) => {
  return (
    <PieChart
      data={data.revenueDistribution}
      title="Revenue Distribution"
      onError={onError}
      labelKey="name"
      valueKey="value"
    />
  );
};

export default RevenueDistributionChart;