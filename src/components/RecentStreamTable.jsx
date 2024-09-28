import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Select, Input } from 'antd';
import recentStreamsData from '../data/recentStreams.json';

const { Option } = Select;

const RecentStreamTable = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState('dateStreamed');
  const [sortOrder, setSortOrder] = useState('descend');
  const [filters, setFilters] = useState({ artist: '', songName: '' });

  const filteredData = useMemo(() => {
    return recentStreamsData.recentStreams.filter(item =>
      item.artist.toLowerCase().includes(filters.artist.toLowerCase()) &&
      item.songName.toLowerCase().includes(filters.songName.toLowerCase())
    );
  }, [filters]);

  const sortedData = useMemo(() => {
    if (sortField && sortOrder) {
      return [...filteredData].sort((a, b) => {
        let comparison = 0;
        if (a[sortField] < b[sortField]) comparison = -1;
        if (a[sortField] > b[sortField]) comparison = 1;
        return sortOrder === 'ascend' ? comparison : -comparison;
      });
    }
    return filteredData;
  }, [filteredData, sortField, sortOrder]);

  const paginatedData = useMemo(() => {
    const { current, pageSize } = pagination;
    return sortedData.slice((current - 1) * pageSize, current * pageSize);
  }, [sortedData, pagination]);

  const fetchData = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchData();
  }, [pagination, sortField, sortOrder, filters, fetchData]);

  const handleTableChange = useCallback((pagination, _, sorter) => {
    setPagination(pagination);
    if (sorter && sorter.field) {
      setSortField(sorter.field);
      setSortOrder(sorter.order);
    } else {
      setSortField(null);
      setSortOrder(null);
    }
  }, []);

  const handleFilterChange = useCallback((field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPagination(prev => ({ ...prev, current: 1 }));
  }, []);

  const columns = useMemo(() => [
    {
      title: 'Song Name',
      dataIndex: 'songName',
      sorter: true,
    },
    {
      title: 'Artist',
      dataIndex: 'artist',
      sorter: true,
    },
    {
      title: 'Date Streamed',
      dataIndex: 'dateStreamed',
      sorter: true,
    },
    {
      title: 'Stream Count',
      dataIndex: 'streamCount',
      sorter: true,
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
    },
  ], []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Stream History</h2>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Filter by Artist"
          onChange={e => handleFilterChange('artist', e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Input
          placeholder="Filter by Song Name"
          onChange={e => handleFilterChange('songName', e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          defaultValue={pagination.pageSize}
          onChange={value => setPagination(prev => ({ ...prev, pageSize: value }))}
          style={{ width: 60 }}
        >
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={50}>50</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={{
          ...pagination,
          total: sortedData.length,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        loading={loading}
        onChange={handleTableChange}
        rowKey="userId"
      />
    </div>
  );
};

export default React.memo(RecentStreamTable);