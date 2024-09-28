import React from 'react';
import PieChart from './PieChart';
import data from '../data/data.json';

const UserDemographicsChart = ({ onError }) => {
  return (
    <PieChart
      data={data.userDemographics}
      title="User Demographics"
      onError={onError}
      labelKey="ageGroup"
      valueKey="percentage"
    />
  );
};

export default UserDemographicsChart;