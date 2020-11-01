import React from 'react';
import './EditPage.scss';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';


function EditPage() {
    return (
        <div className='edit-page page'>
            <h1>פרטים:</h1>
            <div className='edit-inputs'>
                <TextField id="standard-basic" label="Standard" />
                <TextField id="standard-basic" label="Standard" />
                <TextField id="standard-basic" label="Standard" />
                <TextField id="standard-basic" label="Standard" />
                <TextField id="standard-basic" label="Standard" />

            </div>
        </div>
    );
}


export default connect()(EditPage);