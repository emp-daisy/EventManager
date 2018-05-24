import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

export const API_URL = '/v1/';
export const CLOUDINARY_API_URL = 'CLOUDINARY_API_URL';
export const CLOUDINARY_PRESET = 'CLOUDINARY_PRESET';


const loggerMiddleware = createLogger();

const Store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default Store;
