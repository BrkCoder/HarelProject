import React, { useState } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { connect } from 'react-redux';
import * as homPageAction from '../../actions/homePageAction.js';

function SettingsDropDown({ columnName, updateActionTypeOnColumn, actionOnColumn = {} }) {
  //states && variables
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const unclearedAction = Boolean(Object.keys(actionOnColumn).length);

  //funcs
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (event) => {
    const { myValue } = event.currentTarget.dataset;
    const info = myValue ? myValue.split(';') : null;
    if (!actionOnColumn.complete && info)
      updateActionTypeOnColumn({ columnName: info[0], action: info[1] });
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        disabled={unclearedAction}
      >
        <MoreVert />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem
          key={`${columnName};sort`}
          data-my-value={`${columnName};sort`}
          onClick={handleClose}
        >
          sort
        </MenuItem>
        <MenuItem
          key={`${columnName};filter`}
          data-my-value={`${columnName};filter`}
          onClick={handleClose}
        >
          filter
        </MenuItem>
      </Menu>
    </>
  );
}

SettingsDropDown.propTypes = {
  columnName: PropTypes.string.isRequired,
  updateActionTypeOnColumn: PropTypes.func.isRequired,
  actionOnColumn: PropTypes.object,
};

export default connect((state) => state.homePage, homPageAction)(SettingsDropDown);
