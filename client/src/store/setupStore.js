import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers/rootReducer';

export const API_URL = "http://localhost:3088/v1/users";

const loggerMiddleware = createLogger()

const Store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

Store.subscribe(() => {
  console.log('STORE SUB...', Store.getState());
});

export default Store;
