import React, { useState, useEffect } from 'react';
import './HomePage.scss';
import {
    TextField,
    //table components
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { MuiDirection } from '../../index.js';
import TablePagination from '@material-ui/core/TablePagination';
import * as fetchAction from '../../../actions/fetchAction.js';
import FilterDialog from './FilterDialog.jsx';
import moment from 'moment';


console.log("moment", moment().subtract(7, 'days').valueOf())


function HomePage(props) {
    const [filterInput, setFilterInput] = useState('');
    const [openFilterWindow, setOpenFilterWindow] = useState(false);

    const handleFilterInput = ({ target: { value } }) => {
        setFilterInput(value);
        props.selectedColumnToFilter('all');
        props.selectedWayToFilterColumn(value);
        props.confirmFilterWayToColumn();
    }

    const toggleFilterWindow = () => setOpenFilterWindow(prev => !prev);

    return (
        <div className='home-page page'>
            <h1 >עמוד הבית</h1>
            <TextField id="outlined-search" label="פילטר" type="search" variant="outlined" name='filter' onChange={handleFilterInput} />
            <CustomersTable {...{ ...props, toggleFilterWindow }} />
            <FilterDialog {...{ toggleFilterWindow, openFilterWindow }} />
        </div>
    );
}


const fakeRes = [{ "id": 0, "firstName": "Clovis", "lastName": "King", "date": "2020-03-25T18:25:17.541Z", "phone": "(701) 237-0636 x7407" }, { "id": 1, "firstName": "Cullen", "lastName": "Crona", "date": "2020-10-06T15:02:35.120Z", "phone": "1-609-325-9283 x33935" }, { "id": 2, "firstName": "Allene", "lastName": "Little", "date": "2020-09-15T07:24:47.873Z", "phone": "718-340-9104" }, { "id": 3, "firstName": "Jesus", "lastName": "Jones", "date": "2020-02-11T13:08:13.395Z", "phone": "(906) 574-6607 x70716" }, { "id": 4, "firstName": "Gonzalo", "lastName": "Marvin", "date": "2020-06-01T21:26:11.572Z", "phone": "(654) 762-1988" }, { "id": 5, "firstName": "Carmela", "lastName": "Stamm", "date": "2019-11-22T21:43:26.046Z", "phone": "964-286-6831 x5431" }, { "id": 6, "firstName": "Baron", "lastName": "Jenkins", "date": "2020-10-16T01:10:00.326Z", "phone": "940-821-7761" }, { "id": 7, "firstName": "Isabell", "lastName": "Leuschke", "date": "2020-02-15T14:50:49.958Z", "phone": "973-262-0895 x5565" }, { "id": 8, "firstName": "Edna", "lastName": "Grant", "date": "2019-12-11T21:07:59.372Z", "phone": "916.728.5413 x30197" }]

function CustomersTable(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        // props.fetchAction('/users');
    }, [])


    const filteredRes = () => {
        const { res = fakeRes, columnName, filterWay, startFilter } = props.fetched;
        if (!startFilter) return res;

        // const filterFn = (cb = null) => {
        //     //the purpose of cb is to activate a fn on the value before sorting
        //     res.sort((a, b) => {
        //         if (cb) {
        //             a = cb(a);
        //             b = cb(b);
        //         }

        //         if (a[prop] < b[prop]) return -1;
        //         if (a[prop] > b[prop]) return 1;
        //         return 0;
        //     });
        // }

        //sc -specific column
        const globalFilter = (sc = '') => {
            return res.filter((client) => {
            console.log("globalFilter -> client",  client[sc])

                let lala= JSON.stringify(sc ? client[sc] : client).toLocaleLowerCase()
                console.log("globalFilter -> lala", lala)
                console.log("globalFilter -> filterWay", filterWay)
                let bla=lala.includes(filterWay)
                console.log("globalFilter -> bla", bla)
                return bla;
            })
        }

        switch (columnName) {
            //global filter
            case 'all': case 'phone':
                return res.filter((client) => JSON.stringify(client).toLocaleLowerCase().includes(filterWay));
            case 'lastName': case 'firstName':
                return globalFilter(columnName);

        }





        // switch (prop) {
        //     case 'global': return res.filter((client) => JSON.stringify(client).toLocaleLowerCase().includes(by));
        //     case 'firstName': case 'lastName':
        //         // const newRes=res.filter(client=>client[])
        //         return filterFn();

        //     case 'phone':
        //     case 'date':
        //         // const newRes=res.filter(({date})=>)
        //         return filterFn((dateStr) => new Date(dateStr).getTime);
        //     default: return res;
        // }
    }


    const handleFilterWindow = (columnName) => {
        props.selectedColumnToFilter(columnName)
        props.toggleFilterWindow();
    }

    const { res = fakeRes } = props.fetched || {}

    if (props.fetched && props.fetched.error) return <div>ישנה תקלה. {props.fetched.error}</div>

    else return (
        <MuiDirection dir='ltr' >
            <Paper >
                <TableContainer  >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' onClick={() => handleFilterWindow('id')}>Id</TableCell>
                                <TableCell align='center' onClick={() => handleFilterWindow('firstName')}>First Name</TableCell>
                                <TableCell align='center' onClick={() => handleFilterWindow('lastName')}>Last Name</TableCell>
                                <TableCell align='center' onClick={() => handleFilterWindow('date')}>Date</TableCell>
                                <TableCell align='center' onClick={() => handleFilterWindow('phone')}>Phone</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredRes().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={`row${data.id}`} >
                                        <TableCell key={`cell-${data.id}-id`} align='center'>{data.id}</TableCell>
                                        <TableCell key={`cell-${data.id}-fn`} align='center'>{data.firstName}</TableCell>
                                        <TableCell key={`cell-${data.id}-ln`} align='center'>{data.lastName}</TableCell>
                                        <TableCell key={`cell-${data.id}-d`} align='center'>{new Date(data.date).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell key={`cell-${data.id}-p`} align='center'>{data.phone}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filteredRes().length}
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