import {combineReducers} from '@reduxjs/toolkit';
import userSlice from './user';
import carSlice from './cars'
import timerSlice from './timer'
import orderSlcie from './order'

const rootReducer = combineReducers({
  user: userSlice,
  cars : carSlice,
  timer : timerSlice,
  order : orderSlcie
});

export default rootReducer;
