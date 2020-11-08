import customFetch from '../functions/customFetch';
import * as types from './actionTypes.js';
import produce from 'immer';

export const fetchSingleUser = (userId) => async (dispatch, getState) => {
  let updatedState;
  const currState = getState();
  if (currState.singleUserInfo && currState.singleUserInfo.id === userId) return;
  if (userId === 'undefined') {
    updatedState = produce(currState, (draft) => {
      draft.fetchSingleClientErr = 'no user id was specify';
    });
  } else {
    //fetch client-fc
    const [fcRes, fcErr] = await customFetch(`/users/${userId}`);

    updatedState = produce(currState, (draft) => {
      if (fcErr) draft.fetchSingleClientErr = fcErr;
      else {
        delete draft.fetchSingleClientErr;
        fcRes.date = formatDate(fcRes.date);
        draft.singleUserInfo = fcRes;
      }
    });
  }

  dispatch({
    type: types.UPDATE_STATE,
    updatedState,
  });
};

export const saveModifiedUser = (modifiedUser) => async (dispatch, getState) => {
  //modify client-fc
  const currState = getState();
  const { clients, singleUserInfo } = currState;
  const foundIndex = clients.findIndex((x) => x.id === singleUserInfo.id);
  const updateInClients = {
    id: singleUserInfo.id,
    firstName: singleUserInfo.firstName,
    lastName: singleUserInfo.lastName,
    phone: singleUserInfo.phone,
    date: singleUserInfo.date,
  };

  // eslint-disable-next-line no-unused-vars
  const [mcRes, mcErr] = await customFetch(`/users/${currState.singleUserInfo.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(modifiedUser),
  });

  const updatedState = produce(currState, (draft) => {
    if (mcErr) draft.saveModifiedUserErr = mcErr;
    else {
      draft.saveModifiedUserSuccess = true;
      draft.clients[foundIndex] = updateInClients;
      draft.filteredClients[foundIndex] = updateInClients;
    }
  });

  dispatch({
    type: types.UPDATE_STATE,
    updatedState,
  });
};

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
