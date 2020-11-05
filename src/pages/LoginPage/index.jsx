import React from 'react';
import './style.scss';
import { useLocation, Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction.js';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { inputErrStr, emailReg } from '../../constants.js';

const LoginPage = (props) => {
  if (props.loggedIn || (localStorage.getItem('token') && !props.loginErr))
    return <Redirect to="/home" />;
  else return <LoginPageContent {...props} />;
};

const LoginPageContent = (props) => {
  const location = useLocation();
  const { unauthorized } = location.state || null;
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => props.login(data);

  return (
    <div className="login-page page">
      <div className="login-container">
        <div className="headers">
          <h1>ברוכים הבאים לעמוד הכניסה!</h1>
          <h3>אנא הזדהו</h3>
        </div>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            inputRef={register({ required: true })}
            label="שם פרטי"
            type="text"
            name="firstName"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName && inputErrStr[errors.firstName.type]}
          />

          <TextField
            inputRef={register({ required: true })}
            label="שם משפחה"
            type="text"
            name="lastName"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName && inputErrStr[errors.lastName.type]}
          />

          <TextField
            inputRef={register({
              required: true,
              pattern: emailReg,
            })}
            label="אימייל"
            name="email"
            error={Boolean(errors.email)}
            helperText={errors.email && inputErrStr[errors.email.type]}
          />

          <TextField
            inputRef={register({ required: true })}
            label="סיסמא"
            type="password"
            name="password"
            error={Boolean(errors.password)}
            helperText={errors.password && inputErrStr[errors.password.type]}
          />

          <Button type="submit" variant="contained" color="primary">
            התחבר
          </Button>
        </form>

        {unauthorized && <p className="unauthorized">אנא התחברו, אין לכם גישה לעמוד הבית</p>}
      </div>
    </div>
  );
};

LoginPageContent.propTypes = {
  login: PropTypes.func.isRequired,
};

LoginPage.propTypes = {
  loggedIn: PropTypes.bool,
  login: PropTypes.func.isRequired,
};

export default connect((state) => state.loginPage, { login })(LoginPage);
