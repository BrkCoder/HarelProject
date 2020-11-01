import React, { useEffect, useState } from 'react';
import './EditPage.scss';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import * as editClientAction from '../../../actions/editUserAction';
import { useParams, useHistory } from "react-router-dom";

const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const errorStr = {
    required: 'שדה חובה',
    pattern: 'אנא כתוב כתובת אימייל תקפה'
}

function EditPage(props) {
    const history = useHistory();
    const { userId } = useParams();
    const [inputs, setInputs] = useState({
        account: 0,
        accountName: '',
        phone: 0,
        lastName: '',
        firstName: '',
        email: ''
    })

    useEffect(() => {
        props.fetchClientAction(`/users/${userId}`);
    }, [])

    useEffect(() => {
        if (props.editClient.res) {
            const newInputs = { ...props.editClient.res };

            if (newInputs.date) {
                newInputs.date = new Date(newInputs.date).toISOString().substr(0, 10);
            }

            setInputs(newInputs);
        }
    }, [props.editClient.res]);

    const onChangeInputs = ({ target: { value } }, inputName) => setInputs(prev => ({ ...prev, [inputName]: value }))

    const { register, handleSubmit, errors } = useForm()

    const onSubmit = (data) => console.log(data);


    const goBackHome = () => history.go(-1);

    const saveBtn = () => {
        props.fetchClientAction(`/users/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
        });
        goBackHome();
    }

    return (
        <div className='edit-page page'>
            <div className='container'>
                <h1>פרטים על הלקוח</h1>
                <form className='edit-inputs' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        id="standard-basic"
                        type='text'
                        label="שם החשבון"
                        name='accountName'
                        error={errors.accountName}
                        helperText={errors.accountName && errorStr[errors.accountName.type]}
                        value={inputs.accountName||''}
                        onChange={(e) => onChangeInputs(e, 'accountName')}
                        inputRef={register({ required: true })} />

                    <TextField
                        id="standard-basic"
                        type='number'
                        label="מספר חשבון"
                        name='account'
                        value={inputs.account||''}
                        error={errors.account}
                        helperText={errors.account && errorStr[errors.account.type]}
                        onChange={(e) => onChangeInputs(e, 'account')}
                        inputRef={register({ required: true })} />

                    <TextField
                        id="standard-basic"
                        type='text'
                        label="שם פרטי"
                        name='firstName'
                        error={errors.firstName}
                        helperText={errors.firstName && errorStr[errors.firstName.type]}
                        value={inputs.firstName||''}
                        onChange={(e) => onChangeInputs(e, 'firstName')}
                        inputRef={register({ required: true })} />

                    <TextField
                        id="standard-basic"
                        type='text'
                        label="שם משפחה"
                        name='lastName'
                        error={errors.lastName}
                        helperText={errors.lastName && errorStr[errors.lastName.type]}
                        value={inputs.lastName||''}
                        onChange={(e) => onChangeInputs(e, 'lastName')}
                        inputRef={register({ required: true })} />

                    <TextField
                        id="standard-basic"
                        label="אימייל"
                        name='email'
                        error={errors.email}
                        helperText={errors.email && errorStr[errors.email.type]}
                        value={inputs.email||''}
                        onChange={(e) => onChangeInputs(e, 'email')}
                        inputRef={register({ required: true, pattern: emailReg })} />

                    <TextField
                        id="standard-basic"
                        label="מספר טלפון"
                        name='phone'
                        error={errors.phone}
                        helperText={errors.phone && errorStr[errors.phone.type]}
                        value={inputs.phone||''}
                        onChange={(e) => onChangeInputs(e, 'phone')}
                        inputRef={register({ required: true })} />


                    <TextField
                        id="standard-basic"
                        label="תאריך"
                        name='date'
                        type='date'
                        error={errors.date}
                        helperText={errors.date && errorStr[errors.date.type]}
                        value={inputs.date||''}
                        onChange={(e) => onChangeInputs(e, 'date')}
                        inputRef={register({ required: true })} />


                    <div className='btn-container'>
                        <Button variant="contained" color="primary" onClick={goBackHome}>חזרה לדף הבית</Button>
                        <Button variant="contained" color="primary" type='submit' onClick={saveBtn}>שמירה</Button>
                    </div>

                </form>
            </div>
        </div>
    );
}


const mapStateToProps = (state, ownProps) => state;

export default connect(mapStateToProps, editClientAction)(EditPage);