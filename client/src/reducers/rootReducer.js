import {combineReducers} from 'redux';
import authentication from './authReducers';
import centers from './centerReducers';

const rootReducer = combineReducers({user: authentication, center: centers});

export default rootReducer;
