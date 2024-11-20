import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getOrderDetail = createAsyncThunk(
  'order/getOrderDetail',
  async ({id, token}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `http://192.168.238.158:3000/api/v1/order/${id}`,
        {
          headers: {
            Content: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('Somethink when wrong');
      }
    }
  },
);

export const getMyOrder = createAsyncThunk(
  'order/getMyOrder',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        'http://192.168.238.158:3000/api/v1/order/myorder',
        {
          headers: {
            Content: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('Somethink when wrong');
      }
    }
  },
);


export const postOrder = createAsyncThunk(
  'order/postOrder',
  async ({form, token}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'http://192.168.238.158:3000/api/v1/order',
        form,
        {
          headers: {
            Content: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('Somethink when wrong');
      }
    }
  },
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({id,form, token}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `http://192.168.238.158:3000/api/v1/order/${id}/updateOrder`,form,
        {
          headers: {
            Content: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('Somethink when wrong');
      }
    }
  },
);

