import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    data : null,
    token : null,
    isLogin : false,
    status : 'idle',
    message : null,
}


const  userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        logout : (state,action) =>{
            state.data = null,
            state.isLogin = false,
            state.token = null
        }
     
    },
    extraReducers : {

    }
})

export default userSlice.reducer