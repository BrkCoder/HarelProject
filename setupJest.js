import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

window.localStorage = localStorageMock;
window.fetch = fetchMock;
