import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import { postSignIn } from "./authApi";
import { RootState } from "../../store";
import reducer from "./signUpSlice";

export interface SignInState {
    user : null | object
    token : null | string
    status : 'idle' | 'loading' | 'success' | 'error'
    message : null | string
}
const initialState:SignInState = {
    user:null,
    token:null,
    status: 'idle', //ketika loading sttaus loading, ketika ini menjadi ini,ketika itu menjadi itu
    message : null,
} 

export const signInSlice = createSlice({
    name : "signin",
    initialState,
    reducers: { //syncronus acion/function
        logout: (state) => {
            state.user = null
            state.token = null
            state.message = 'madang'
            state.status = 'idle'
        }
    },
    extraReducers: (builder) => {

            builder.addCase(postSignIn.pending, (state,action) => { 
                state.status = 'loading'
            })
            builder.addCase(postSignIn.fulfilled,(state,action) => {
                state.status = 'success',
                state.user = action.payload.data.user,
                state.token = action.payload.data.token,
                state.message = action.payload.message
            })
            builder.addCase(postSignIn.rejected,(state,action)=> {
                console.log(action.payload)
                state.status = 'error',
                state.message = action.payload?.data.message
            })

    }
})

export const {logout} = signInSlice.actions
export {postSignIn}
export const selectUser = (state:RootState) => state.authslices.signin.user
export default signInSlice.reducer //selector