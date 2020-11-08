import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as loginAction from '../loginAction.js';
import * as types from '../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {};

const type = types.UPDATE_STATE;

const errors = {
  argErr: { loginErr: 'you didnt send user info', loggedIn: false },
};

const userInfo = {
  firstName: 'david',
  lastName: 'Lala',
  email: 'david@gm.co',
  password: '12345',
};

describe('test login func', () => {
  let store;
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore(initialState);
  });

  it('sending empty obj should dispatch err', () => {
    const expectedPayload = {
      type,
      updatedState: errors.argErr,
    };
    store.dispatch(loginAction.login({}));
    const actions = store.getActions();

    expect(actions).toEqual([expectedPayload]);
  });

  it('not sending userInfo should dispatch err', () => {
    const expectedPayload = {
      type,
      updatedState: errors.argErr,
    };
    store.dispatch(loginAction.login());
    const actions = store.getActions();

    expect(actions).toEqual([expectedPayload]);
  });

  it('sending userInfo should dispatch loggedIn=true', async () => {
    const expectedPayload = {
      type,
      updatedState: { loggedIn: true },
    };

    const dispatch = await loginAction.login(userInfo);
    await store.dispatch(dispatch);
    const actions = store.getActions();

    expect(actions).toEqual([expectedPayload]);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
  });
});
