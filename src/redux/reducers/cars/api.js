import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCars = createAsyncThunk(
    'user/getCars',
    async ({rejectWithValue}) => {
     
        try {
            const response = await axios.get(
            'http://192.168.238.158:3000/api/v1/cars',
             
            );
           
            //Untuk async storage ( menyimpan data )
            const {data} = response.data;
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

console.log('data cars',getCars)
