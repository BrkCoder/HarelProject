import customFetch from '../functions/customFetch.js';
import * as types from './actionTypes.js';
import produce from 'immer';
import _ from 'lodash';

export const login = (userInfo) => async (dispatch, getState) => {
  let updatedState;
  const currState = getState();

  if (_.isEmpty(userInfo) || !userInfo) {
    updatedState = produce(currState, (draft) => {
      draft.loginErr = 'you didnt send user info';
      draft.loggedIn = false;
    });
  } else {
    const [loginRes, loginErr] = await customFetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ' *' },
      body: JSON.stringify(userInfo),
    });
    if (!loginErr) localStorage.setItem('token', JSON.stringify(loginRes.token));

    updatedState = produce(currState, (draft) => {
      if (loginErr) {
        draft.loginErr = loginErr;
        draft.loggedIn = false;
      } else {
        if (draft.loginErr) delete draft.loginErr;
        draft.loggedIn = true;
      }
    });
  }

  dispatch({
    type: types.UPDATE_STATE,
    updatedState,
  });
};
