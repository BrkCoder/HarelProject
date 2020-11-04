import * as types from '../actions/actionTypes.js';

const initSate = {
  payload: {},
};

const stateWithPayload = (state, payload) => ({
  ...state,
  ...payload,
});

const fetchReducer = (state = initSate, { type, payload }) => {
  switch (type) {
    case types.FETCH_CLIENT_SUCCESS:
    case types.FETCH_CLIENT_FAILED:
      return stateWithPayload(state, payload);
    default:
      return state;
  }
};

export default fetchReducer;
