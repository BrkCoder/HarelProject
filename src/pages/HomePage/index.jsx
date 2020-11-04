import React, { useState, useEffect } from 'react';
import './style.scss';
import {
  TextField,
  Button,
  //table components
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import MuiDirection from '../../components/MuiDirection';
import TablePagination from '@material-ui/core/TablePagination';
import * as fetchAction from '../../actions/fetchAction.js';
import FilterDialog from './FilterDialog.jsx';
import { useHistory } from 'react-router-dom';

function HomePage(props) {
  console.log('HomePage -> props', props);
  const [filterInput, setFilterInput] = useState('');
  const [openFilterWindow, setOpenFilterWindow] = useState(false);

  const handleFilterInput = ({ target: { value } }) => {
    setFilterInput(value);
    props.selectedColumnToFilter('all');
    props.selectedWayToFilterColumn(value);
    props.confirmFilterWayToColumn();
  };

  const clearFilterBtn = () => props.clearFilterOnFetchedData();

  const toggleFilterWindow = () => setOpenFilterWindow((prev) => !prev);

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
          onChange={handleFilterInput}
        />
        {props.fetched.startFilter && (
          <Button onClick={clearFilterBtn} variant="contained" color="primary">
            לחץ בשביל לאפס את הסינון על עמודת {props.fetched.columnName}
          </Button>
        )}
      </div>
      <CustomersTable {...{ ...props, toggleFilterWindow }} />
      <FilterDialog {...{ toggleFilterWindow, openFilterWindow }} />
    </div>
  );
}

function CustomersTable(props) {
  let history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    props.fetchAction('/users');
  }, []);

  const handleFilterWindow = (columnName) => {
    props.selectedColumnToFilter(columnName);
    props.toggleFilterWindow();
  };

  const moveToEdit = ({ id }) => {
    history.push(`/edit/${id}`);
  };

  const { filteredRes = [], error = '' } = props.fetched;

  if (error) return <div>ישנה תקלה. {props.fetched.error}</div>;
  else
    return (
      <MuiDirection dir="ltr">
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" onClick={() => handleFilterWindow('id')}>
                    Id
                  </TableCell>
                  <TableCell align="center" onClick={() => handleFilterWindow('firstName')}>
                    First Name
                  </TableCell>
                  <TableCell align="center" onClick={() => handleFilterWindow('lastName')}>
                    Last Name
                  </TableCell>
                  <TableCell align="center" onClick={() => handleFilterWindow('date')}>
                    Date
                  </TableCell>
                  <TableCell align="center" onClick={() => handleFilterWindow('phone')}>
                    Phone
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={`row${data.id}`}
                        onClick={() => moveToEdit(data)}
                      >
                        <TableCell key={`cell-${data.id}-id`} align="center">
                          {data.id}
                        </TableCell>
                        <TableCell key={`cell-${data.id}-fn`} align="center">
                          {data.firstName}
                        </TableCell>
                        <TableCell key={`cell-${data.id}-ln`} align="center">
                          {data.lastName}
                        </TableCell>
                        <TableCell key={`cell-${data.id}-d`} align="center">
                          {new Date(data.date).toLocaleDateString('en-GB')}
                        </TableCell>
                        <TableCell key={`cell-${data.id}-p`} align="center">
                          {data.phone}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </MuiDirection>
    );
}

const mapStateToProps = (state, ownProps) => state;
export default connect(mapStateToProps, fetchAction)(HomePage);
