import { combineReducers } from 'redux';
import authentication from './authReducers';
import centers from './centerReducers';
import events from './eventReducers'; import notify from './notifyReducer';

const rootReducer = combineReducers({
  user: authentication,
  center: centers,
  event: events,
  notify
});

export default rootReducer;
