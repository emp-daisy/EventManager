import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

export const API_URL = '/v1/';

export const { CLOUDINARY_PRESET } = process.env;
export const CLOUDINARY_API_URL = process.env.CLOUDINARY_API;

const loggerMiddleware = createLogger();

const Store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default Store;
