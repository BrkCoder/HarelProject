import React, { useState, useEffect } from 'react';
import './style.scss';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@material-ui/core';
import { connect } from 'react-redux';
import MuiDirection from '../../components/MuiDirection';
import * as homePageAction from '../../actions/homePageAction.js';
import SettingsDropDown from './SettingsDropDown.jsx';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// const sortAl

const ClientsTable = (props) => {
  //states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let history = useHistory();

  //useEffects
  useEffect(() => {
    props.fetchClients();
  }, []);

  //funcs
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const moveToEdit = ({ id }) => history.push(`/edit/${id}`);

  //destructuring
  const { filteredClients = [], fetchClientsErr } = props;

  //return
  if (fetchClientsErr) return <div>ישנה תקלה. {fetchClientsErr}</div>;
  else
    return (
      <MuiDirection dir="ltr">
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    //   onClick={() => handleFilterWindow('id')}
                  >
                    Id
                    <SettingsDropDown columnName="id" />
                  </TableCell>
                  <TableCell
                    align="center"
                    //   onClick={() => handleFilterWindow('firstName')}
                  >
                    First Name
                    <SettingsDropDown columnName="firstName" />
                  </TableCell>
                  <TableCell
                    align="center"
                    //   onClick={() => handleFilterWindow('lastName')}
                  >
                    Last Name
                    <SettingsDropDown columnName="lastName" />
                  </TableCell>
                  <TableCell
                    align="center"
                    //   onClick={() => handleFilterWindow('date')}
                  >
                    Date
                    <SettingsDropDown columnName="date" />
                  </TableCell>
                  <TableCell
                    align="center"
                    //   onClick={() => handleFilterWindow('phone')}
                  >
                    Phone
                    <SettingsDropDown columnName="phone" />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredClients
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
            count={filteredClients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </MuiDirection>
    );
};

ClientsTable.propTypes = {};

export default connect((state) => state.homePage, {})(ClientsTable);
