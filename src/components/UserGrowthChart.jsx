import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';
import data from '../data/data.json';

const UserGrowthChart = React.memo(({ onError }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = useMemo(() => {
    const labels = data.userGrowth.map(item => item.month);
    const totalUsers = data.userGrowth.map(item => item.totalUsers);
    const activeUsers = data.userGrowth.map(item => item.activeUsers);
    return { labels, totalUsers, activeUsers };
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const createChart = () => {
      try {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartData.labels,
            datasets: [
              {
                label: 'Total Users',
                data: chartData.totalUsers,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              },
              {
                label: 'Active Users',
                data: chartData.activeUsers,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                min: 2000000,  // Start at 2 million
                max: 5000000,  // End at 5 million
                ticks: {
                  stepSize: 1000000,  // 1 million gap
                  callback: function(value) {
                    return (value / 1000000) + 'M';
                  }
                },
                title: {
                  display: true,
                  text: 'Number of Users'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Month'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-US').format(context.parsed.y);
                    }
                    return label;
                  }
                }
              }
            }
          }
        });
      } catch (error) {
        console.error("Error creating UserGrowthChart:", error);
        onError();
      }
    };

    createChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, onError]);

  return <canvas ref={chartRef} />;
});

export default UserGrowthChart;