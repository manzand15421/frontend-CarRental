import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getCars = createAsyncThunk(
  'user/getCars',
  async (token,{rejectWithValue}) => {
    try {
      const response = await axios.get(
        'http://192.168.1.35:3000/api/v1/cars',
        {
          headers: {
            Content: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      //Untuk async storage ( menyimpan data )
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
