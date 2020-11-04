import { customFetch } from '../functions';
import * as types from './actionTypes.js';

export const login = (userInfo) => async (dispatch, getState) => {
  const [loginRes, loginErr] = await customFetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  });

  if (loginErr)
    dispatch({
      type: types.ADD_TO_STATE,
      payload: { error: loginErr, isLoggedIn: false },
    });
  else {
    localStorage.setItem('token', loginRes);
    dispatch({
      type: types.ADD_TO_STATE,
      payload: {
        token: loginRes,
        isLoggedIn: true,
      },
    });
  }
};
