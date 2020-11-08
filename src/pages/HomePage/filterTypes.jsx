import React, { useState, useEffect } from 'react';
import { TextField, Typography, Slider } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PropTypes from 'prop-types';

export const ContainsFilter = ({ selectedWayToFilterColumn }) => {
  //useStates
  const [input, setInput] = useState('');
  //funcs
  const hundleInput = ({ target: { value } }) => {
    setInput(value);
    selectedWayToFilterColumn(value);
  };

  return (
    <TextField
      id="standard-basic"
      type="text"
      name="firstNameFilter"
      label="פילטר"
      onChange={hundleInput}
      value={input}
    />
  );
};

export const IDFilter = (props) => {
  //useStates
  const [sliders, setSliders] = useState({ moreThen: 0, lessThen: 100 });

  //funcs
  const setSliderVal = () => props.selectedWayToFilterColumn(sliders);
  const onChangeSliders = (value, sliderType) =>
    setSliders((prev) => ({
      ...prev,
      [sliderType]: value,
    }));

  //useEffects
  useEffect(
    () => () => {
      if (props.actionOnColumn && !props.actionOnColumn.filterWay)
        props.selectedWayToFilterColumn(sliders);
    },
    [],
  );

  return (
    <>
      <Typography id="discrete-slider" gutterBottom>
        יותר מ-
      </Typography>
      <Slider
        value={sliders.moreThen}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        name="moreThen"
        onChangeCommitted={setSliderVal}
        onChange={(event, val) => onChangeSliders(val, 'moreThen')}
        step={1}
        min={0}
        max={100}
      />

      <Typography id="discrete-slider" gutterBottom>
        פחות מ-
      </Typography>
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
    </>
  );
};

export const DateFilter = ({ selectedWayToFilterColumn }) => {
  //useStates
  const [alignment, setAlignment] = useState('left');
  //funcs
  const handleAlignment = (event, newAlignment) => {
    selectedWayToFilterColumn(newAlignment);
    setAlignment(newAlignment);
  };
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="day" aria-label="left aligned">
        היום
      </ToggleButton>
      <ToggleButton value="week" aria-label="centered">
        השבוע
      </ToggleButton>
      <ToggleButton value="month" aria-label="right aligned">
        החודש
      </ToggleButton>
      <ToggleButton value="year" aria-label="justified">
        השנה
      </ToggleButton>
      <ToggleButton value="overYear" aria-label="justified">
        מעל שנה
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

ContainsFilter.propTypes = {
  selectedWayToFilterColumn: PropTypes.func.isRequired,
};

IDFilter.propTypes = {
  selectedWayToFilterColumn: PropTypes.func.isRequired,
  actionOnColumn: PropTypes.object.isRequired,
};

DateFilter.propTypes = {
  selectedWayToFilterColumn: PropTypes.func.isRequired,
};
