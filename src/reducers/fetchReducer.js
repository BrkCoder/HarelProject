import * as types from '../actions/actionTypes.js';

const initSate = {
    payload: {}
}

const stateWithPayload = (state, payload) => ({
    ...state,
    ...payload
})

const fetchReducer = (state = initSate, { type, payload }) => {
    switch (type) {
        case types.FETCH_SUCCESS:
        case types.FETCH_FAILED:
        case types.FILTER_FETCHED_DATA:
        case types.SELECTED_COLUMN_TO_FILTER:
        case types.CONFIRM_FILTER_WAY_TO_COLUMN:
            return stateWithPayload(state, payload);

        case types.SELECTED_WAY_TO_FILTER_COLUMN:
            console.log('payload',payload)
            if (payload.dontOverride)
                return {
                    ...state,
                    filterWay: {
                        ...state.filterWay,
                        ...payload.filterWay
                    },
                    ...payload
                };
            return stateWithPayload(state, payload);
        default: return state;
    }
}

export default fetchReducer;