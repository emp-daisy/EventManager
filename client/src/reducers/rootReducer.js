import {combineReducers} from 'redux';
import authentication from './authReducers';

const rootReducer = combineReducers({user: authentication});

export default rootReducer;
