import React, { useState, useEffect } from 'react';
import './style.scss';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as homePageAction from '../../actions/homePageAction.js';
import FilterDialog from './FilterDialog/index.jsx';
import PropTypes from 'prop-types';
import ClientsTable from './ClientsTable.jsx';

const HomePage = (props) => {
  console.log('HomePage -> props', props);
  const [globalFilterInput, setglobalFilterInput] = useState('');
  const [openFilterWindow, setOpenFilterWindow] = useState(false);

  const handleglobalFilterInput = ({ target: { value } }) => {
    setglobalFilterInput(value);
    props.updateActionTypeOnColumn({ columnName: 'all', action: 'filter' });
    props.selectedWayToFilterColumn(value);
    props.confirmFilterWayToColumn();
  };

  const toggleFilterWindow = () => setOpenFilterWindow((prev) => !prev);

  useEffect(() => {
    const { actionOnColumn } = props;
    if (actionOnColumn && actionOnColumn.action === 'filter' && !actionOnColumn.complete)
      setOpenFilterWindow(true);
  }, [props.actionOnColumn]);

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
};

HomePage.propTypes = {
  selectedColumnToFilter: PropTypes.func,
  selectedWayToFilterColumn: PropTypes.func,
  confirmFilterWayToColumn: PropTypes.func,
  clearActionOnColumn: PropTypes.func.isRequired,
  fetched: PropTypes.object,
  actionOnColumn: PropTypes.object,
  updateActionTypeOnColumn: PropTypes.func.isRequired,
};

export default connect((state) => state.homePage, homePageAction)(HomePage);
