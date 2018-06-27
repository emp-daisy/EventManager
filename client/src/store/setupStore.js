import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

export const API_URL = '/v1/';

export const { CLOUDINARY_PRESET, CLOUDINARY_API } = process.env;

const loggerMiddleware = createLogger();

const Store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default Store;
