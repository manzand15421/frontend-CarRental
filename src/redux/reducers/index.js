import {combineReducers} from '@reduxjs/toolkit';
import userSlice from './user';
import carSlice from './cars'
import timerSlice from './timer'



const rootReducer = combineReducers({
  user: userSlice,
  cars : carSlice,
  timer : timerSlice,
 

});

export default rootReducer;
