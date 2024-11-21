// timerSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  endTime: null, // Stores the countdown end timestamp
  bankName : null,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setEndTime(state, action) {
      state.endTime = action.payload; // Set the end time to Redux
    },
    setBank (state,action) {
      state.bankName = action.payload.name
    },
    clearTime : (state) => initialState,
    clear (state,action) {
      state.endTime = null
    }
  },
});

export const selectEndTime = (state) => state.timer.endTime; // Selector for endTime
export const selectBankName =(state) => state.timer.bankName
export const { setEndTime,clearTime ,setBank,clear} = timerSlice.actions;
export default timerSlice.reducer;
