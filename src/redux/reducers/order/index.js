import {createSlice} from '@reduxjs/toolkit';
import {getOrder} from './api';

const initialState = {
  data: null,
  status: 'idle',
  message: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getOrder.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload.data;
      state.message = action.payload;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.payload;
    });
  },
});

export const selectOrder = (state) => state.order
export const {resetOrder} = orderSlice.actions
export {getOrder}
export default orderSlice.reducer