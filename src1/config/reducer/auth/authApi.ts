import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'; //middleware didalam redux untuk manage asyncronus proses didalam redux

const API_URL = import.meta.env.VITE_API_URL;

export interface IAuthData {
  email: string;
  password: string;
}

export const postSignIn = createAsyncThunk(
  'auth/postSignIn',
  async (data: IAuthData,{rejectWithValue}) => {
    try {
      const res = await axios.post(`${API_URL}/auth/signin`, {
        email: data.email,
        password: data.password,
      });
      return res.data;
    } catch (e : any) {
      return rejectWithValue(e.response?.data);
    }
  },
);

export const postSignUp = createAsyncThunk(
  'auth/postSignUp',

  async (data: IAuthData,{rejectWithValue}) => {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        email: data.email,
        password: data.password,
      });
      return res.data;
    } catch (e : any) {
      return rejectWithValue(e.response?.data);
    }
  },
);
