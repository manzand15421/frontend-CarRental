import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { apiClient } from "../../../config/axios";

export const getCars = createAsyncThunk(
  'user/getCars',
  async (rejectWithValue) => {
    try {
      const response = await apiClient.get(
        '/cars',
        {
        //   params:{
        //     page: page,
        // },
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

export const getCarsDetail = createAsyncThunk(
  'user/getCarsDetail',
  async ({id,token},{rejectWithValue}) => {
    try {
      const response = await apiClient.get(
        `/cars/${id}`,
        {
        //   params:{
        //     page: page,
        // },
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
