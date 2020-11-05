import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function HomeRoute({ to }) {
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
}
HomeRoute.propTypes = {
  to: PropTypes.string.isRequired,
};

export default HomeRoute;
