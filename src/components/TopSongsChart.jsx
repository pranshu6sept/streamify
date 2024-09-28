import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import topSongsData from '../data/topSongsDateWise.json';

const TopSongsChart = React.memo(({ onError }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = useMemo(() => {
    // Aggregate streams for each song
    const songStreams = {};
    topSongsData.topSongsLast30Days.forEach(day => {
      day.songs.forEach(song => {
        const key = `${song.name} - ${song.artist}`;
        songStreams[key] = (songStreams[key] || 0) + song.streams;
      });
    });

    // Sort songs by total streams and get top 5
    const topSongs = Object.entries(songStreams)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      labels: topSongs.map(([song]) => song),
      data: topSongs.map(([, streams]) => streams)
    };
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const createChart = () => {
      try {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: chartData.labels,
            datasets: [{
              label: 'Total Streams',
              data: chartData.data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Total Streams'
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Top 5 Songs (Last 30 Days)'
              },
              legend: {
                display: false
              }
            }
          }
        });
      } catch (error) {
        console.error("Error creating TopSongsChart:", error);
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

export default TopSongsChart;