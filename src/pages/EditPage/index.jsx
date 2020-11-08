import React, { useEffect } from 'react';
import './style.scss';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as editPageAction from '../../actions/editPageAction.js';
import { useParams } from 'react-router-dom';
import { inputErrStr, emailReg } from '../../constants.js';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

function EditPage(props) {
  const { userId } = useParams();

  //useEffects
  useEffect(() => {
    props.fetchSingleUser(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const display = () => {
    if (props.fetchSingleClientErr) return <p className="error">ישנה בעיה עם טעינת המידע</p>;
    else if (!props.singleUserInfo || _.isEmpty(props.singleUserInfo)) return <CircularProgress />;
    else return <EditPageForm {...props} />;
  };

  return (
    <div className="edit-page page">
      <div className="container">
        <h1>פרטים על הלקוח</h1>
        {display()}
      </div>
    </div>
  );
}

function EditPageForm(props) {
  //react hooks
  let history = useHistory();

  //useForm
  const { register, handleSubmit, errors, reset } = useForm({
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

  //useEffects
  useEffect(() => {
    reset(props.singleUserInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.singleUserInfo]);

  //funcs
  const goBackHome = () => history.go(-1);
  const onSubmit = (data) => {
    props.saveModifiedUser(data);
    goBackHome();
  };

  return (
    <form className="edit-inputs" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        type="text"
        label="שם החשבון"
        name="accountName"
        error={Boolean(errors.accountName)}
        helperText={errors.accountName && inputErrStr[errors.accountName.type]}
        inputRef={register({ required: true })}
      />

      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        type="number"
        label="מספר חשבון"
        name="account"
        error={Boolean(errors.account)}
        helperText={errors.account && inputErrStr[errors.account.type]}
        inputRef={register({ required: true })}
      />

      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        type="text"
        label="שם פרטי"
        name="firstName"
        error={Boolean(errors.firstName)}
        helperText={errors.firstName && inputErrStr[errors.firstName.type]}
        inputRef={register({ required: true })}
      />

      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        type="text"
        label="שם משפחה"
        name="lastName"
        error={Boolean(errors.lastName)}
        helperText={errors.lastName && inputErrStr[errors.lastName.type]}
        inputRef={register({ required: true })}
      />

      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="אימייל"
        name="email"
        error={Boolean(errors.email)}
        helperText={errors.email && inputErrStr[errors.email.type]}
        inputRef={register({ required: true, pattern: emailReg })}
      />

      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="מספר טלפון"
        name="phone"
        error={Boolean(errors.phone)}
        helperText={errors.phone && inputErrStr[errors.phone.type]}
        inputRef={register({ required: true })}
      />

      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="תאריך"
        name="date"
        type="date"
        error={Boolean(errors.date)}
        helperText={errors.date && inputErrStr[errors.date.type]}
        inputRef={register({ required: true })}
      />

      <div className="btn-container">
        <Button variant="contained" color="primary" onClick={goBackHome}>
          חזרה לדף הבית
        </Button>
        <Button variant="contained" color="primary" type="submit">
          שמירה
        </Button>
      </div>
    </form>
  );
}

EditPage.propTypes = {
  fetchSingleUser: PropTypes.func.isRequired,
  singleUserInfo: PropTypes.object,
  fetchSingleClientErr: PropTypes.string,
  saveModifiedUser: PropTypes.func.isRequired,
};

EditPageForm.propTypes = {
  singleUserInfo: PropTypes.object,
  fetchSingleClientErr: PropTypes.string,
  saveModifiedUser: PropTypes.func.isRequired,
};

export default connect((state) => state, editPageAction)(EditPage);
