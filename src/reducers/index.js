import { combineReducers } from 'redux';

import authReducer from './authReducer.js';
import fetchReducer from './fetchReducer.js';

export default combineReducers({
  auth:authReducer,
  fetched:fetchReducer
});