import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap';
import '../styles/index.scss';
import Login from './login';
import Register from './register';
import Home from './home';
import Dashboard from './dashboard';
import ResetPassword from './resetPassword';
import Center from './center';
import NotFound from './notFound';
import Notification from './flashNotification';
import history from '../actions/history';

const App = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/centers" component={Center} />
        <Route exact path="/reset/:token" component={ResetPassword} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
      <Route component={Notification} />
    </div>
  </Router>
);

export default App;
