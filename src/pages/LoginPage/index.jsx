import React from 'react';
import './style.scss';
import { useLocation, Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction.js';
import { useForm } from 'react-hook-form';

const errorStr = {
  required: 'שדה חובה',
  pattern: 'אנא כתוב כתובת אימייל תקפה',
};

const LoginPage = (props) => {
  if (props.loggedIn) return <Redirect to="/home" />;
  else return <LoginPageContent {...props} />;
};

function LoginPageContent(props) {
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
            id="standard-basic"
            label="שם פרטי"
            type="text"
            name="firstName"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName && errorStr[errors.firstName.type]}
          />

          <TextField
            inputRef={register({ required: true })}
            id="standard-basic"
            label="שם משפחה"
            type="text"
            name="lastName"
            helperText="Incorrect entry."
            error={Boolean(errors.lastName)}
            helperText={errors.lastName && errorStr[errors.lastName.type]}
          />

          <TextField
            inputRef={register({
              required: true,
              pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g,
            })}
            id="standard-basic"
            label="אימייל"
            name="email"
            error={Boolean(errors.email)}
            helperText={errors.email && errorStr[errors.email.type]}
          />

          <TextField
            inputRef={register({ required: true })}
            id="standard-basic"
            label="סיסמא"
            type="password"
            name="password"
            error={Boolean(errors.password)}
            helperText={errors.password && errorStr[errors.password.type]}
          />

          <Button type="submit" variant="contained" color="primary">
            התחבר
          </Button>
        </form>

        {unauthorized && <p className="unauthorized">אנא התחברו, אין לכם גישה לעמוד הבית</p>}
      </div>
    </div>
  );
}

export default connect((state) => state, { login })(LoginPage);
