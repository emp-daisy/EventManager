import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap';
import '../styles/index.scss';
import ConnectedLogin from './login';
import Register from './register';
import Home from './home';
import ConnectedDashboard from './dashboard';
import ResetPassword from './resetPassword';
import Center from './center';
import ViewCenter from './centerDetails';
import NotFound from './notFound';
import Notification from './flashNotification';
import history from '../actions/history';

const App = () => (
  <Router history={history}>
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={ConnectedLogin} />
        <Route exact path="/centers" component={Center} />
        <Route exact path="/center/description/:id" component={ViewCenter} />
        <Route exact path="/reset/:token" component={ResetPassword} />
        <Route exact path="/dashboard" component={ConnectedDashboard} />
        <Route component={NotFound} />
      </Switch>
      <Route component={Notification} />
    </div>
  </Router>
);

export default App;
