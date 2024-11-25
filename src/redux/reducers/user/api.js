import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../config/axios";

export const postLogin = createAsyncThunk(
    'user/postLogin',
    async (payload, {rejectWithValue}) => {
     
        try {
            const response = await apiClient.post(
              '/auth/signin',
               payload ,{
                headers : {
                    'Content' : 'application/json' 
                }
              }
            );

            const data = response.data;
            return data;
          }  catch (error) {
            
            if (error.response.data) {
              return rejectWithValue(error.response.data.message)
             
            }else {
              return rejectWithValue("Somethink when wrong")
            }
        
        
          }

    }
) 


export const postRegister = createAsyncThunk(
  'user/postRegister',
  async (payload, {rejectWithValue}) => {
   
      try {
          const response = await apiClient.post(
            '/auth/signup',
             payload ,{
              headers : {
                  'Content' : 'application/json' 
              }
            }
          );
          const data = response.data;
          return data;
        }  catch (error) {
          
          if (error.response.data) {
            return rejectWithValue(error.response.data.message)
           
          }else {
            return rejectWithValue("Somethink when wrong")
          }
      
      
        }

  }
) 


export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (token,{rejectWithValue}) =>  {

        try {
            const response = await apiClient.get('/auth/whoami',
               {
                headers : {
                    'Content' : 'application/json' ,
                    Authorization : `Bearer ${token}`
                }})

                const {data} = response.data
                return data;

        } catch(error){
    if(error.response.data) {
        return rejectWithValue(error.response.data.message)

    }
    else {
        return rejectWithValue('Something When Wrong')
    }
        }
    }
   
)

export const GoogleLogin = createAsyncThunk(
    'user/googleLogin',
    async (payload,{rejectWithValue}) =>  {

        try {
            const response = await apiClient.post('/auth/googleSignIn',payload)

                const data = response.data
                return data;

        } catch(error){
    if(error.response.data) {
        return rejectWithValue(error.response.data.message)

    }
    else {
        return rejectWithValue('Something When Wrong')
    }
        }
    }
   
)