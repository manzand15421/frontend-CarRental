    import {createSlice} from '@reduxjs/toolkit';
    import {getProfile, postLogin} from './api';

    const initialState = {
    data: null,
    token: null,
    login: false,
    status: 'idle',
    message: null
    };

    const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
        state.data = null;
        state.login = false;
        state.token = null;
        state.message = null;
        state.status = 'idle';
        },

        resetState : (state) => initialState
    },
    extraReducers: builder => {
        builder.addCase(postLogin.pending, (state, action) => {
        state.status = 'loading';
        });
        builder.addCase(postLogin.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.data.user;
        state.token = action.payload.data.token;
        state.login = true
        state.message = action.payload.message;
        });
        builder.addCase(postLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload;
        });

        builder.addCase(getProfile.pending, (state, action) => {
        state.status = 'loading';
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.user;
        state.login = true
        state.message = action.message;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload;
        });
    },
    });

    export const selectUser = (state) => state.user; // selector untuk mengambil state user
    export const {logout,resetState} = userSlice.actions; // action untuk logout
    export {postLogin, getProfile}; // action untuk panggil api,jadi ketika import index ini sudah include apinya
    export default userSlice.reducer; // user reducer untuk bisa dipanggil ke store
