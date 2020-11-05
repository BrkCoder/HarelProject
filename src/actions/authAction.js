import customFetch from '../functions/customFetch.js';
import * as types from './actionTypes.js';
import produce from 'immer';

export const login = (userInfo) => async (dispatch, getState) => {
  const [loginRes, loginErr] = await customFetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  });

  const updatedState = produce(getState().loginPage, (draft) => {
    if (loginErr) {
      draft.loginErr = loginErr;
      draft.loggedIn = false;
    } else {
      delete draft.loginErr;
      Object.assign(draft, {
        ...loginRes,
        user: { firstName: userInfo.firstName, lastName: userInfo.lastName },
        loggedIn: true,
      });
    }
  });

  dispatch({
    type: types.UPDATE_STATE_LOGINPAGE,
    updatedState,
  });
};
