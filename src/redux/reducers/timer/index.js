// timerSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  endTime: null, // Stores the countdown end timestamp
  bank : null
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setEndTime(state, action) {
      state.endTime = action.payload; // Set the end time to Redux
    },
    setBank (state,action) {
      state.bank = action.payload
    },
    clearTime : (state) => initialState
  },
});

export const selectEndTime = (state) => state.timer.endTime; // Selector for endTime
export const selectBank =(state) => state.timer.bank
export const { setEndTime,clearTime ,setBank} = timerSlice.actions;
export default timerSlice.reducer;
