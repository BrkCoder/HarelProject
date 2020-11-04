import { combineReducers } from 'redux';

import authReducer from './authReducer.js';
import fetchReducer from './fetchReducer.js';
import editClientReducer from './editClientReducer.js';

import * as types from '../actions/actionTypes.js';

const initSate = {};

const reducer = (state = initSate, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_STATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  fetched: fetchReducer,
  editClient: editClientReducer,
  reducer,
});
