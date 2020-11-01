import * as types from '../actions/actionTypes.js';
import * as filterFn from '../functions/filterFunctions';

const initSate = {
    payload: {}
}

const stateWithPayload = (state, payload) => ({
    ...state,
    ...payload
})


const filteredRes = (state) => {
    const { res = [], columnName, filterWay, startFilter } = state;

    if (!startFilter) return res;
    switch (columnName) {
        //global filter
        case 'lastName': case 'firstName': case 'phone': return filterFn.globalFilter(res, filterWay, columnName);
        case 'all': return filterFn.globalFilter(res, filterWay);
        case 'date': return filterFn.dateFilter(res, filterWay);
        case 'id': return filterFn.idFilter(res, filterWay);
        default: return res;
    }
}

const fetchReducer = (state = initSate, { type, payload }) => {
    switch (type) {
        case types.FETCH_SUCCESS:
        case types.FETCH_FAILED:
        case types.SELECTED_COLUMN_TO_FILTER:
        case types.SELECTED_WAY_TO_FILTER_COLUMN:
            return stateWithPayload(state, payload);
        case types.CONFIRM_FILTER_WAY_TO_COLUMN:
            return {
                ...state,
                filteredRes: filteredRes({ ...state, ...payload }),
                startFilter: true
            }

        case types.CLEAR_FILTER_ON_FETCHED_DATA:
            return {
                res: state.res,
                filteredRes: state.res
            };
        case types.SAVE_FETCHED_DATA_BEFORE_ANOTHER_FETCH:
            return {
                [payload.varName]: state.res
            }
        default: return state;
    }
}

export default fetchReducer;