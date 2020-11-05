import React from 'react';
import { connect } from 'react-redux';
import * as homePageAction from '../../../actions/homePageAction';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ContainsFilter, IDFilter, DateFilter } from './filterTypes.jsx';

function FilterDialog(props) {
  const whichFilter = () => {
    if (!props.actionOnColumn) return;
    switch (props.actionOnColumn.columnName) {
      case 'lastName':
      case 'firstName':
      case 'phone':
        return <ContainsFilter {...props} />;
      case 'id':
        return <IDFilter {...props} />;
      case 'date':
        return <DateFilter {...props} />;
    }
  };

  const handleOkBtn = () => {
    props.toggleFilterWindow();
    props.confirmFilterWayToColumn();
  };

  const handleCancelBtn = () => {
    props.toggleFilterWindow();
    props.clearActionOnColumn();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCancelBtn}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">איך תרצה לסנן את העמודה?</DialogTitle>
      <DialogContent>{whichFilter()}</DialogContent>
      <DialogActions>
        <Button onClick={handleOkBtn} color="primary" autoFocus>
          אישור
        </Button>
        <Button onClick={handleCancelBtn} color="primary">
          ביטול
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FilterDialog.propTypes = {
  actionOnColumn: PropTypes.object,
  open: PropTypes.bool.isRequired,
  toggleFilterWindow: PropTypes.func.isRequired,
  confirmFilterWayToColumn: PropTypes.func.isRequired,
  clearActionOnColumn: PropTypes.func.isRequired,
};

export default connect((state) => state.homePage, homePageAction)(FilterDialog);
