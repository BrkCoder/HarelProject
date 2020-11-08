import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as hpAction from '../homePageAction.js';
import * as types from '../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {};

const actionType = types.UPDATE_STATE;

describe('homePage', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  describe('fetchClients action creator', () => {
    it('fetchClients should return clients array', async () => {
      const expectedPayload = {
        type,
        updatedState: { loggedIn: true },
      };

      const dispatch = await hpAction.fetchClients();
      await store.dispatch(dispatch);
      const actions = store.getActions();

      expect(actions).toEqual([expectedPayload]);
    });
  });
});
