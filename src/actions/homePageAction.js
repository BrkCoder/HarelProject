import customFetch from '../functions/customFetch.js';
import * as types from './actionTypes.js';
import produce from 'immer';
import * as filterFn from '../functions/filterFunctions.js';

const fakeRes = [
  {
    id: 0,
    firstName: 'Lamar',
    lastName: 'Ferry',
    date: '2020-09-26T16:31:36.717Z',
    phone: '870-806-9173 x458',
  },
  {
    id: 1,
    firstName: 'Deshaun',
    lastName: 'Cummerata',
    date: '2020-10-31T05:13:26.788Z',
    phone: '692-317-7583 x68890',
  },
  {
    id: 2,
    firstName: 'Dayna',
    lastName: 'Kirlin',
    date: '2019-12-17T08:45:21.372Z',
    phone: '263-922-3151',
  },
  {
    id: 3,
    firstName: 'Reanna',
    lastName: 'Beer',
    date: '2020-06-07T15:56:45.139Z',
    phone: '451-867-4863',
  },
  {
    id: 4,
    firstName: 'Keshawn',
    lastName: 'Von',
    date: '2020-02-22T22:09:43.587Z',
    phone: '826-914-0848 x38159',
  },
  {
    id: 5,
    firstName: 'Carolina',
    lastName: 'Altenwerth',
    date: '2019-11-18T19:00:39.983Z',
    phone: '511.503.3207 x32159',
  },
  {
    id: 6,
    firstName: 'Tommie',
    lastName: 'Miller',
    date: '2020-04-25T13:02:13.160Z',
    phone: '(726) 496-7519 x7905',
  },
  {
    id: 7,
    firstName: 'Shanna',
    lastName: 'Hickle',
    date: '2020-07-15T19:26:46.497Z',
    phone: '465.761.9315 x27768',
  },
  {
    id: 8,
    firstName: 'Paula',
    lastName: 'Treutel',
    date: '2019-11-11T13:27:58.737Z',
    phone: '1-849-330-9008 x95808',
  },
  {
    id: 9,
    firstName: 'Lilla',
    lastName: 'Von',
    date: '2020-03-04T02:02:33.492Z',
    phone: '1-534-559-3548 x2595',
  },
  {
    id: 10,
    firstName: 'Cierra',
    lastName: 'Heathcote',
    date: '2020-06-01T11:50:37.724Z',
    phone: '(716) 654-2777 x055',
  },
];

////////////////////////////////////////////////////////////////////////////
export const fetchClients = () => async (dispatch, getState) => {
  //fetch customers-fc
  // const [fcRes, fcErr] = await customFetch('/users');
  const fcRes = fakeRes,
    fcErr = null;

  const updatedState = produce(getState().homePage, (draft) => {
    if (fcErr) draft.fetchClientsErr = fcErr;
    else {
      delete draft.fetchClientsErr;
      Object.assign(draft, { clients: fcRes, filteredClients: fcRes });
    }
  });

  dispatch({
    type: types.UPDATE_STATE_HOMEPAGE,
    updatedState,
  });
};

export const updateActionTypeOnColumn = ({ columnName, action }) => (dispatch, getState) => {
  const currState = getState().homePage;
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
    type: types.UPDATE_STATE_HOMEPAGE,
    updatedState,
  });
};

export const clearActionOnColumn = () => (dispatch, getState) => {
  const updatedState = produce(getState().homePage, (draft) => {
    draft.actionOnColumn = {};
    draft.filteredClients = draft.clients;
  });
  console.log('clearActionOnColumn -> updatedState', updatedState);
  dispatch({
    type: types.UPDATE_STATE_HOMEPAGE,
    updatedState,
  });
};

export const selectedWayToFilterColumn = (filterWay) => (dispatch, getState) => {
  if (filterWay === '') {
    console.log('insideeeeeeeeeeeeeeeee');
    dispatch(clearActionOnColumn());
    return;
  }
  console.log('not hereeee');
  const updatedState = produce(getState().homePage, (draft) => {
    draft.actionOnColumn.filterWay = filterWay;
  });
  dispatch({
    type: types.UPDATE_STATE_HOMEPAGE,
    updatedState,
  });
};

export const confirmFilterWayToColumn = () => (dispatch, getState) => {
  const currState = getState().homePage;
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
    type: types.UPDATE_STATE_HOMEPAGE,
    updatedState,
  });
};
