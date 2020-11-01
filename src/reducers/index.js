import { combineReducers } from 'redux';

import authReducer from './authReducer.js';
import fetchReducer from './fetchReducer.js';
import editClientReducer from './editClientReducer.js';

export default combineReducers({
  auth:authReducer,
  fetched:fetchReducer,
  editClient:editClientReducer
});