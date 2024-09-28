import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topSongs: [],
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setTopSongs: (state, action) => {
      state.topSongs = action.payload;
    },
  },
});

export const { setTopSongs, setRecentStreams } = songSlice.actions;

export default songSlice.reducer;