import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';

import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
const mockStore = configureStore([thunkMiddleware]);

import App from '../index';
import { Provider } from 'react-redux';

let component = (
  <Provider store={store}>
    <App />
  </Provider>
);

afterEach(cleanup);

test('renders learn react link', () => {
  render(component);
  expect(1 + 1).toBe(2);
});
