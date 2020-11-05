import { combineReducers } from 'redux';

import authReducer from './authReducer.js';
import fetchReducer from './fetchReducer.js';
import editClientReducer from './editClientReducer.js';

import * as types from '../actions/actionTypes.js';

const initSate = {
  loginPage: {},
  homePage: {},
  editPage: {},
};

const reducer = (state = initSate, { type, updatedState }) => {
  switch (type) {
    case types.UPDATE_STATE_LOGINPAGE:
      return { ...state, loginPage: updatedState };
    case types.UPDATE_STATE_HOMEPAGE:
      return { ...state, homePage: updatedState };
    case types.UPDATE_STATE_EDITPAGE:
      return { ...state, editPage: updatedState };
    default:
      return state;
  }
};

// export default combineReducers({
//   // auth: authReducer,
//   // fetched: fetchReducer,
//   // editClient: editClientReducer,
//   reducer,
// });

export default reducer;
