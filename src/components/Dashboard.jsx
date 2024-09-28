import React, { useState, useCallback } from 'react'
import MetricCards from './MetricCard'
import UserGrowthChart from './UserGrowthChart'
import RevenueDistributionChart from './RevenueDistributionChart'
import GenrePopularityChart from './GenrePopularityChart'
import UserDemographicsChart from './UserDemographicsChart'
import DeviceUsageChart from './DeviceUsageChart'
import TopSongsChart from './TopSongsChart'
import RecentStreamTable from './RecentStreamTable'

const Dashboard = () => {
  const [userGrowthKey, setUserGrowthKey] = useState(0)
  const [pieChartsKey, setPieChartsKey] = useState(0)
  const [topSongsKey, setTopSongsKey] = useState(0)

  const resetCharts = useCallback(() => {
    setUserGrowthKey(prev => prev + 1)
    setPieChartsKey(prev => prev + 1)
    setTopSongsKey(prev => prev + 1)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <MetricCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <UserGrowthChart key={`user-growth-${userGrowthKey}`} onError={resetCharts} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <RevenueDistributionChart key={`revenue-distribution-${pieChartsKey}`} onError={resetCharts} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <GenrePopularityChart key={`genre-popularity-${pieChartsKey}`} onError={resetCharts} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <UserDemographicsChart key={`user-demographics-${pieChartsKey}`} onError={resetCharts} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <DeviceUsageChart key={`device-usage-${pieChartsKey}`} onError={resetCharts} />
        </div>
      </div>
      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <TopSongsChart key={`top-songs-${topSongsKey}`} onError={resetCharts} />
      </div>
      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <RecentStreamTable />
      </div>
    </div>
  )
}

export default Dashboard