import React from 'react';
import './style.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../../customRoutes/PrivateRoute.jsx';
import MuiDirection from '../MuiDirection.jsx';
import { connect } from 'react-redux';

//page components
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import EditPage from '../../pages/EditPage';
import NoMatchPage from '../../pages/NoMatchPage';

const App = () => {
  return (
    <MuiDirection dir="rtl">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: localStorage.getItem('token') ? '/home' : '/login',
                  state: {
                    from: location,
                  },
                }}
              />
            )}
          />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/edit/:userId" component={EditPage} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    </MuiDirection>
  );
};

App.propTypes = {};

export default connect((state) => state)(App);
