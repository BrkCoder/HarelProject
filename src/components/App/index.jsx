import React from 'react';
import './style.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../../customRoutes/PrivateRoute.jsx';
import HomeRoute from '../../customRoutes/HomeRoute.jsx';
import MuiDirection from '../MuiDirection.jsx';

import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import EditPage from '../../pages/EditPage';
import NoMatchPage from '../../pages/NoMatchPage';

export default function AppContant() {
  return (
    <MuiDirection dir="rtl">
      <Router>
        <Switch>
          <HomeRoute to="/login" />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/edit/:userId" component={EditPage} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    </MuiDirection>
  );
}
