import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import songReducer from "./songSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
  },
});
