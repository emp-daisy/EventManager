import { combineReducers } from 'redux';
import authentication from './authReducers';
import centers from './centerReducers';
import events from './eventReducers';

const rootReducer = combineReducers({
  user: authentication,
  center: centers,
  event: events
});

export default rootReducer;
