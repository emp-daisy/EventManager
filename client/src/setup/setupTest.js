// setup enzymne file
import { configure } from 'enzyme';
import dotenv from 'dotenv';
import Adapter from 'enzyme-adapter-react-16';
import * as Fetch from 'jest-fetch-mock';
import history from '../actions/history';

configure({
  adapter: new Adapter()
});
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

history.push = jest.fn();
history.replace = jest.fn();

dotenv.config(); // add env file

global.localStorage = localStorageMock;
global.fetch = Fetch;
