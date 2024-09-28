import React from 'react';
import PieChart from './PieChart';
import data from '../data/data.json';

const GenrePopularityChart = ({ onError }) => {
  return (
    <PieChart
      data={data.genrePopularity}
      title="Genre Popularity"
      onError={onError}
      labelKey="genre"
      valueKey="popularity"
    />
  );
};

export default GenrePopularityChart;