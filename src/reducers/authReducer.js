import * as types from '../actions/actionTypes.js';

const initSate = {}



const authReducer = (state = initSate, { type, payload }) => {

    const isLoggedIn = (loggedIn) => ({
        ...state,
        loginInfo: payload,
        loggedIn
    });

    switch (type) {
        case types.LOGIN_SUCCESS: return isLoggedIn(true);
        case types.LOGIN_FAILED: return isLoggedIn(false);
        default: return state;
    }
}


export default authReducer;