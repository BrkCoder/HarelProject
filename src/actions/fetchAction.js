import { customFetch } from '../functions';
import * as types from './actionTypes.js';



export const fetchAction = (path) => async (dispatch, getState) => {
    //fetch customers-fc
    const [fcRes, fcErr] = await customFetch(path)

    if (fcErr) dispatch({
        type: types.FETCH_FAILED,
        payload: { error: fcErr }
    });

    else dispatch({
        type: types.FETCH_SUCCESS,
        payload: { res: fcRes }
    });
}


export const filterFetchedData = (filterOptions) => ({
    type: types.FILTER_FETCHED_DATA,
    payload: { filterOptions }
})


export const selectedColumnToFilter = (columnName) => ({
    type: types.SELECTED_COLUMN_TO_FILTER,
    payload: { columnName }
});

export const selectedWayToFilterColumn = (filterWay) => ({
    type: types.SELECTED_WAY_TO_FILTER_COLUMN,
    payload: { filterWay, startFilter: false },
})

export const confirmFilterWayToColumn = () => ({
    type: types.CONFIRM_FILTER_WAY_TO_COLUMN,
    payload: { startFilter: true }
})



