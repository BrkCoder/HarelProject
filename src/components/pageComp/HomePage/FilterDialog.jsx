import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { TextField, Typography, Slider } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectedWayToFilterColumn, confirmFilterWayToColumn } from '../../../actions/fetchAction.js';


import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function FilterDialog(props) {

    const whichFilter = () => {
        switch (props.columnName) {
            case 'lastName': case 'firstName': case 'phone':
                return <ContainsFilter {...props} inputType={props.columnName==='phone'?'number':'text'} />
            case 'id': return <IDFilter {...props} />
            case 'date': return <DateFilter {...props} />
        }
    }

    const okButtonClicked = () => {
        props.toggleFilterWindow();
        props.confirmFilterWayToColumn();
    }

    return (
        <Dialog
            open={props.openFilterWindow}
            onClose={props.toggleFilterWindow}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">איך תרצה לסנן את העמודה?</DialogTitle>
            <DialogContent>
                {whichFilter()}
            </DialogContent>
            <DialogActions>
                <Button onClick={okButtonClicked} color="primary">אישור</Button>
            </DialogActions>
        </Dialog>
    );
}


const ContainsFilter = ({ selectedWayToFilterColumn,inputType }) => {
    const [input,setInput]=useState('');
    
    const hundleInput=({target:{value}})=>{
        setInput(value);
        selectedWayToFilterColumn(value);
    }

    return(
    <TextField id="standard-basic"
        type={inputType}
        name='firstNameFilter'
        label='פילטר'
        onChange={hundleInput}
        value={input}/>
)}


const IDFilter = ({ selectedWayToFilterColumn }) => {
    const [sliders, setSliders] = useState({ moreThen: 0, lessThen: 100 })

    const setSliderVal = (sliderType) => selectedWayToFilterColumn(sliders)
    const onChangeSliders = (value, sliderType) => setSliders(prev => ({
        ...prev,
        [sliderType]: value
    }))

    return (
        <>
            <Typography id="discrete-slider" gutterBottom>יותר מ-</Typography>
            <Slider
                value={sliders.moreThen}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                name='moreThen'
                onChangeCommitted={() => setSliderVal('moreThen')}
                onChange={(event, val) => onChangeSliders(val, 'moreThen')}
                step={1}
                min={0}
                max={100}
            />

            <Typography id="discrete-slider" gutterBottom>פחות מ-</Typography>
            <Slider
                value={sliders.lessThen}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChangeCommitted={() => setSliderVal('lessThen')}
                onChange={(event, val) => onChangeSliders(val, 'lessThen')}
                step={1}
                min={0}
                max={100}
            />
        </>)
}


const DateFilter = ({ selectedWayToFilterColumn }) => {
    const [alignment, setAlignment] = useState('left');

    const handleAlignment = (event, newAlignment) => {
        selectedWayToFilterColumn(newAlignment)
        setAlignment(newAlignment);
    }
    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
            <ToggleButton value="day" aria-label="left aligned">היום</ToggleButton>
            <ToggleButton value="week" aria-label="centered">השבוע</ToggleButton>
            <ToggleButton value="month" aria-label="right aligned">החודש</ToggleButton>
            <ToggleButton value="year" aria-label="justified">השנה</ToggleButton>
            <ToggleButton value="overYear" aria-label="justified">מעל שנה</ToggleButton>
        </ToggleButtonGroup>
    );
}


const mapStateToProps = (state, ownProps) => state.fetched;

export default connect(mapStateToProps, { selectedWayToFilterColumn, confirmFilterWayToColumn })(FilterDialog);