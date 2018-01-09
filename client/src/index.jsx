import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './store/setupStore';
import './styles/index.scss';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Events from './components/events';
import NotFound from './components/notFound';
import { history } from './actions/history';
import { getToken } from './actions/authentication';

if (getToken()) {
  Store.dispatch({ type: 'LOGIN_USER_GRANTED' });
} else {
  Store.dispatch({ type: 'UNAUTHENTICATED_USER' });
}

ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
