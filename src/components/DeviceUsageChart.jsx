import React from "react";
import PieChart from "./PieChart";
import data from "../data/data.json";

const DeviceUsageChart = ({ onError }) => {
  return (
    <PieChart
      data={data.deviceUsage}
      title="Device Usage"
      onError={onError}
      labelKey="device"
      valueKey="percentage"
    />
  );
};

export default DeviceUsageChart;
