import React, { useEffect, useRef, useMemo } from "react";
import Chart from "chart.js/auto";

const PieChart = React.memo(({ data, title, onError, labelKey, valueKey }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = useMemo(() => {
    return {
      labels: data.map((item) => item[labelKey]),
      values: data.map((item) => item[valueKey]),
    };
  }, [data, labelKey, valueKey]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      try {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels: chartData.labels,
            datasets: [
              {
                data: chartData.values,
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(153, 102, 255)",
                  "rgb(255, 159, 64)",
                  "rgb(201, 203, 207)",
                  "rgb(255, 99, 71)",
                  "rgb(100, 149, 237)",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: title,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        });
      } catch (error) {
        console.error(`Error creating ${title} chart:`, error);
        onError();
      }
    };

    createChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, title, onError]);

  return <canvas ref={chartRef} />;
});

export default PieChart;
