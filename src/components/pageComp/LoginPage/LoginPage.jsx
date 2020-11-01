import React, { Children, useState } from 'react';
import './LoginPage.scss';
import { useLocation, Redirect } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../../../actions/authAction';
import { useForm } from "react-hook-form";



const errorStr = {
    required: 'שדה חובה',
    pattern: 'אנא כתוב כתובת אימייל תקפה'
}
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const LoginPageWithRedirect = (props) => {
    if (props.loggedIn) return <Redirect to='/home' />
    else return <LoginPage {...props} />
}


function LoginPage(props) {

    const location = useLocation();
    const { unauthorized } = location.state || null;

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => props.login(data);


    return (
        <div className='login-page page'>
            <div className='login-container'>
                <div className='headers'>
                <h1>ברוכים הבאים לעמוד הכניסה!</h1>
                <h3>אנא הזדהו</h3>
                </div>
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        inputRef={register({ required: true })}
                        id="standard-basic"
                        label='שם פרטי'
                        type="text"
                        name='firstName'
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName && errorStr[errors.firstName.type]}
                    />

                    <TextField
                        inputRef={register({ required: true })}
                        id="standard-basic"
                        label='שם משפחה'
                        type="text"
                        name='lastName'
                        helperText="Incorrect entry."
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName && errorStr[errors.lastName.type]}
                    />

                    <TextField
                        inputRef={register({ required: true, pattern: emailReg })}
                        id="standard-basic"
                        label='אימייל'
                        name='email'
                        error={Boolean(errors.email)}
                        helperText={errors.email && errorStr[errors.email.type]}
                    />

                    <TextField
                        inputRef={register({ required: true })}
                        id="standard-basic"
                        label='סיסמא'
                        type='password'
                        name='password'
                        error={Boolean(errors.password)}
                        helperText={errors.password && errorStr[errors.password.type]}
                    />

                    <Button type='submit' variant="contained" color="primary">התחבר</Button>
                </form>

                {unauthorized &&
                    <p className='unauthorized'>אנא התחברו, אין לכם גישה לעמוד הבית</p>
                }

            </div>

        </div>
    );
}




const mapStateToProps = (state, ownProps) => state.auth;

export default connect(mapStateToProps, { login })(LoginPageWithRedirect);