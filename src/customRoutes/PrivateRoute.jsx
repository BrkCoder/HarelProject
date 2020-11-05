import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      // {...rest}
      render={({ location }) =>
        loggedIn || localStorage.getItem('token') ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location,
                unauthorized: true,
              },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  loggedIn: PropTypes.bool,
};

export default connect((state) => state.loginPage)(PrivateRoute);
