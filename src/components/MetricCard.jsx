import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserStats } from "../store/userSlice";
import { setTopSongs } from "../store/songSlice";
import data from "../data/data.json";
import topSongsData from "../data/topSongsDateWise.json";

const MetricCard = React.memo(({ title, value }) => (
  <div className="bg-white shadow-md rounded-lg p-4 m-2">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
));

const MetricCards = () => {
  const dispatch = useDispatch();
  const { totalUsers, activeUsers } = useSelector((state) => state.user);
  const { topSongs } = useSelector((state) => state.song);

  useEffect(() => {
    const { userGrowth } = data;
    const latestMonth = userGrowth[userGrowth.length - 1];
    dispatch(
      setUserStats({
        totalUsers: latestMonth.totalUsers,
        activeUsers: latestMonth.activeUsers,
      })
    );

    dispatch(setTopSongs(topSongsData.topSongsLast30Days));
  }, [dispatch]);

  const { totalStreams, revenue, topArtist } = useMemo(() => {
    const totalStreams = topSongs.reduce(
      (sum, day) =>
        sum + day.songs.reduce((songSum, song) => songSum + song.streams, 0),
      0
    );

    const revenue = data.revenueDistribution.reduce(
      (sum, item) => sum + item.value,
      0
    );

    const artistStreamCounts = {};
    topSongs.forEach((day) => {
      day.songs.forEach((song) => {
        artistStreamCounts[song.artist] =
          (artistStreamCounts[song.artist] || 0) + song.streams;
      });
    });

    const topArtist = Object.entries(artistStreamCounts).reduce(
      (top, [artist, streams]) =>
        streams > top.streams ? { name: artist, streams } : top,
      { name: "", streams: 0 }
    );

    return { totalStreams, revenue, topArtist };
  }, [topSongs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <MetricCard title="Total Users" value={totalUsers.toLocaleString()} />
      <MetricCard title="Active Users" value={activeUsers.toLocaleString()} />
      <MetricCard title="Total Streams" value={totalStreams.toLocaleString()} />
      <MetricCard title="Revenue" value={`$${revenue.toLocaleString()}`} />
      <MetricCard title="Top Artist" value={topArtist.name} />
    </div>
  );
};

export default MetricCards;
