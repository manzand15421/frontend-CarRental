// timerSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  endTime: null, // Stores the countdown end timestamp
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setEndTime(state, action) {
      state.endTime = action.payload; // Set the end time to Redux
    },
    clearTime : (state) => initialState,
    clear (state,action) {
      state.timer = null
    }
  },
});

export const selectEndTime = (state) => state.timer.endTime; // Selector for endTime
export const { setEndTime,clearTime } = timerSlice.actions;
export default timerSlice.reducer;
