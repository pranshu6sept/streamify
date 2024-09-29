import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalUsers: 0,
  activeUsers: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserStats: (state, action) => {
      state.totalUsers = action.payload.totalUsers;
      state.activeUsers = action.payload.activeUsers;
    },
  },
});

export const { setUserStats } = userSlice.actions;

export default userSlice.reducer;
