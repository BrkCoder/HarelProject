import React, { useState, useEffect } from 'react';
import './style.scss';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as homePageAction from '../../actions/homePageAction.js';
import FilterDialog from './FilterDialog.jsx';
import PropTypes from 'prop-types';
import ClientsTable from './ClientsTable.jsx';

function HomePage(props) {
  //useStates
  const [globalFilterInput, setglobalFilterInput] = useState('');
  const [openFilterWindow, setOpenFilterWindow] = useState(false);

  //funcs
  const handleglobalFilterInput = ({ target: { value } }) => {
    setglobalFilterInput(value);
    props.updateActionTypeOnColumn({ columnName: 'all', action: 'filter' });
    props.selectedWayToFilterColumn(value);
    props.confirmFilterWayToColumn();
  };

  const toggleFilterWindow = () => setOpenFilterWindow((prev) => !prev);

  //useEffects
  useEffect(() => {
    const { actionOnColumn } = props;
    if (actionOnColumn && actionOnColumn.action === 'filter' && !actionOnColumn.complete)
      setOpenFilterWindow(true);
  }, [props.actionOnColumn]);

  //destructuring
  const { action, columnName, complete } = props.actionOnColumn || {};

  return (
    <div className="home-page page">
      <h1>עמוד הבית</h1>

      <div className="upper-info">
        <TextField
          id="outlined-search"
          label="פילטר"
          type="search"
          variant="outlined"
          name="filter"
          value={globalFilterInput}
          onChange={handleglobalFilterInput}
        />
        {complete && (
          <Button onClick={props.clearActionOnColumn} variant="contained" color="primary">
            לחץ בשביל לאפס את ה{action} על עמודת {columnName}
          </Button>
        )}
      </div>

      <ClientsTable {...{ ...props, toggleFilterWindow }} />
      <FilterDialog {...{ toggleFilterWindow, open: openFilterWindow }} />
    </div>
  );
}

HomePage.propTypes = {
  selectedWayToFilterColumn: PropTypes.func.isRequired,
  confirmFilterWayToColumn: PropTypes.func.isRequired,
  clearActionOnColumn: PropTypes.func.isRequired,
  actionOnColumn: PropTypes.object,
  updateActionTypeOnColumn: PropTypes.func.isRequired,
};

export default connect((state) => state, homePageAction)(HomePage);
