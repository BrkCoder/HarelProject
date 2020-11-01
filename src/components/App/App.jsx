import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

import { create } from "jss";
import rtl from "jss-rtl";

import {
  LoginPage,
  HomePage,
  EditPage,
  PrivateRoute,
  MuiDirection
} from '../index.js';



const rtlTheme = createMuiTheme({ direction: "rtl" });
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'
          render={({ location }) =>
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: location
                }
              }} />

          } />

        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/home" component={HomePage} />
        <PrivateRoute path="/edit/:userId" component={EditPage} />
        <PrivateRoute component={NoMatch} />
      </Switch>
    </Router>
  );
}


const NoMatch=()=><div>הגעת לעמוד לא קיים. אנא שנה את הURL</div>


export default () =>
  <MuiDirection dir='rtl'>
    <App />
  </MuiDirection>


