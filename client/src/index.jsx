import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store/setupStore';
import App from './components/app';
import { getToken } from './actions/authentication';

if (getToken()) {
  Store.dispatch({ type: 'LOGIN_USER_GRANTED' });
} else {
  Store.dispatch({ type: 'UNAUTHENTICATED_USER' });
}

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
