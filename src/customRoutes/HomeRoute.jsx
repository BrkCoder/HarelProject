import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomeRoute = ({ to }) => {
  return (
    <Route
      exact
      path="/"
      render={({ location }) => (
        <Redirect
          to={{
            pathname: to,
            state: {
              from: location,
            },
          }}
        />
      )}
    />
  );
};

HomeRoute.PropTypes = {
  to: PropTypes.string,
};

export default HomeRoute;
