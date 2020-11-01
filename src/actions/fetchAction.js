import { customFetch } from '../functions';
import * as types from './actionTypes.js';

////////////////////////////
//fetched data action
////////////////////////////
export const fetchAction = (path,payload={}) => async (dispatch, getState) => {
    //fetch customers-fc
    const [fcRes, fcErr] = await customFetch(path,payload)

    if (fcErr) dispatch({
        type: types.FETCH_FAILED,
        payload: { error: fcErr }
    });

    else dispatch({
        type: types.FETCH_SUCCESS,
        payload: { res: fcRes,filteredRes:fcRes }
    });
}


////////////////////////////
//filter fetched data actions
////////////////////////////

//select column
export const selectedColumnToFilter = (columnName) => ({
    type: types.SELECTED_COLUMN_TO_FILTER,
    payload: { columnName }
});

//select way to filter it
export const selectedWayToFilterColumn = (filterWay) => ({
    type: types.SELECTED_WAY_TO_FILTER_COLUMN,
    payload: { filterWay, startFilter: false },
})

//confirm the column and filter way 
export const confirmFilterWayToColumn = () => ({
    type: types.CONFIRM_FILTER_WAY_TO_COLUMN,
    payload: { startFilter: true }
})


export const clearFilterOnFetchedData=()=>({
    type: types.CLEAR_FILTER_ON_FETCHED_DATA
})


export const saveFetchedDateAndClear=(varName)=>({
    type:types.SAVE_FETCHED_DATA_BEFORE_ANOTHER_FETCH,
    payload:{varName}
})



