import customFetch from '../functions/customFetch.js';
import * as types from './actionTypes.js';
import produce from 'immer';
import * as filterFn from '../functions/filterFunctions.js';

export const fetchClients = () => async (dispatch, getState) => {
  //fetch customers-fc
  const [fcRes, fcErr] = await customFetch('/users');

  const updatedState = produce(getState(), (draft) => {
    if (fcErr) draft.fetchClientsErr = fcErr;
    else {
      delete draft.fetchClientsErr;
      Object.assign(draft, { clients: fcRes, filteredClients: fcRes });
    }
  });

  dispatch({
    type: types.UPDATE_STATE,
    updatedState,
  });
};

export const updateActionTypeOnColumn = ({ columnName, action }) => (dispatch, getState) => {
  const currState = getState();
  const { clients = [] } = currState;

  const updatedState = produce(currState, (draft) => {
    draft.actionOnColumn = { columnName, action, complete: false };

    if (action === 'sort') {
      draft.actionOnColumn.complete = true;
      draft.filteredClients = [...clients].sort((a, b) => {
        if (a[columnName] < b[columnName]) return -1;
        if (a[columnName] > b[columnName]) return 1;
        return 0;
      });
    }
  });
  dispatch({
    type: types.UPDATE_STATE,
    updatedState,
  });
};

export const clearActionOnColumn = () => (dispatch, getState) => {
  const updatedState = produce(getState(), (draft) => {
    draft.actionOnColumn = {};
    draft.filteredClients = draft.clients;
  });
  dispatch({
    type: types.UPDATE_STATE,
    updatedState,
  });
};

export const selectedWayToFilterColumn = (filterWay) => (dispatch, getState) => {
  if (filterWay === '') {
    dispatch(clearActionOnColumn());
    return;
  }
  const updatedState = produce(getState(), (draft) => {
    draft.actionOnColumn.filterWay = filterWay;
  });
  dispatch({
    type: types.UPDATE_STATE,
    updatedState,
  });
};

export const confirmFilterWayToColumn = () => (dispatch, getState) => {
  const currState = getState();
  const { columnName, filterWay } = currState.actionOnColumn;
  const { clients } = currState;
  const isActionOnColumnExist = Object.keys(currState.actionOnColumn).length;

  let updatedState = {};

  if (!isActionOnColumnExist) {
    updatedState = currState;
  } else {
    updatedState = produce(currState, (draft) => {
      const newFilteredClients = (() => {
        switch (columnName) {
          case 'lastName':
          case 'firstName':
          case 'phone':
            return filterFn.globalFilter(clients, filterWay, columnName);
          case 'all':
            return filterFn.globalFilter(clients, filterWay);
          case 'date':
            return filterFn.dateFilter(clients, filterWay);
          case 'id':
            return filterFn.idFilter(clients, filterWay);
          default:
            return clients;
        }
      })();

      draft.filteredClients = newFilteredClients;
      draft.actionOnColumn.complete = true;
    });
  }

  dispatch({
    type: types.UPDATE_STATE,
    updatedState,
  });
};
