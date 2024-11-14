import {combineReducers} from '@reduxjs/toolkit';
import userSlice from './user';
import carSlice from './cars'


const rootReducer = combineReducers({
  user: userSlice,
  cars : carSlice
});

export default rootReducer;
