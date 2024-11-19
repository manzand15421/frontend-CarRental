import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (id,{rejectWithValue}) => {
    try {
      const response = await axios.get(
        `http://192.168.238.158:3000/api/v1/order/${id}`,
        // {
        //   headers: {
        //     Content: 'application/json',
        //     Authorization: `Bearer ${token}`,
        //   },
        // },
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
