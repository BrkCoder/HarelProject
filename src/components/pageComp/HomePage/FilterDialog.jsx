import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectedWayToFilterColumn, confirmFilterWayToColumn,clearFilterOnFetchedData } from '../../../actions/fetchAction.js';
import { 
    TextField, Typography, Slider,
    //dialog
    Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
    import {ToggleButton,ToggleButtonGroup} from '@material-ui/lab';

    
function FilterDialog(props) {
    const OK_BTN = 'OK_BTN', CANCEL_BTN = 'CANCEL_BTN';

    const whichFilter = () => {
        switch (props.columnName) {
            case 'lastName': case 'firstName': case 'phone':
                return <ContainsFilter {...props} inputType={props.columnName === 'phone' ? 'number' : 'text'} />
            case 'id': return <IDFilter {...props} />
            case 'date': return <DateFilter {...props} />
        }
    }

    const handleBtns = (type) => {
        props.toggleFilterWindow();

        if (type === OK_BTN) props.confirmFilterWayToColumn();
        else if (type === CANCEL_BTN) props.clearFilterOnFetchedData();
    }

    return (
        <Dialog
            open={props.openFilterWindow}
            onClose={() => handleBtns(CANCEL_BTN)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">איך תרצה לסנן את העמודה?</DialogTitle>
            <DialogContent>
                {whichFilter()}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleBtns(OK_BTN)} color="primary" autoFocus>אישור</Button>
                <Button onClick={() => handleBtns(CANCEL_BTN)} color="primary">ביטול</Button>
            </DialogActions>
        </Dialog>
    );
}


const ContainsFilter = ({ selectedWayToFilterColumn, inputType }) => {
    const [input, setInput] = useState('');

    const hundleInput = ({ target: { value } }) => {
        setInput(value);
        selectedWayToFilterColumn(value);
    }

    return (
        <TextField id="standard-basic"
            type={inputType}
            name='firstNameFilter'
            label='פילטר'
            onChange={hundleInput}
            value={input} />
    )
}


const IDFilter = (props) => {
    const [sliders, setSliders] = useState({ moreThen: 0, lessThen: 100 })

    const setSliderVal = () => props.selectedWayToFilterColumn(sliders)
    const onChangeSliders = (value, sliderType) => setSliders(prev => ({
        ...prev,
        [sliderType]: value
    }))

    useEffect(() => () => {
        if (props.fetch&&!props.fetch.filterWay) props.selectedWayToFilterColumn(sliders);
    }, [])

    return (
        <>
            <Typography id="discrete-slider" gutterBottom>יותר מ-</Typography>
            <Slider
                value={sliders.moreThen}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                name='moreThen'
                onChangeCommitted={setSliderVal}
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
                onChangeCommitted={setSliderVal}
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

export default connect(mapStateToProps, { selectedWayToFilterColumn, confirmFilterWayToColumn,clearFilterOnFetchedData })(FilterDialog);