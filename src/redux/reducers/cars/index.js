import { createSlice } from "@reduxjs/toolkit";
import { getCars } from "./api";

const initialState = {
    data : null,
    status : 'idle',
    message : null
}


const carSlice = createSlice({
    name : 'cars',
    initialState,
    reducers : {
        resetState : (state) => initialState
    },
    extraReducers : builder => {
        builder.addCase(getCars.pending,(state,action) => {
            state.status = 'loading'
        })
        builder.addCase(getCars.fulfilled,(state,action) => {
            state.status = 'success'
            state.data = action.payload.data
            state.message = action.payload
        })
        builder.addCase(getCars.rejected,(state,action)=> {
            state.status = 'failed'
            state.message = action.payload
        })
    }

})


export const selectCars = (state) => state.cars
export const {resetState} = carSlice.actions
export {getCars}
export default carSlice.reducer
