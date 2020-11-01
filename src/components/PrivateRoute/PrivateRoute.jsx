import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from "react-router-dom";

import {
    LoginPage,
    HomePage,
    EditPage
  } from '../index.js';


const PrivateRoute = ({ component:Component, loggedIn, ...rest }) => {

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn ? (
                <Component/>
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: location,
                                    unauthorized: true
                                }
                            }}
                        />
                    )}

        />
    );
}


const mapStateToProps = (state) =>{ 
    console.log("mapStateToProps -> state", state)
    return state.auth;
}


export default connect(mapStateToProps)(PrivateRoute)


