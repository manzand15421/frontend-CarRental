import {createSlice} from '@reduxjs/toolkit';
import {getOrderDetail, getMyOrder, postOrder, updateOrder} from './api';

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
    statusChange : (state) => {
state.status = 'idle'
    }
  },
  extraReducers: builder => {
    builder.addCase(getOrderDetail.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getOrderDetail.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload.data;
      state.message = action.payload;
    });
    builder.addCase(getOrderDetail.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.payload;
    });

    builder.addCase(getMyOrder.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getMyOrder.fulfilled, (state, action) => {
      state.status = 'idle';
      state.data = action.payload.data;
      state.message = action.payload;
    });
    builder.addCase(getMyOrder.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.payload;
    });

    builder.addCase(postOrder.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload.data;
      state.message = action.payload;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.payload;
    });

    builder.addCase(updateOrder.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload.data;
      state.message = action.payload;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.payload;
    });
  },
});

export const selectOrder = (state) => state.order;
export const {resetOrder,statusChange} = orderSlice.actions;
export {getOrderDetail, getMyOrder, postOrder, updateOrder};
export default orderSlice.reducer;
