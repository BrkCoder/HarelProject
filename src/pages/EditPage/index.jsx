import React, { useEffect, useState } from 'react';
import './style.scss';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import * as editPageAction from '../../actions/editPageAction.js';
import { useParams } from 'react-router-dom';
import { inputErrStr, emailReg } from '../../constants.js';
import PropTypes from 'prop-types';

function EditPage(props) {
  const { userId } = useParams();
  const [inputs, setInputs] = useState({
    account: 0,
    accountName: '',
    phone: 0,
    lastName: '',
    firstName: '',
    email: '',
  });

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      accountName: '',
      account: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    // name: "test", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  useEffect(() => {
    props.fetchSingleUser();
  }, []);

  //new Date(newInputs.date).toISOString().substr(0, 10)

  const onChangeInputs = ({ target: { value } }, inputName) =>
    setInputs((prev) => ({ ...prev, [inputName]: value }));

  const onSubmit = (data) => console.log(data);

  const goBackHome = () => props.history.go(-1);

  const saveBtn = () => {
    // props.fetchSingleUser(`/users/${userId}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(inputs),
    // });
    goBackHome();
  };

  return (
    <div className="edit-page page">
      <div className="container">
        <h1>פרטים על הלקוח</h1>
        <form className="edit-inputs" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="standard-basic"
            type="text"
            label="שם החשבון"
            name="accountName"
            error={errors.accountName}
            helperText={errors.accountName && inputErrStr[errors.accountName.type]}
            value={inputs.accountName || ''}
            onChange={(e) => onChangeInputs(e, 'accountName')}
            inputRef={register({ required: true })}
          />

          <TextField
            id="standard-basic"
            type="number"
            label="מספר חשבון"
            name="account"
            value={inputs.account || ''}
            error={errors.account}
            helperText={errors.account && inputErrStr[errors.account.type]}
            onChange={(e) => onChangeInputs(e, 'account')}
            inputRef={register({ required: true })}
          />

          <TextField
            id="standard-basic"
            type="text"
            label="שם פרטי"
            name="firstName"
            error={errors.firstName}
            helperText={errors.firstName && inputErrStr[errors.firstName.type]}
            value={inputs.firstName || ''}
            onChange={(e) => onChangeInputs(e, 'firstName')}
            inputRef={register({ required: true })}
          />

          <TextField
            id="standard-basic"
            type="text"
            label="שם משפחה"
            name="lastName"
            error={errors.lastName}
            helperText={errors.lastName && inputErrStr[errors.lastName.type]}
            value={inputs.lastName || ''}
            onChange={(e) => onChangeInputs(e, 'lastName')}
            inputRef={register({ required: true })}
          />

          <TextField
            id="standard-basic"
            label="אימייל"
            name="email"
            error={errors.email}
            helperText={errors.email && inputErrStr[errors.email.type]}
            value={inputs.email || ''}
            onChange={(e) => onChangeInputs(e, 'email')}
            inputRef={register({ required: true, pattern: emailReg })}
          />

          <TextField
            id="standard-basic"
            label="מספר טלפון"
            name="phone"
            error={errors.phone}
            helperText={errors.phone && inputErrStr[errors.phone.type]}
            value={inputs.phone || ''}
            onChange={(e) => onChangeInputs(e, 'phone')}
            inputRef={register({ required: true })}
          />

          <TextField
            id="standard-basic"
            label="תאריך"
            name="date"
            type="date"
            error={errors.date}
            helperText={errors.date && inputErrStr[errors.date.type]}
            value={inputs.date || ''}
            onChange={(e) => onChangeInputs(e, 'date')}
            inputRef={register({ required: true })}
          />

          <div className="btn-container">
            <Button variant="contained" color="primary" onClick={goBackHome}>
              חזרה לדף הבית
            </Button>
            <Button variant="contained" color="primary" type="submit" onClick={saveBtn}>
              שמירה
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditPage.propTypes = {
  fetchSingleUser: PropTypes.func.isRequired,
  editClient: PropTypes.object,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect((state) => state.editPage, editPageAction)(EditPage);
