import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { apiClient } from "../../../config/axios";

export const getOrderDetail = createAsyncThunk(
  'order/getOrderDetail',
  async ({id, token}, {rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `/order/${id}`,
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
      const response = await apiClient.get(
        '/order/myorder',
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
      const response = await apiClient.post(
        '/order',
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
      const response = await apiClient.put(
        `/order/${id}/updateOrder`,form,
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

export const payment = createAsyncThunk(
  'order/payment',
  async ({id,receipt, token}, {rejectWithValue}) => {
    try {
      const response = await apiClient.put(
        `/order/${id}/payment`,
        receipt,
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

