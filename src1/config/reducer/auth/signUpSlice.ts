import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import { postSignUp } from "./authApi";
import { RootState } from "../../store";

export interface SignUpState {
    user : null | object
    token : null | string
    status : 'idle' | 'loading' | 'success' | 'error'
    message : null | string
}
const initialState:SignUpState = {
    user:null,
    token:null,
    status: 'idle', //ketika loading sttaus loading, ketika ini menjadi ini,ketika itu menjadi itu
    message : null,
} 

export const signUpSlice = createSlice({
    name : "signup",
    initialState,
    reducers: { //syncronus acion/function
    },
    extraReducers: (builder) => {

            builder.addCase(postSignUp.pending, (state,action) => { 
                state.status = 'loading'
            })
            builder.addCase(postSignUp.fulfilled,(state,action) => {
                state.status = 'success',
                state.user = action.payload.data.user,
                state.token = action.payload.data.token,
                state.message = action.payload.message
            })
            builder.addCase(postSignUp.rejected,(state,action)=> {
                state.status = 'error',
                state.message = action.payload?.data.message
            })

    }
})

export {postSignUp}
export const selectUser = (state:RootState) => state.authslices.signin.user
export default signUpSlice.reducer //selector