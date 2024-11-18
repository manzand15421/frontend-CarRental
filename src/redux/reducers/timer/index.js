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
    clearTime : (state) => initialState,
    clear (state,action) {
      state.endTime = null
    }
  },
});

export const selectEndTime = (state) => state.timer.endTime; // Selector for endTime
export const selectBank =(state) => state.timer.bank
export const { setEndTime,clearTime ,setBank,clear} = timerSlice.actions;
export default timerSlice.reducer;
