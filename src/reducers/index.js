import * as types from '../actions/actionTypes.js';

const initialState = {
  auth: {},
};

const reducer = (state = {}, { type, updatedState = {} }) => {
  switch (type) {
    case types.UPDATE_STATE:
      return updatedState;
    default:
      return state;
  }
};

export default reducer;
