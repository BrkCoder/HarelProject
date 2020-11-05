import customFetch from '../functions/customFetch';
import * as types from './actionTypes.js';
import produce from 'immer';

export const fetchClientAction = (path) => async (dispatch, getState) => {
  //fetch client-fc
  const [fcRes, fcErr] = await customFetch(path, payload);

  if (fcErr)
    dispatch({
      type: types.UPDATE_STATE_EDITPAGE,
      payload: { error: fcErr },
    });
  else
    dispatch({
      type: types.FETCH_CLIENT_SUCCESS,
      payload: { res: fcRes },
    });
};

export const fetchSingleUser = (userId) => async (dispatch, getState) => {
  //fetch client-fc
  const [fcRes, fcErr] = await customFetch(`/users/${userId}`);

  const updatedState = produce(getState().editPage, (draft) => {
    if (fcErr) draft.fetchSingleClientErr = fcErr;
    else {
      delete draft.fetchSingleClientErr;
      draft.singleUserInfo = fcRes;
    }
  });

  dispatch({
    type: types.UPDATE_STATE_EDITPAGE,
    updatedState,
  });
};
