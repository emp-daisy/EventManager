import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/index.scss';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Events from './components/events';
import NotFound from './components/notFound';

ReactDOM.render(
  <Router>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/events" component={Events}/>
    <Route exact path="/dashboard" component={Dashboard}/>
    <Route component={NotFound}/>
  </Switch>
</Router>, document.getElementById('root'));
