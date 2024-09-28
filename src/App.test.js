import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MetricCards from '../src/components/MetricCard';

const mockStore = configureStore([]);

describe('MetricCards', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        totalUsers: 5000000,
        activeUsers: 3500000,
      },
      song: {
        topSongs: [
          {
            date: '2024-09-27',
            songs: [
              { name: 'Song 1', artist: 'Artist 1', streams: 100000 },
              { name: 'Song 2', artist: 'Artist 2', streams: 90000 },
            ],
          },
          {
            date: '2024-09-26',
            songs: [
              { name: 'Song 3', artist: 'Artist 3', streams: 80000 },
              { name: 'Song 4', artist: 'Artist 4', streams: 70000 },
            ],
          },
        ],
      },
    });
  });

  test('renders all metric cards with correct data', () => {
    render(
      <Provider store={store}>
        <MetricCards />
      </Provider>
    );

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('50,00,000')).toBeInTheDocument();

    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('35,00,000')).toBeInTheDocument();

    expect(screen.getByText('Total Streams')).toBeInTheDocument();
    expect(screen.getByText('3,40,000')).toBeInTheDocument();

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$2,00,00,000')).toBeInTheDocument();

    expect(screen.getByText('Top Artist')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
  });

  test('dispatches actions on component mount', () => {
    render(
      <Provider store={store}>
        <MetricCards />
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe('user/setUserStats');
    expect(actions[1].type).toBe('song/setTopSongs');
  });
});